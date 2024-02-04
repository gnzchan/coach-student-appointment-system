type UserType = "student" | "coach";

type User = {
  id: string;
  name: string;
  phoneNumber: string;
  type: UserType;
};

type Slot = {
  id: string;
  startDateTime: string;
  endDateTime: string;
  coachId: string;
  studentId: string;
  score: number | undefined;
  notes: string;
};

type TimeSlot = {
  startDateTime: Date;
  endDateTime: Date;
};
