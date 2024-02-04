import { CoachAvailabilityForm } from "@/components/custom/calendar/coach-availability-form";
import { getActiveUser, getCoachSlots } from "@/lib/firebase-functions";

export default async function Calendar() {
  const user = await getActiveUser();
  const coachSlots = await getCoachSlots(user.id);

  return (
    <div>
      <CoachAvailabilityForm coachSlots={coachSlots} />
    </div>
  );
}
