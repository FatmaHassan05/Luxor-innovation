import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { SiteFooterComponent } from '../shared/components/site-footer.component';
import { SiteHeaderComponent } from '../shared/components/site-header.component';

@Component({
  selector: 'lx-public-layout',
  imports: [RouterOutlet, TranslatePipe, SiteHeaderComponent, SiteFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main" (click)="focusMain($event)">{{ 'nav.skipToContent' | translate }}</a>
    <lx-site-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <lx-site-footer />
  `,
  styles: `:host { display: block; min-height: 100vh; } main { min-height: 60vh; }`,
})
export class PublicLayoutComponent {
  protected focusMain(event: Event): void {
    event.preventDefault();
    document.getElementById('main')?.focus();
  }
}
