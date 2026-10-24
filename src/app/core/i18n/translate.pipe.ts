import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationKey } from './en';
import { I18nService } from './i18n.service';

/** Impure on purpose: it must re-evaluate when the language signal changes. */
@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: TranslationKey, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }
}
