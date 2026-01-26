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

export function isValidSlotTime(
  timeString: string,
  openingTime: string,
  slotDurationMinutes: number,
): boolean {
  const startMin = timeToMinutes(timeString);
  const openMin = timeToMinutes(openingTime);
  const offset = startMin - openMin;

  if (offset < 0) {
    return false;
  }

  return offset % slotDurationMinutes === 0;
}
