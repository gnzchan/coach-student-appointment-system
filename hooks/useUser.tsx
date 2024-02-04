import { create } from "zustand";

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
