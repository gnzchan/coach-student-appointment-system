"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { getTimeSlots } from "@/lib/utils";
import { format } from "date-fns";

// Initial value when loading calendar. Purpose is to force user to choose a date (hacky and not the best approach)
const UNREACHABLE_DATE = "1999-1-1";

const CoachAvailabilityForm = () => {
  const [date, setDate] = useState<{
    calendarDate: Date;
    dateTime: Date | null;
  }>({
    calendarDate: new Date(UNREACHABLE_DATE),
    dateTime: null,
  });
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const handleOnDateClick = (value: Date) => {
    setDate((prev) => ({ ...prev, calendarDate: value }));
    setTimeSlots(getTimeSlots(value));
  };

  return (
    <div>
      <Calendar
        selected={date.calendarDate}
        fromDate={new Date()}
        onDayClick={handleOnDateClick}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-5">
        {timeSlots.map((ts) => {
          return (
            <button>
              {format(ts.startDateTime, "hh:mm aaaaa'm'")}
              <br />
              {format(ts.endDateTime, "hh:mm aaaaa'm'")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { CoachAvailabilityForm };
