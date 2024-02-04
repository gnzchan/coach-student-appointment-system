"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { deleteCoachSlot, updateCoachSlot } from "@/lib/firebase-functions";

const UpcomingAppointments = ({
  upcomingAppointments,
}: {
  upcomingAppointments: Slot[];
}) => {
  const router = useRouter();
  const { user, users } = useUser();
  const [appointments, setAppointments] = useState<Slot[]>([]);

  useEffect(() => {
    setAppointments(
      upcomingAppointments.sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
      )
    );
  }, [upcomingAppointments]);

  const cancelSlot = async (slot: Slot) => {
    if (!user) return;

    if (user.type === "coach") {
      await deleteCoachSlot(slot.id);
    } else {
      const data = {
        ...slot,
        studentId: "",
      };
      await updateCoachSlot(data);
    }
    setAppointments((prev) => prev.filter((s) => s.id !== slot.id));
    router.refresh();
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);

    return user?.name;
  };

  const getUserPhoneNumber = (userId: string) => {
    const user = users.find((u) => u.id === userId);

    return user?.phoneNumber;
  };

  if (appointments.length === 0) {
    return <NoData msg="No upcoming appointments" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Coach</TableHead>
          <TableHead>Student</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((slot) => (
          <TableRow key={slot.id}>
            <TableCell className="font-medium">
              {`${getUserName(slot.coachId)} - ${getUserPhoneNumber(
                slot.coachId
              )}`}
            </TableCell>
            <TableCell className="font-medium">
              {`${getUserName(slot.studentId)} - ${getUserPhoneNumber(
                slot.studentId
              )}`}
            </TableCell>
            <TableCell>{slot.startDateTime}</TableCell>
            <TableCell>{slot.endDateTime}</TableCell>
            <TableCell className="text-right">
              <button
                onClick={() => {
                  cancelSlot(slot);
                }}
                className="border-2 px-6 py-2 rounded-sm hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { UpcomingAppointments };
