"use client";

import { useEffect, useState } from "react";
import { GiWhistle } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { format } from "date-fns";

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
    toast.success("Cancelled");
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
          <TableHead className="text-center">
            <span className="flex items-center justify-center">
              {user?.type === "coach" ? (
                <>
                  <PiStudent size={14} className="mx-2" />
                  Student
                </>
              ) : (
                <>
                  <GiWhistle size={14} className="mx-2" />
                  Coach
                </>
              )}
            </span>
          </TableHead>
          <TableHead className="text-center">Schedule</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((slot) => (
          <TableRow key={slot.id}>
            <TableCell className="font-medium text-center min-w-[170px]">
              {user?.type === "coach" ? (
                <>
                  <span>{`${getUserName(slot.studentId)}`}</span>
                  <br />
                  <span> {`${getUserPhoneNumber(slot.studentId)}`}</span>
                </>
              ) : (
                <>
                  <span>{`${getUserName(slot.coachId)}`}</span>
                  <br />
                  <span> {`${getUserPhoneNumber(slot.coachId)}`}</span>
                </>
              )}
            </TableCell>
            <TableCell className="text-center min-w-[170px]">
              <span>{`${format(slot.startDateTime, "MMM d, yyyy, ha")}`}</span>
              <br />
              <span>{`${format(slot.endDateTime, "MMM d, yyyy, ha")}`}</span>
            </TableCell>
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
