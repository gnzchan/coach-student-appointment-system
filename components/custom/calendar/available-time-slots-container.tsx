import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoData } from "@/components/custom/no-data";
import { useUser } from "@/hooks/useUser";
import {
  isCoachSlotAvailable,
  updateCoachSlot,
} from "@/lib/firebase-functions";

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
  const router = useRouter();
  const { user, users } = useUser();
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

  const bookSlot = async (slot: Slot) => {
    if (!user) return;

    // Checks if other users have booked the slot already. Guard clause to check if slot still available
    const stillAvailable = await isCoachSlotAvailable(slot.id);

    if (stillAvailable) {
      setAvailableSlotsForDay((prev) => prev.filter((s) => s.id !== slot.id));
      const data = { ...slot, studentId: user.id };
      await updateCoachSlot(data);
      toast.success("Booked");
    } else {
      toast.error("Failed to book. Reload page");
    }
    router.refresh();
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);

    return user?.name;
  };

  if (availableSlotsForDay.length === 0) {
    return <NoData msg="No available slot" />;
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
              <TableCell className="font-medium">
                {getUserName(slot.coachId)}
              </TableCell>
              <TableCell>{slot.startDateTime}</TableCell>
              <TableCell>{slot.endDateTime}</TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => {
                    bookSlot(slot);
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
