export const ROLES = ['researcher', 'company', 'judge', 'admin'] as const;
export type Role = (typeof ROLES)[number];

/** Self-registration exists only for these two roles. Judge and Admin accounts are provisioned by the platform. */
export type SelfRegisterRole = Extract<Role, 'researcher' | 'company'>;

/** Post-login destination for each role (project scope, section 2). */
export const ROLE_HOME: Record<Role, string> = {
  researcher: '/researcher/submissions',
  company: '/company/submissions',
  judge: '/judge/matching',
  admin: '/admin/dashboard',
};

export const ROLE_LOGIN: Record<Role, string> = {
  researcher: '/researcher/login',
  company: '/company/login',
  judge: '/judge/login',
  admin: '/admin/login',
};

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value);
}
