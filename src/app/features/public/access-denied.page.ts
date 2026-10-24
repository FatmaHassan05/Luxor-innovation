import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../../core/auth/auth.store';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ROLE_HOME } from '../../core/models/role';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'lx-access-denied-page',
  imports: [RouterLink, ButtonModule, TranslatePipe, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <lx-empty-state icon="pi-lock" [title]="'errors.accessDenied.title' | translate" [message]="'errors.accessDenied.message' | translate">
        @if (home(); as target) {
          <a pButton [routerLink]="target">{{ 'errors.accessDenied.action' | translate }}</a>
        }
        <a pButton [outlined]="true" routerLink="/">{{ 'errors.backHome' | translate }}</a>
      </lx-empty-state>
    </div>
  `,
})
export class AccessDeniedPage {
  private readonly auth = inject(AuthStore);
  protected readonly home = computed(() => {
    const role = this.auth.role();
    return role ? ROLE_HOME[role] : null;
  });
}
