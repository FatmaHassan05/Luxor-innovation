import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { BrandLogoComponent } from '../../shared/components/brand-logo.component';

/** Phase 1 entry page. Replaced by the full public landing page and discovery in Phase 2. */
@Component({
  selector: 'lx-home-page',
  imports: [RouterLink, ButtonModule, TranslatePipe, BrandLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page home">
      <div class="row align-items-center g-5">
        <div class="col-lg-7">
          <h1>{{ 'home.title' | translate }}</h1>
          <p class="home__lead">{{ 'home.lead' | translate }}</p>
          <div class="home__actions">
            <a pButton routerLink="/researcher/login"><i class="pi pi-lightbulb" aria-hidden="true"></i> {{ 'home.researcherCta' | translate }}</a>
            <a pButton [outlined]="true" routerLink="/company/login"><i class="pi pi-building" aria-hidden="true"></i> {{ 'home.companyCta' | translate }}</a>
          </div>
        </div>
        <div class="col-lg-5 d-none d-lg-flex justify-content-center" aria-hidden="true">
          <div class="home__mark arch"><lx-brand-logo size="lg" [showName]="false" /></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .home { padding-block: var(--space-7); }
    h1 { max-width: 18ch; }
    .home__lead { font-size: var(--fs-lg); color: var(--color-text-muted); max-width: 52ch; }
    .home__actions { display: flex; flex-wrap: wrap; gap: var(--space-3); }
    .home__mark { padding: var(--space-6) var(--space-7) 0; background: var(--color-primary-subtle); line-height: 0; }
    @media (min-width: 992px) { h1 { font-size: var(--fs-4xl); } }
  `,
})
export class HomePage {}
