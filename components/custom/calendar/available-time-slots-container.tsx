import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AvailableTimeSlotsContainer = ({
  date,
  availableCoachSlots,
}: {
  date: {
    calendarDate: Date;
    dateTime: Date | null;
  };
  availableCoachSlots: Slot[];
}) => {
  const [availableSlotsForDay, setAvailableSlotsForDay] = useState<Slot[]>([]);

  useEffect(() => {
    const slots = availableCoachSlots
      .filter(
        (slot) =>
          slot.startDateTime.includes(date.calendarDate.toLocaleDateString()) &&
          new Date() < new Date(slot.startDateTime)
      )
      .sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
      );
    setAvailableSlotsForDay(slots);
  }, [date, availableCoachSlots]);

  if (availableSlotsForDay.length === 0) {
    return <span className="text-center">No available slots</span>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Coach</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableSlotsForDay.map((slot) => (
            <TableRow key={slot.id}>
              <TableCell className="font-medium">{slot.coachId}</TableCell>
              <TableCell>{slot.startDateTime}</TableCell>
              <TableCell>{slot.endDateTime}</TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => {
                    // book slot
                  }}
                  className="border-2 px-6 py-2 rounded-sm hover:bg-green-500 hover:text-white"
                >
                  Book
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { AvailableTimeSlotsContainer };
