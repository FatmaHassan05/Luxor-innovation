import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../environments/environment';
import { AuthError } from '../../core/auth/auth.api';
import { AuthStore } from '../../core/auth/auth.store';
import { DEMO_ACCOUNTS } from '../../core/auth/mock-auth.api';
import { TranslationKey } from '../../core/i18n/en';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ROLE_HOME, Role, isRole } from '../../core/models/role';
import { AlertComponent } from '../../shared/components/alert.component';
import { BrandLogoComponent } from '../../shared/components/brand-logo.component';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher.component';

const TITLE: Record<Role, TranslationKey> = {
  researcher: 'auth.title.researcher',
  company: 'auth.title.company',
  judge: 'auth.title.judge',
  admin: 'auth.title.admin',
};
const SUBTITLE: Record<Role, TranslationKey> = {
  researcher: 'auth.subtitle.researcher',
  company: 'auth.subtitle.company',
  judge: 'auth.subtitle.judge',
  admin: 'auth.subtitle.admin',
};

/** One login screen shared by all four roles; the role comes from route data. */
@Component({
  selector: 'lx-login-page',
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, TranslatePipe, AlertComponent, BrandLogoComponent, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly role: Role = (() => {
    const r: unknown = this.route.snapshot.data['role'];
    if (!isRole(r)) throw new Error('Login route is missing data.role');
    return r;
  })();
  protected readonly titleKey = TITLE[this.role];
  protected readonly subtitleKey = SUBTITLE[this.role];

  protected readonly loading = signal(false);
  protected readonly errorKey = signal<TranslationKey | null>(null);
  protected readonly showPassword = signal(false);
  protected readonly expired = this.auth.sessionExpired;

  protected readonly demo = environment.useMocks ? DEMO_ACCOUNTS[this.role] : null;

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });


  protected showError(name: 'email' | 'password'): TranslationKey | null {
    const c = this.form.controls[name];
    if (!(c.touched || c.dirty) || c.valid) return null;
    if (c.hasError('required')) return 'validation.required';
    return name === 'email' ? 'validation.email' : null;
  }

  protected fillDemo(): void {
    if (!this.demo) return;
    this.form.setValue({ email: this.demo.email, password: this.demo.password });
  }

  protected submit(): void {
    this.errorKey.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.host.nativeElement.querySelector<HTMLElement>('input.ng-invalid')?.focus();
      return;
    }
    this.loading.set(true);
    this.auth
      .login(this.role, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => void this.router.navigateByUrl(this.destination()),
        error: (e: unknown) => {
          this.loading.set(false);
          // One generic message for any credential problem (scope §2).
          this.errorKey.set(e instanceof AuthError && e.code === 'invalid_credentials' ? 'auth.error.invalid' : 'auth.error.network');
        },
      });
  }

  /** Honors returnUrl only if it is an in-app path inside this role's own area (no open redirects). */
  private destination(): string {
    const ret = this.route.snapshot.queryParamMap.get('returnUrl');
    const prefix = `/${this.role}/`;
    const safe = !!ret && ret.startsWith(prefix) && !ret.startsWith('//') && !ret.includes('://');
    return safe ? ret : ROLE_HOME[this.role];
  }
}
