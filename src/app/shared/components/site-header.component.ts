import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthStore } from '../../core/auth/auth.store';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ROLE_HOME } from '../../core/models/role';
import { PUBLIC_NAV } from '../../core/navigation/nav.config';
import { BrandLogoComponent } from './brand-logo.component';
import { LanguageSwitcherComponent } from './language-switcher.component';

@Component({
  selector: 'lx-site-header',
  imports: [RouterLink, RouterLinkActive, ButtonModule, MenuModule, TranslatePipe, BrandLogoComponent, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
})
export class SiteHeaderComponent {
  protected readonly auth = inject(AuthStore);
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);

  protected readonly items = PUBLIC_NAV;
  protected readonly open = signal(false);

  protected readonly workspacePath = computed(() => {
    const role = this.auth.role();
    return role ? ROLE_HOME[role] : '/';
  });

  protected readonly signInItems = computed<MenuItem[]>(() => [
    { label: this.i18n.t('nav.signInResearcher'), icon: 'pi pi-lightbulb', routerLink: ['/researcher/login'] },
    { label: this.i18n.t('nav.signInCompany'), icon: 'pi pi-building', routerLink: ['/company/login'] },
  ]);

  protected signOut(): void {
    this.auth.logout();
    this.open.set(false);
    void this.router.navigateByUrl('/');
  }
}
