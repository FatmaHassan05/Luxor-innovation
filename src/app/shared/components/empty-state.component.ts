import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lx-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="empty">
      <i class="pi" [class]="icon()" aria-hidden="true"></i>
      <h2>{{ title() }}</h2>
      @if (message()) {
        <p>{{ message() }}</p>
      }
      <div class="empty__actions"><ng-content /></div>
    </section>
  `,
  styles: `
    .empty { text-align: center; padding: var(--space-7) var(--space-4); background: var(--color-surface);
      border: 1px dashed var(--color-border-strong); border-radius: var(--radius-lg); }
    i { font-size: 1.75rem; color: var(--color-primary); margin-block-end: var(--space-3); }
    h2 { font-size: var(--fs-xl); }
    p { color: var(--color-text-muted); max-width: 48ch; margin-inline: auto; }
    .empty__actions { display: flex; justify-content: center; gap: var(--space-2); flex-wrap: wrap; }
  `,
})
export class EmptyStateComponent {
  readonly icon = input('pi-inbox');
  readonly title = input.required<string>();
  readonly message = input<string>('');
}
