import { TranslationKey } from '../i18n/en';

/** Exactly four statuses: New → Under Review → Accepted | Rejected. Only the Admin may change status. */
export const SUBMISSION_STATUSES = ['new', 'under_review', 'accepted', 'rejected'] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export interface StatusMeta {
  labelKey: TranslationKey;
  helpKey: TranslationKey;
  icon: string;
}

export const STATUS_META: Record<SubmissionStatus, StatusMeta> = {
  new: { labelKey: 'status.new', helpKey: 'statusHelp.new', icon: 'pi-inbox' },
  under_review: { labelKey: 'status.under_review', helpKey: 'statusHelp.under_review', icon: 'pi-search' },
  accepted: { labelKey: 'status.accepted', helpKey: 'statusHelp.accepted', icon: 'pi-check-circle' },
  rejected: { labelKey: 'status.rejected', helpKey: 'statusHelp.rejected', icon: 'pi-times-circle' },
};
