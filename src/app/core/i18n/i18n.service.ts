import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ar } from './ar';
import { TranslationKey, en } from './en';

export type Lang = 'ar' | 'en';
const STORAGE_KEY = 'lx.lang';
const DEFAULT_LANG: Lang = 'ar';

/**
 * Signal-based localization. Switching language updates <html lang> and <html dir>,
 * so layout flips through logical CSS properties rather than per-component overrides.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.readStoredLang());
  readonly dir = computed<'rtl' | 'ltr'>(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));
  readonly isRtl = computed(() => this.dir() === 'rtl');

  constructor() {
    effect(() => {
      const root = this.doc.documentElement;
      root.lang = this.lang();
      root.dir = this.dir();
      this.doc.title = this.t('brand.documentTitle');
      try {
        localStorage.setItem(STORAGE_KEY, this.lang());
      } catch {
        /* storage unavailable: language simply is not remembered */
      }
    });
  }

  t(key: TranslationKey, params?: Record<string, string | number>): string {
    const dict: Record<TranslationKey, string> = this.lang() === 'ar' ? ar : en;
    const template = dict[key];
    if (!params) return template;
    return template.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`));
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  toggle(): void {
    this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
  }

  private readStoredLang(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'ar' || stored === 'en' ? stored : DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  }
}
