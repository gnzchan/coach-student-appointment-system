import { PastAppointments } from "@/components/custom/history/past-appointments";
import {
  getActiveUser,
  getCoachPastAppointments,
  getStudentPastAppointments,
} from "@/lib/firebase-functions";

export const revalidate = 0;

export default async function History() {
  const user = await getActiveUser();

  const pastAppointments =
    user?.type === "coach"
      ? await getCoachPastAppointments(user.id)
      : await getStudentPastAppointments(user.id);

  return <PastAppointments pastAppointments={pastAppointments} />;
}
