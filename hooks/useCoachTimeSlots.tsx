import { useState } from "react";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

import {
  addCoachSlot,
  deleteCoachSlot,
  getCoachSlot,
} from "@/lib/firebase-functions";

const useCoachTimeSlots = (user: User | undefined) => {
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

    const coachSlot = await getCoachSlot(user.id, slot);

    if (coachSlot) {
      await toggleDeleteSlot(coachSlot, slot);
    } else {
      await toggleAddSlot(slot);
    }
  };

  return { coachTimeSlots, setCoachTimeSlots, onToggleSlot };
};

export { useCoachTimeSlots };
