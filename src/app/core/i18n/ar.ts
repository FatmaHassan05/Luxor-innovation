import { TranslationKey } from './en';

/** Typed against English keys: the build fails if any key is missing. */
export const ar: Record<TranslationKey, string> = {
  'brand.platformName': 'منصة الابتكار',
  'brand.logoAlt': 'شعار جامعة الأقصر',
  'brand.documentTitle': 'منصة الابتكار – جامعة الأقصر',

  'nav.home': 'الرئيسية',
  'nav.skipToContent': 'تخطَّ إلى المحتوى الرئيسي',
  'nav.menu': 'القائمة',
  'nav.signIn': 'تسجيل الدخول',
  'nav.signOut': 'تسجيل الخروج',
  'nav.mainNavigation': 'التنقل الرئيسي',
  'nav.workspaceNavigation': 'التنقل داخل مساحة العمل',
  'nav.signInResearcher': 'دخول الباحثين',
  'nav.signInCompany': 'دخول الشركات',
  'nav.myWorkspace': 'مساحة عملي',
  'nav.researcher.submissions': 'ابتكاراتي',
  'nav.company.submissions': 'تحدياتي',
  'nav.judge.matching': 'مساحة المطابقة',
  'nav.admin.dashboard': 'لوحة الإدارة',

  'lang.switchLabel': 'تغيير اللغة',

  'footer.judgeSignIn': 'دخول المُقيّمين / المحكّمين',
  'footer.adminSignIn': 'دخول مسؤول النظام',
  'footer.rights': 'جامعة الأقصر. جميع الحقوق محفوظة.',

  'home.title': 'حيث يلتقي البحث الجامعي بتحديات الواقع',
  'home.lead':
    'خدمة من جامعة الأقصر تربط الباحثين بالشركات والمؤسسات التي تحتاج إلى حلول عملية.',
  'home.researcherCta': 'الدخول كباحث',
  'home.companyCta': 'الدخول كشركة',

  'role.researcher': 'باحث',
  'role.company': 'شركة',
  'role.judge': 'مُقيّم / محكّم',
  'role.admin': 'مسؤول النظام',

  'auth.title.researcher': 'تسجيل دخول الباحث',
  'auth.title.company': 'تسجيل دخول الشركة',
  'auth.title.judge': 'تسجيل دخول المُقيّم / المحكّم',
  'auth.title.admin': 'تسجيل دخول مسؤول النظام',
  'auth.subtitle.researcher': 'سجّل الدخول لتقديم ابتكاراتك ومتابعة حالتها.',
  'auth.subtitle.company': 'سجّل الدخول لتقديم تحدياتك ومتابعة حالتها.',
  'auth.subtitle.judge': 'لحسابات المُقيّمين / المحكّمين التي ينشئها مسؤول المنصة.',
  'auth.subtitle.admin': 'مخصص لمسؤولي المنصة فقط.',
  'auth.panelText': 'نربط أبحاث جامعة الأقصر بالمشكلات التي تحتاج الصناعة والمجتمع إلى حلها.',
  'auth.email': 'البريد الإلكتروني',
  'auth.password': 'كلمة المرور',
  'auth.showPassword': 'إظهار كلمة المرور',
  'auth.hidePassword': 'إخفاء كلمة المرور',
  'auth.submit': 'تسجيل الدخول',
  'auth.submitting': 'جارٍ تسجيل الدخول…',
  'auth.backHome': 'العودة إلى الرئيسية',
  'auth.error.invalid': 'تعذّر تسجيل الدخول بهذه البيانات. تحقق منها وحاول مرة أخرى.',
  'auth.error.network': 'تعذّر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى.',
  'auth.sessionExpired': 'انتهت جلستك. سجّل الدخول مرة أخرى للمتابعة.',
  'auth.demoNotice': 'وضع العرض التجريبي: يعتمد تسجيل الدخول على حسابات تجريبية مدمجة، وليس مصادقة حقيقية.',
  'auth.demoAccount': 'حساب تجريبي',
  'auth.demoFill': 'تعبئة البيانات التجريبية',

  'validation.required': 'هذا الحقل مطلوب.',
  'validation.email': 'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@example.com.',
  'common.required': 'مطلوب',

  'feedback.info': 'معلومة',
  'feedback.success': 'تم بنجاح',
  'feedback.warning': 'تنبيه',
  'feedback.error': 'خطأ',

  'errors.accessDenied.title': 'لا يمكنك فتح هذه الصفحة',
  'errors.accessDenied.message': 'لا يملك حسابك صلاحية عرض هذه الصفحة.',
  'errors.accessDenied.action': 'الانتقال إلى مساحة عملي',
  'errors.notFound.title': 'الصفحة غير موجودة',
  'errors.notFound.message': 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
  'errors.backHome': 'العودة إلى الرئيسية',

  'workspace.welcome': 'مرحبًا، {name}',
  'workspace.foundationNotice':
    'الأساس التقني لهذه المساحة جاهز. ستُضاف خصائصها في مرحلة تطوير لاحقة.',

  'status.label': 'الحالة',
  'status.new': 'جديد',
  'status.under_review': 'قيد المراجعة',
  'status.accepted': 'مقبول',
  'status.rejected': 'مرفوض',
  'statusHelp.new': 'تم الاستلام وبانتظار مراجعة مسؤول النظام.',
  'statusHelp.under_review': 'يقوم مسؤول النظام بمراجعة هذا الطلب.',
  'statusHelp.accepted': 'قُبل من مسؤول النظام. هذا لا يعني وجود اتفاق تجاري.',
  'statusHelp.rejected': 'لم يقبله مسؤول النظام.',
};
