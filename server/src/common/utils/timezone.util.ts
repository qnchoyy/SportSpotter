import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { timeToMinutes } from './time.util';

export const APP_TIMEZONE = process.env.APP_TIMEZONE || 'Europe/Sofia';

/**
 * Converts local date + time (interpreted in APP_TIMEZONE)
 * to a real UTC Date object.
 *
 * @example
 * localTimeToUTC("2026-01-29", "16:30")
 * -> 2026-01-29T14:30:00.000Z
 */
export function localTimeToUTC(dateString: string, timeString: string): Date {
  const localIso = `${dateString}T${timeString}:00`;
  return fromZonedTime(localIso, APP_TIMEZONE);
}

/**
 * Converts a UTC Date to a Date whose getHours()/getMinutes()
 * reflect the local time in APP_TIMEZONE.
 *
 * IMPORTANT:
 * Date is still a UTC moment internally — this is only for
 * reading local components (hours/minutes).
 */
export function utcToLocalTime(utcDate: Date): Date {
  return toZonedTime(utcDate, APP_TIMEZONE);
}

/**
 * Returns minutes since start of local day (00:00)
 * in APP_TIMEZONE.
 *
 * @example
 * 16:00 -> 960
 */
export function utcDateToLocalMinutes(utcDate: Date): number {
  const local = utcToLocalTime(utcDate);
  return local.getHours() * 60 + local.getMinutes();
}

/**
 * Returns start/end of a calendar day in APP_TIMEZONE,
 * converted to UTC Date objects (for DB queries).
 *
 * @example
 * getLocalDayBoundsUtc("2026-01-29")
 */
export function getLocalDayBoundsUtc(dateString: string): {
  startUtc: Date;
  endUtc: Date;
} {
  const startLocalIso = `${dateString}T00:00:00.000`;
  const endLocalIso = `${dateString}T23:59:59.999`;

  return {
    startUtc: fromZonedTime(startLocalIso, APP_TIMEZONE),
    endUtc: fromZonedTime(endLocalIso, APP_TIMEZONE),
  };
}

/**
 * Checks whether a UTC Date falls exactly on a slot boundary
 * in APP_TIMEZONE (HH:00:00).
 *
 * Used to reject times like 16:30.
 */
export function isSlotAlignedLocal(
  utcDate: Date,
  openingTime: string,
  slotDurationMinutes: number,
): boolean {
  const localMinutes = utcDateToLocalMinutes(utcDate);
  const openMin = timeToMinutes(openingTime);
  const offset = localMinutes - openMin;

  if (offset < 0) {
    return false;
  }

  return offset % slotDurationMinutes === 0;
}
