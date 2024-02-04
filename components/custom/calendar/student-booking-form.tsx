"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { AvailableTimeSlotsContainer } from "@/components/custom/calendar/available-time-slots-container";

// Initial value when loading calendar. Purpose is to force user to choose a date (hacky and not the best approach)
const UNREACHABLE_DATE = "1999-1-1";

const StudentBookingForm = ({
  availableCoachSlots,
}: {
  availableCoachSlots: Slot[];
}) => {
  const [date, setDate] = useState<{
    calendarDate: Date;
    dateTime: Date | null;
  }>({
    calendarDate: new Date(UNREACHABLE_DATE),
    dateTime: null,
  });

  const handleOnDateClick = (value: Date) => {
    setDate((prev) => ({ ...prev, calendarDate: value }));
  };

  return (
    <div className="lg:grid lg:grid-cols-2 gap:12 lg:gap-4 flex flex-col px-10 w-full">
      <div className="flex justify-center">
        <Calendar
          selected={date.calendarDate}
          fromDate={new Date()}
          onDayClick={handleOnDateClick}
        />
      </div>
      <div className="flex justify-center items-center">
        <AvailableTimeSlotsContainer
          date={date}
          availableCoachSlots={availableCoachSlots}
        />
      </div>
    </div>
  );
};

export { StudentBookingForm };
