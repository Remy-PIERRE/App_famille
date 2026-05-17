import type { Timestamp } from "firebase/firestore";
import type { RecurrenceFrequency } from "./recurrenceFrequency";

export interface RecurrenceRule {
  frequency: RecurrenceFrequency;
  interval: number;

  daysOfWeek?: number[];
  dayOfMonth?: number;

  endsAt?: Timestamp | null;
}
