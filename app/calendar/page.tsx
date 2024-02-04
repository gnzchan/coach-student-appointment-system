import { CoachAvailabilityForm } from "@/components/custom/calendar/coach-availability-form";
import { StudentBookingForm } from "@/components/custom/calendar/student-booking-form";
import {
  getActiveUser,
  getAvailableCoachSlots,
  getCoachSlots,
} from "@/lib/firebase-functions";

export const revalidate = 0;

export default async function Calendar() {
  const user = await getActiveUser();

  // Ternary to avoid making server call if data won't be used
  const coachSlots = user?.type === "coach" ? await getCoachSlots(user.id) : [];
  const availableCoachSlots =
    user?.type === "student" ? await getAvailableCoachSlots() : [];

  return (
    <>
      {user?.type === "coach" ? (
        <CoachAvailabilityForm coachSlots={coachSlots} />
      ) : (
        <StudentBookingForm availableCoachSlots={availableCoachSlots} />
      )}
    </>
  );
}
