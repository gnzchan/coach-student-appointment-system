import { collection, getDocs } from "firebase/firestore";

import { database } from "@/firebase";

// USERS FUNCTIONS

export const getActiveUser = async (): Promise<User> => {
  const querySnapshot = await getDocs(collection(database, "activeUser"));

  const user = querySnapshot.docs[0]?.data() as unknown as User;

  return user;
};
