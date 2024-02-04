import { create } from "zustand";

interface UserStore {
  user: User | undefined;
  users: User[];
  setUser: (user: User | undefined) => void;
  setUsers: (users: User[]) => void;
}

const useUser = create<UserStore>((set) => ({
  user: undefined,
  users: [],
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
}));

export { useUser };
