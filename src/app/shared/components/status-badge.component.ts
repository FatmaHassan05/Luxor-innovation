import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { STATUS_META, SubmissionStatus } from '../../core/models/status';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

/** The four submission statuses, shown as icon + text (never color alone). */
@Component({
  selector: 'lx-status-badge',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="status" [class]="'status status--' + status()">
      <i class="pi" [class]="meta().icon" aria-hidden="true"></i>
      {{ meta().labelKey | translate }}
    </span>
    @if (showHelp()) {
      <span class="help">{{ meta().helpKey | translate }}</span>
    }
  `,
  styles: `
    :host { display: inline-flex; flex-direction: column; gap: var(--space-1); }
    .status { display: inline-flex; align-items: center; gap: var(--space-2); align-self: flex-start;
      padding: 0.125rem var(--space-3); border-radius: var(--radius-sm); border: 1px solid;
      font-size: var(--fs-sm); font-weight: var(--fw-medium); white-space: nowrap; }
    .status--new { background: var(--color-info-tint); color: var(--color-info-text); border-color: var(--color-info); }
    .status--under_review { background: var(--color-warning-tint); color: var(--color-warning-text); border-color: var(--color-warning); }
    .status--accepted { background: var(--color-success-tint); color: var(--color-success-text); border-color: var(--color-success); }
    .status--rejected { background: var(--color-danger-tint); color: var(--color-danger-text); border-color: var(--color-danger); }
    .help { font-size: var(--fs-xs); color: var(--color-text-muted); max-width: 28ch; }
  `,
})
export class StatusBadgeComponent {
  readonly status = input.required<SubmissionStatus>();
  readonly showHelp = input(false);
  protected readonly meta = computed(() => STATUS_META[this.status()]);
}
