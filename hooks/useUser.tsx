import { create } from "zustand";

type UserType = "student" | "coach";

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  type: UserType;
}

interface UserStore {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const useUser = create<UserStore>((set) => ({
  user: undefined,
  users: [],
  setUser: (user) => set({ user }),
}));

export { useUser };
