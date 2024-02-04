import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { database } from "@/firebase";

// USERS FUNCTIONS

export const getActiveUser = async (): Promise<User> => {
  const querySnapshot = await getDocs(collection(database, "activeUser"));

  const user = querySnapshot.docs[0]?.data() as unknown as User;

  return user;
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(database, "users"));
  const users: User[] = [];
  querySnapshot.forEach((d) => users.push(d.data() as User));

  return users;
};

export const switchActiveUser = async (newUser: User) => {
  const querySnapshot = await getDocs(collection(database, "activeUser"));
  const removeUsersPromise: Promise<void>[] = [];

  // Although activeUser is expected to have one (1) document only, just to be sure and for demo purposes, remove all docs in collection
  // Manually remove all documents in activeUser collection
  querySnapshot.docs.forEach((d) => {
    const promise = deleteDoc(
      doc(database, "activeUser", (d.data() as Slot).id)
    );
    removeUsersPromise.push(promise);
  });

  await Promise.all(removeUsersPromise);
  await setDoc(doc(database, "activeUser", newUser.id.toString()), newUser);
};

// COACH FUNCTIONS

export const getCoachSlot = async (coachId: string, timeSlot: TimeSlot) => {
  const q = query(
    collection(database, "slots"),
    where("coachId", "==", coachId),
    where("startDateTime", "==", timeSlot.startDateTime.toLocaleString()),
    where("endDateTime", "==", timeSlot.endDateTime.toLocaleString())
  );

  const querySnapshot = await getDocs(q);
  const slot = querySnapshot.docs[0]?.data() as unknown as Slot;

  return slot;
};

export const getCoachSlots = async (coachId: string) => {
  const q = query(
    collection(database, "slots"),
    where("coachId", "==", coachId)
  );

  const querySnapshot = await getDocs(q);
  const slots: Slot[] = [];

  querySnapshot.docs.forEach((doc) => slots.push(doc.data() as Slot));

  return slots;
};

export const addCoachSlot = async (slot: Slot) => {
  await setDoc(doc(database, "slots", slot.id.toString()), slot);
};

export const deleteCoachSlot = async (slotId: string) => {
  await deleteDoc(doc(database, "slots", slotId));
};
