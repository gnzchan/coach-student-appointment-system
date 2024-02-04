import { format } from "date-fns";

import { NoData } from "@/components/custom/no-data";
import { cn } from "@/lib/utils";

interface TimeSlotProps {
  timeSlots: TimeSlot[];
  coachTimeSlots: TimeSlot[];
  handleToggleSlot: (slot: TimeSlot) => void;
}

const TimeSlotsContainer = ({
  timeSlots,
  coachTimeSlots,
  handleToggleSlot,
}: TimeSlotProps) => {
  if (timeSlots.length === 0) {
    return <NoData msg="Select date" />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-5">
      {timeSlots.map((ts, i) => {
        const isCoachTimeSlot = coachTimeSlots.some(
          (cs) =>
            cs.startDateTime.toLocaleString() ===
              ts.startDateTime.toLocaleString() &&
            cs.endDateTime.toLocaleString() === ts.endDateTime.toLocaleString()
        );

        return (
          <button
            key={`time-slot-${i}`}
            onClick={() => handleToggleSlot(ts)}
            className={cn(
              "rounded-md",
              isCoachTimeSlot
                ? "bg-green-400 text-white"
                : "border-neutral-300 border-solid border hover:bg-neutral-200"
            )}
          >
            {format(ts.startDateTime, "hh:mm aaaaa'm'")}
            <br />
            {format(ts.endDateTime, "hh:mm aaaaa'm'")}
          </button>
        );
      })}
    </div>
  );
};

export { TimeSlotsContainer };
