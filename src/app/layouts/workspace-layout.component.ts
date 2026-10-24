import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../core/auth/auth.store';
import { TranslationKey } from '../core/i18n/en';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { Role } from '../core/models/role';
import { WORKSPACE_NAV } from '../core/navigation/nav.config';
import { BrandLogoComponent } from '../shared/components/brand-logo.component';
import { LanguageSwitcherComponent } from '../shared/components/language-switcher.component';

const ROLE_LABEL: Record<Role, TranslationKey> = {
  researcher: 'role.researcher',
  company: 'role.company',
  judge: 'role.judge',
  admin: 'role.admin',
};

/** Shell for all authenticated roles. Navigation is derived from the signed-in role. */
@Component({
  selector: 'lx-workspace-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, TranslatePipe, BrandLogoComponent, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workspace-layout.component.html',
  styleUrl: './workspace-layout.component.scss',
})
export class WorkspaceLayoutComponent {
  protected readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly menuOpen = signal(false);
  protected readonly items = computed(() => {
    const role = this.auth.role();
    return role ? WORKSPACE_NAV[role] : [];
  });
  protected readonly roleLabel = computed<TranslationKey>(() => ROLE_LABEL[this.auth.role() ?? 'researcher']);

  protected signOut(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }

  protected focusMain(event: Event): void {
    event.preventDefault();
    document.getElementById('main')?.focus();
  }
}
