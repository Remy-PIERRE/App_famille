export const RECURRENCE_FREQUENCY = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
} as const;

export type RecurrenceFrequency =
  (typeof RECURRENCE_FREQUENCY)[keyof typeof RECURRENCE_FREQUENCY];
