import { GuideAccordion } from "@/components/custom/home/guide-accordion";
import {
  deletePastUnbookedSlots,
  getActiveUser,
} from "@/lib/firebase-functions";

export const revalidate = 0;

export default async function Home() {
  await deletePastUnbookedSlots();
  const user = await getActiveUser();

  const messageContent: { userType: UserType; message: string }[] = [
    {
      userType: "student",
      message:
        "Book your coaching sessions with experienced mentors who are ready to guide you on your journey to success. Unlock personalized advice and achieve your goals by scheduling calls with our expert coaches.",
    },
    {
      userType: "coach",
      message:
        "Open your schedule and make a positive impact by allowing students to book time with you. Share your knowledge, help others learn, and foster connections by making your availability accessible to eager learners.",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="py-44 lg:text-center">
        <h1 className="text-5xl md:text-8xl font-light mb-6">
          welcome <span className="font-extrabold">{user?.name}</span>
        </h1>
        <p>
          {messageContent.find((msg) => msg.userType === user?.type)?.message}
        </p>
      </div>
      <div className="mb-16">
        <GuideAccordion />
      </div>
    </div>
  );
}
