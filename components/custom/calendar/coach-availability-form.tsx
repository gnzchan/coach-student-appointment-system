"use client";

import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { TimeSlotsContainer } from "@/components/custom/calendar/time-slots-container";
import { useUser } from "@/hooks/useUser";
import { useCoachTimeSlots } from "@/hooks/useCoachTimeSlots";
import { getTimeSlots } from "@/lib/utils";

// Initial value when loading calendar. Purpose is to force user to choose a date (hacky and not the best approach)
const UNREACHABLE_DATE = "1999-1-1";

const CoachAvailabilityForm = ({ coachSlots }: { coachSlots: Slot[] }) => {
  const { user } = useUser();
  const [date, setDate] = useState<{
    calendarDate: Date;
    dateTime: Date | null;
  }>({
    calendarDate: new Date(UNREACHABLE_DATE),
    dateTime: null,
  });
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const { coachTimeSlots, setCoachTimeSlots, onToggleSlot } = useCoachTimeSlots(
    user,
    coachSlots
  );

  useEffect(() => {
    const initialCoachTimeSlots = coachSlots.map((slot) => ({
      startDateTime: new Date(slot.startDateTime),
      endDateTime: new Date(slot.endDateTime),
    }));
    setCoachTimeSlots(initialCoachTimeSlots);
  }, [coachSlots]);

  const handleOnDateClick = (value: Date) => {
    setDate((prev) => ({ ...prev, calendarDate: value }));
    setTimeSlots(getTimeSlots(value));
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
        <TimeSlotsContainer
          timeSlots={timeSlots}
          coachTimeSlots={coachTimeSlots}
          handleToggleSlot={onToggleSlot}
        />
      </div>
    </div>
  );
};

export { CoachAvailabilityForm };
