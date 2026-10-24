import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lx-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="ph">
      <div>
        <h1>{{ title() }}</h1>
        @if (subtitle()) {
          <p class="ph__sub">{{ subtitle() }}</p>
        }
      </div>
      <div class="ph__actions"><ng-content /></div>
    </header>
  `,
  styles: `
    .ph { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between;
      gap: var(--space-4); padding-block-end: var(--space-4); margin-block-end: var(--space-5);
      border-block-end: 1px solid var(--color-border); }
    h1 { margin: 0; }
    .ph__sub { margin: var(--space-2) 0 0; color: var(--color-text-muted); max-width: 60ch; }
    .ph__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; }
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
