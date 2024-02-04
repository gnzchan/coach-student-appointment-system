import { add } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeSlots = (date: Date): TimeSlot[] => {
  if (!date) return [];

  const startTime = add(date, { hours: 0 });
  const endTime = add(date, { hours: 22 });
  let times: TimeSlot[] = [];

  for (let i = startTime; i <= endTime; i = add(i, { hours: 2 })) {
    times.push({ startDateTime: i, endDateTime: add(i, { hours: 2 }) });
  }

  times = times.filter((time) => time.startDateTime > new Date());

  return times;
};
