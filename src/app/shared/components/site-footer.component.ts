import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { BrandLogoComponent } from './brand-logo.component';

@Component({
  selector: 'lx-site-footer',
  imports: [RouterLink, TranslatePipe, BrandLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="wave-rule" aria-hidden="true"></div>
      <div class="footer__inner">
        <lx-brand-logo size="sm" />
        <ul class="footer__links">
          <li><a routerLink="/judge/login">{{ 'footer.judgeSignIn' | translate }}</a></li>
          <li><a routerLink="/admin/login">{{ 'footer.adminSignIn' | translate }}</a></li>
        </ul>
        <p class="footer__rights">&copy; {{ year }} {{ 'footer.rights' | translate }}</p>
      </div>
    </footer>
  `,
  styles: `
    .footer { background: var(--color-surface); margin-block-start: var(--space-8); }
    .footer__inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
      gap: var(--space-4) var(--space-6); max-width: var(--content-max); margin-inline: auto;
      padding: var(--space-5) var(--space-4); }
    .footer__links { display: flex; flex-wrap: wrap; gap: var(--space-4); list-style: none; margin: 0; padding: 0; }
    .footer__rights { margin: 0; font-size: var(--fs-sm); color: var(--color-text-muted); flex-basis: 100%; }
    @media (min-width: 768px) { .footer__rights { flex-basis: auto; } }
  `,
})
export class SiteFooterComponent {
  protected readonly year = new Date().getFullYear();
}
