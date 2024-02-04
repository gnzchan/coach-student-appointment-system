"use client";

import { useEffect, useState } from "react";
import { GiWhistle } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { format } from "date-fns";

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

// const mockAppointments = [
//   {
//     coachId: "iD1YUo3D2Z",
//     endDateTime: "2/2/2024, 6:00:00 PM",
//     id: "bvE5fuFrIMfAk_GVAYGGR",
//     notes: "",
//     score: undefined,
//     startDateTime: "2/2/2024, 4:00:00 PM",
//     studentId: "4e7wH9jX2L",
//   },
//   {
//     coachId: "iD1YUo3D2Z",
//     endDateTime: "2/2/2024, 8:00:00 PM",
//     id: "aaE5fuFrIMfAk_GVAYGGR",
//     notes: "",
//     score: undefined,
//     startDateTime: "2/2/2024, 6:00:00 PM",
//     studentId: "4e7wH9jX2L",
//   },
//   {
//     coachId: "iD1YUo3D2Z",
//     endDateTime: "2/2/2024, 8:00:00 PM",
//     id: "ccE5fuFrIMfAk_GVAYGGR",
//     notes: "",
//     score: undefined,
//     startDateTime: "2/2/2024, 10:00:00 PM",
//     studentId: "4e7wH9jX2L",
//   },
//   {
//     coachId: "yjzO2w4Q8E",
//     endDateTime: "2/2/2024, 6:00:00 PM",
//     id: "ddE5fuFrIMfAk_GVAYGGR",
//     notes: "",
//     score: undefined,
//     startDateTime: "2/2/2024, 4:00:00 PM",
//     studentId: "Lq5gI46eUd",
//   },
//   {
//     coachId: "NvEz6qRPg9",
//     endDateTime: "2/2/2024, 8:00:00 PM",
//     id: "eeE5fuFrIMfAk_GVAYGGR",
//     notes: "",
//     score: undefined,
//     startDateTime: "2/2/2024, 6:00:00 PM",
//     studentId: "Lq5gI46eUd",
//   },
//   {
//     coachId: "NvEz6qRPg9",
//     endDateTime: "2/2/2024, 10:00:00 PM",
//     id: "ffE5fuFrIMfAk_GVAYGGR",
//     notes: "",
//     score: undefined,
//     startDateTime: "2/2/2024, 8:00:00 PM",
//     studentId: "Lq5gI46eUd",
//   },
// ];

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
          {user?.type === "coach" && (
            <>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-center">Notes</TableHead>
            </>
          )}
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
            {user?.type === "coach" && (
              <>
                <TableCell className="text-center">{slot.score}</TableCell>
                <TableCell className="truncate w-full text-wrap">
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
