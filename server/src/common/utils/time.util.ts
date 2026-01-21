import { TimeSlot } from 'src/common/interfaces/time-slot.interface';

export function timeToMinutes(time: string): number {
  const normalized = time.length >= 5 ? time.slice(0, 5) : time;
  const [hours, minutes] = normalized.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    throw new Error(`Invalid time format: ${time}`);
  }
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

/**
 * Generate all time slots between opening and closing time
 * @param openingTime - Opening time (e.g., '11:00:00' or '11:00')
 * @param closingTime - Closing time (e.g., '21:00:00' or '21:00')
 * @param durationMinutes - Duration of each slot in minutes (e.g., 60)
 * @returns Array of time slots
 */
export function generateSlots(
  openingTime: string,
  closingTime: string,
  durationMinutes: number,
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const openMinutes = timeToMinutes(openingTime);
  const closeMinutes = timeToMinutes(closingTime);

  let currentStart = openMinutes;

  while (currentStart + durationMinutes <= closeMinutes) {
    slots.push({
      startMinutes: currentStart,
      endMinutes: currentStart + durationMinutes,
    });

    currentStart += durationMinutes;
  }

  return slots;
}

export function overlapsMinutes(
  slot: TimeSlot,
  bookingStartMinutes: number,
  bookingEndMinutes: number,
): boolean {
  return (
    slot.startMinutes < bookingEndMinutes &&
    bookingStartMinutes < slot.endMinutes
  );
}

export function dateToMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}
