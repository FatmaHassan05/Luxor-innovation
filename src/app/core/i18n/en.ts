export const en = {
  'brand.platformName': 'Innovation Platform',
  'brand.logoAlt': 'Luxor University logo',
  'brand.documentTitle': 'Luxor University Innovation Platform',

  'nav.home': 'Home',
  'nav.skipToContent': 'Skip to main content',
  'nav.menu': 'Menu',
  'nav.signIn': 'Sign in',
  'nav.signOut': 'Sign out',
  'nav.mainNavigation': 'Main navigation',
  'nav.workspaceNavigation': 'Workspace navigation',
  'nav.signInResearcher': 'Researcher sign in',
  'nav.signInCompany': 'Company sign in',
  'nav.myWorkspace': 'My workspace',
  'nav.researcher.submissions': 'My innovations',
  'nav.company.submissions': 'My challenges',
  'nav.judge.matching': 'Matching workspace',
  'nav.admin.dashboard': 'Administration',

  'lang.switchLabel': 'Switch language',

  'footer.judgeSignIn': 'Viewer / Judge sign in',
  'footer.adminSignIn': 'Administrator sign in',
  'footer.rights': 'Luxor University. All rights reserved.',

  'home.title': 'Where university research meets real-world challenges',
  'home.lead':
    'A Luxor University service that connects researchers with companies and organizations that need practical solutions.',
  'home.researcherCta': 'Sign in as a researcher',
  'home.companyCta': 'Sign in as a company',

  'role.researcher': 'Researcher',
  'role.company': 'Company',
  'role.judge': 'Viewer / Judge',
  'role.admin': 'Administrator',

  'auth.title.researcher': 'Researcher sign in',
  'auth.title.company': 'Company sign in',
  'auth.title.judge': 'Viewer / Judge sign in',
  'auth.title.admin': 'Administrator sign in',
  'auth.subtitle.researcher': 'Sign in to submit your innovations and follow their status.',
  'auth.subtitle.company': 'Sign in to submit your challenges and follow their status.',
  'auth.subtitle.judge': 'For Viewer / Judge accounts created by the platform administrator.',
  'auth.subtitle.admin': 'Restricted to platform administrators.',
  'auth.panelText': 'Connecting Luxor University research with the problems industry and society need solved.',
  'auth.email': 'Email address',
  'auth.password': 'Password',
  'auth.showPassword': 'Show password',
  'auth.hidePassword': 'Hide password',
  'auth.submit': 'Sign in',
  'auth.submitting': 'Signing in…',
  'auth.backHome': 'Back to home',
  'auth.error.invalid': 'We could not sign you in with those details. Check them and try again.',
  'auth.error.network': 'We could not reach the server. Check your connection and try again.',
  'auth.sessionExpired': 'Your session has ended. Sign in again to continue.',
  'auth.demoNotice':
    'Demonstration mode: sign-in uses built-in demo accounts. This is not real authentication.',
  'auth.demoAccount': 'Demo account',
  'auth.demoFill': 'Fill in demo details',

  'validation.required': 'This field is required.',
  'validation.email': 'Enter a valid email address, for example name@example.com.',
  'common.required': 'required',

  'feedback.info': 'Information',
  'feedback.success': 'Success',
  'feedback.warning': 'Warning',
  'feedback.error': 'Error',

  'errors.accessDenied.title': 'You cannot open this page',
  'errors.accessDenied.message': 'Your account does not have permission to view this page.',
  'errors.accessDenied.action': 'Go to my workspace',
  'errors.notFound.title': 'Page not found',
  'errors.notFound.message': 'The page you are looking for does not exist or has moved.',
  'errors.backHome': 'Back to home',

  'workspace.welcome': 'Welcome, {name}',
  'workspace.foundationNotice':
    'The platform foundation is in place for this area. Its features are delivered in a later development phase.',

  'status.label': 'Status',
  'status.new': 'New',
  'status.under_review': 'Under review',
  'status.accepted': 'Accepted',
  'status.rejected': 'Rejected',
  'statusHelp.new': 'Received and waiting for an administrator to review it.',
  'statusHelp.under_review': 'An administrator is reviewing this submission.',
  'statusHelp.accepted': 'Accepted by an administrator. This is not a commercial agreement.',
  'statusHelp.rejected': 'Not accepted by an administrator.',
} as const;

export type TranslationKey = keyof typeof en;
