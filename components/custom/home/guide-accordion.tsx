import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GuideAccordion = () => {
  return (
    <div className="flex flex-col gap-6">
      <span className="text-3xl md:text-5xl">quickguide</span>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="calendar">
          <AccordionTrigger>Calendar</AccordionTrigger>
          <AccordionContent>
            The Calendar tab is your scheduling hub. Coaches, block your 2-hour
            schedules to make them available for students to book. Students,
            explore and book available slots set by your coach. Manage your time
            efficiently with our easy-to-use scheduling system.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="upcoming">
          <AccordionTrigger>Upcoming</AccordionTrigger>
          <AccordionContent>
            The Upcoming tab keeps you informed about your upcoming
            appointments. Coaches, cancel appointments to unblock the schedule,
            and view your students&apos; details. Students, cancel your
            appointments or see details about your booked slots. Manage your
            commitments hassle-free.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="history">
          <AccordionTrigger>History</AccordionTrigger>
          <AccordionContent>
            The History tab provides a comprehensive view of your past
            appointments. Coaches, see details of your historical appointments
            with students and add scores and notes for your reference. Students,
            revisit your past appointments and review the details of your
            interactions with your coach. Reflect on your journey together.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export { GuideAccordion };
