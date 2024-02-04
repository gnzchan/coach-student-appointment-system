import { useState } from "react";
import Router, { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

import {
  addCoachSlot,
  deleteCoachSlot,
  getCoachSlot,
} from "@/lib/firebase-functions";

const useCoachTimeSlots = (user: User | undefined, coachSlots: Slot[]) => {
  const router = useRouter();
  const [coachTimeSlots, setCoachTimeSlots] = useState<TimeSlot[]>([]);

  const toggleDeleteSlot = async (coachSlot: Slot, slot: TimeSlot) => {
    setCoachTimeSlots((prev) =>
      prev.filter(
        (ct) =>
          ct.startDateTime.toLocaleString() !==
            slot.startDateTime.toLocaleString() &&
          ct.endDateTime.toLocaleString() !== slot.endDateTime.toLocaleString()
      )
    );
    await deleteCoachSlot(coachSlot.id);
    toast.success("Removed");
  };

  const toggleAddSlot = async (slot: TimeSlot) => {
    if (!user) return;

    setCoachTimeSlots((prev) => [
      ...prev,
      { startDateTime: slot.startDateTime, endDateTime: slot.endDateTime },
    ]);
    const data = {
      id: nanoid(),
      startDateTime: slot.startDateTime.toLocaleString(),
      endDateTime: slot.endDateTime.toLocaleString(),
      coachId: user.id,
      studentId: "",
      notes: "",
      score: 0,
    };
    await addCoachSlot(data);
    toast.success("Added");
  };

  const onToggleSlot = async (slot: TimeSlot) => {
    if (!user) return;

    const coachSlot = getCoachSlot(user.id, slot);

    if (coachSlot) {
      await toggleDeleteSlot(coachSlot, slot);
    } else {
      await toggleAddSlot(slot);
    }
    router.refresh();
  };

  const getCoachSlot = (coachId: string, slot: TimeSlot) => {
    const coachSlot = coachSlots.find((s) => {
      return (
        s.coachId === coachId &&
        new Date(s.startDateTime).getTime() === slot.startDateTime.getTime() &&
        new Date(s.endDateTime).getTime() === slot.endDateTime.getTime()
      );
    });

    return coachSlot;
  };

  return { coachTimeSlots, setCoachTimeSlots, onToggleSlot };
};

export { useCoachTimeSlots };
