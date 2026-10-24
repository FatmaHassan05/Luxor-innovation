import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'lx-not-found-page',
  imports: [RouterLink, ButtonModule, TranslatePipe, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <lx-empty-state icon="pi-compass" [title]="'errors.notFound.title' | translate" [message]="'errors.notFound.message' | translate">
        <a pButton routerLink="/">{{ 'errors.backHome' | translate }}</a>
      </lx-empty-state>
    </div>
  `,
})
export class NotFoundPage {}
