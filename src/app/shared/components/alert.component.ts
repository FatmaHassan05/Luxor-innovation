import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslationKey } from '../../core/i18n/en';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

const META: Record<AlertSeverity, { icon: string; label: TranslationKey }> = {
  info: { icon: 'pi-info-circle', label: 'feedback.info' },
  success: { icon: 'pi-check-circle', label: 'feedback.success' },
  warning: { icon: 'pi-exclamation-triangle', label: 'feedback.warning' },
  error: { icon: 'pi-times-circle', label: 'feedback.error' },
};

/** Inline message. Severity is conveyed by icon + hidden text label, never by color alone. */
@Component({
  selector: 'lx-alert',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="alert" [class]="'alert alert--' + severity()" [attr.role]="severity() === 'error' ? 'alert' : 'status'">
      <i class="pi" [class]="meta().icon" aria-hidden="true"></i>
      <div><span class="visually-hidden">{{ meta().label | translate }}: </span><ng-content /></div>
    </div>
  `,
  styles: `
    .alert { display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-3) var(--space-4);
      border: 1px solid; border-radius: var(--radius-md); font-size: var(--fs-sm); margin-block-end: var(--space-4); }
    .alert i { margin-block-start: 0.2em; }
    .alert--info { background: var(--color-info-tint); border-color: var(--color-info); color: var(--color-info-text); }
    .alert--success { background: var(--color-success-tint); border-color: var(--color-success); color: var(--color-success-text); }
    .alert--warning { background: var(--color-warning-tint); border-color: var(--color-warning); color: var(--color-warning-text); }
    .alert--error { background: var(--color-danger-tint); border-color: var(--color-danger); color: var(--color-danger-text); }
  `,
})
export class AlertComponent {
  readonly severity = input<AlertSeverity>('info');
  protected readonly meta = computed(() => META[this.severity()]);
}
