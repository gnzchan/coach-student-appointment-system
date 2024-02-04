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
  const coachSlots = await getCoachSlots(user.id);
  const availableCoachSlots = await getAvailableCoachSlots();

  return (
    <div>
      {user.type === "coach" ? (
        <CoachAvailabilityForm coachSlots={coachSlots} />
      ) : (
        <StudentBookingForm availableCoachSlots={availableCoachSlots} />
      )}
    </div>
  );
}
