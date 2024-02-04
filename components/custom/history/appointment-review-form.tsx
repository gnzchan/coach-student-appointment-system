import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateCoachSlot } from "@/lib/firebase-functions";

const AppointmentReviewForm = ({ slot }: { slot: Slot }) => {
  const router = useRouter();
  const [review, setReview] = useState<{
    score: number | undefined;
    notes: string;
  }>({
    score: slot.score,
    notes: slot.notes,
  });

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    let score = parseInt(e.currentTarget.value);

    if (score > 5) {
      score = 5;
    } else if (score < 1) {
      score = 1;
    }

    setReview((prev) => ({ ...prev, score }));
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value;

    setReview((prev) => ({ ...prev, notes }));
  };

  const handleSaveReview = async () => {
    const data: Slot = {
      ...slot,
      notes: review.notes,
      score: review.score,
    };

    await updateCoachSlot(data);
    router.refresh();
    toast.success("Updated");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription>
            Make changes to your call review here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="score" className="text-right">
              Score
            </Label>
            <Input
              id="score"
              type="number"
              className="col-span-3"
              value={review.score}
              onChange={handleScoreChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              className="col-span-3"
              placeholder="Type your notes here."
              value={review.notes}
              onChange={handleNoteChange}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSaveReview}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AppointmentReviewForm };
