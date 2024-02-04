"use client";

import { useEffect, useState } from "react";
import { GiWhistle } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";

import { AppointmentReviewForm } from "@/components/custom/history/appointment-review-form";
import { NoData } from "@/components/custom/no-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";

const PastAppointments = ({
  pastAppointments,
}: {
  pastAppointments: Slot[];
}) => {
  const { user, users } = useUser();
  const [appointments, setAppointments] = useState<Slot[]>(pastAppointments);

  useEffect(() => {
    setAppointments(pastAppointments);
  }, [pastAppointments]);

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);

    return user?.name;
  };

  const getUserPhoneNumber = (userId: string) => {
    const user = users.find((u) => u.id === userId);

    return user?.phoneNumber;
  };

  if (appointments.length === 0) {
    return <NoData msg="No past appointments" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <span className="flex items-center">
              <GiWhistle size={14} className="mx-2" />
              Coach
            </span>
          </TableHead>
          <TableHead>
            <span className="flex items-center">
              <PiStudent size={14} className="mx-2" />
              Student
            </span>
          </TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
          {user?.type === "coach" && (
            <>
              <TableHead>Score</TableHead>
              <TableHead>Notes</TableHead>
            </>
          )}
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
            {user?.type === "coach" && (
              <>
                <TableCell>{slot.score}</TableCell>
                <TableCell className="truncate max-w-[200px] text-wrap">
                  {slot.notes}
                </TableCell>
                <TableCell className="text-right">
                  <AppointmentReviewForm slot={slot} />
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { PastAppointments };
