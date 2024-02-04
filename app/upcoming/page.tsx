import { UpcomingAppointments } from "@/components/custom/upcoming/upcoming-appointments";
import {
  getActiveUser,
  getCoachUpcomingAppointments,
  getStudentUpcomingAppointments,
} from "@/lib/firebase-functions";

export const revalidate = 0;

export default async function Upcoming() {
  const user = await getActiveUser();
  const upcomingAppointments =
    user.type === "coach"
      ? await getCoachUpcomingAppointments(user.id)
      : await getStudentUpcomingAppointments(user.id);

  return <UpcomingAppointments upcomingAppointments={upcomingAppointments} />;
}
