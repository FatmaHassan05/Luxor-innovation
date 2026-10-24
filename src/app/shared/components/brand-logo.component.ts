import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

/**
 * Official logo, used as supplied (never redrawn or recolored).
 * Intrinsic size is 145×250; width/height attributes reserve space and keep the aspect ratio.
 */
@Component({
  selector: 'lx-brand-logo',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="brand">
      <img
        src="brand/luxor-university-logo.png"
        [alt]="'brand.logoAlt' | translate"
        width="145"
        height="250"
        [style.height.px]="height()"
      />
      @if (showName()) {
        <span class="brand__name">{{ 'brand.platformName' | translate }}</span>
      }
    </span>
  `,
  styles: `
    .brand { display: inline-flex; align-items: center; gap: var(--space-3); }
    img { width: auto; display: block; }
    .brand__name {
      padding-inline-start: var(--space-3);
      border-inline-start: 2px solid var(--color-primary);
      font-weight: var(--fw-strong);
      font-size: var(--fs-lg);
      line-height: 1.2;
      color: var(--color-primary-deep);
    }
  `,
})
export class BrandLogoComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showName = input(true);
  protected readonly height = computed(() => ({ sm: 48, md: 60, lg: 120 })[this.size()]);
}
