import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
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

