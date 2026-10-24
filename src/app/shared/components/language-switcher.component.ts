import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'lx-language-switcher',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="lang" (click)="i18n.toggle()" [attr.aria-label]="'lang.switchLabel' | translate">
      <i class="pi pi-globe" aria-hidden="true"></i>
      <span [attr.lang]="target().lang">{{ target().label }}</span>
    </button>
  `,
  styles: `
    .lang {
      display: inline-flex; align-items: center; gap: var(--space-2);
      min-height: 2.5rem; padding-inline: var(--space-3);
      background: transparent; color: var(--color-text);
      border: 1px solid var(--color-border-strong); border-radius: var(--radius-md);
      cursor: pointer; transition: background var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
    }
    .lang:hover { background: var(--color-primary-subtle); border-color: var(--color-primary-border); }
  `,
})
export class LanguageSwitcherComponent {
  protected readonly i18n = inject(I18nService);
  /** Shows the language the user will switch TO, written in that language. */
  protected readonly target = computed(() =>
    this.i18n.lang() === 'ar' ? { lang: 'en', label: 'English' } : { lang: 'ar', label: 'العربية' },
  );
}
