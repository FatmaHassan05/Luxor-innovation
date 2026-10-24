import { Role } from '../models/role';
import { TranslationKey } from '../i18n/en';

export interface NavItem {
  labelKey: TranslationKey;
  path: string;
  icon: string;
  exact?: boolean;
}

/**
 * Rule: add an item here only in the same change that adds its page,
 * so navigation never links to an unimplemented screen.
 */
export const PUBLIC_NAV: NavItem[] = [{ labelKey: 'nav.home', path: '/', icon: 'pi-home', exact: true }];

export const WORKSPACE_NAV: Record<Role, NavItem[]> = {
  researcher: [{ labelKey: 'nav.researcher.submissions', path: '/researcher/submissions', icon: 'pi-lightbulb' }],
  company: [{ labelKey: 'nav.company.submissions', path: '/company/submissions', icon: 'pi-building' }],
  judge: [{ labelKey: 'nav.judge.matching', path: '/judge/matching', icon: 'pi-arrow-right-arrow-left' }],
  admin: [{ labelKey: 'nav.admin.dashboard', path: '/admin/dashboard', icon: 'pi-cog' }],
};
