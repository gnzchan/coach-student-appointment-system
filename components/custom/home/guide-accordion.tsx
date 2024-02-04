import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const guides: { value: string; triggerText: string; content: string }[] = [
  {
    value: "calendar",
    triggerText: "Calendar",
    content:
      "The Calendar tab is your scheduling hub. Coaches, block your 2-hour schedules to make them available for students to book. Students, explore and book available slots set by your coach. Manage your time efficiently with our easy-to-use scheduling system.",
  },
  {
    value: "upcoming",
    triggerText: "Upcoming",
    content:
      "The Upcoming tab keeps you informed about your upcoming appointments. Coaches, cancel appointments to unblock the schedule, and view your students' details. Students, cancel your appointments or see details about your booked slots. Manage your commitments hassle-free.",
  },
  {
    value: "history",
    triggerText: "History",
    content:
      "The History tab provides a comprehensive view of your past appointments. Coaches, see details of your historical appointments with students and add scores and notes for your reference. Students, revisit your past appointments and review the details of your interactions with your coach. Reflect on your journey together.",
  },
  {
    value: "switch",
    triggerText: "Switch User",
    content:
      "The User Switching feature allows you to seamlessly transition between coach and student profiles. Locate the user selector dropdown in the footer to toggle between user types. Enhance your experience by easily exploring the functionalities specific to each user role.",
  },
];

const GuideAccordion = () => {
  return (
    <div className="flex flex-col gap-6">
      <span className="text-3xl md:text-5xl">quickguide</span>
      <Accordion type="single" collapsible className="w-full">
        {guides.map((guide) => (
          <AccordionItem
            key={`accordion-guide-${guide.value}`}
            value={guide.value}
          >
            <AccordionTrigger>{guide.triggerText}</AccordionTrigger>
            <AccordionContent>{guide.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export { GuideAccordion };
