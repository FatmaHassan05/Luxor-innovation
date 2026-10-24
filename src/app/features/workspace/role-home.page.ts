import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AlertComponent } from '../../shared/components/alert.component';
import { PageHeaderComponent } from '../../shared/components/page-header.component';

/**
 * Landing page of each workspace in Phase 1. It is replaced role by role
 * (researcher/company in Phase 3, judge in Phase 4, admin in Phase 5).
 */
@Component({
  selector: 'lx-role-home-page',
  imports: [TranslatePipe, PageHeaderComponent, AlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lx-page-header [title]="heading()" />
    <lx-alert severity="info">{{ 'workspace.foundationNotice' | translate }}</lx-alert>
  `,
})
export class RoleHomePage {
  private readonly i18n = inject(I18nService);
  private readonly auth = inject(AuthStore);
  protected readonly heading = computed(() =>
    this.i18n.t('workspace.welcome', { name: this.auth.user()?.displayName ?? '' }),
  );
}
