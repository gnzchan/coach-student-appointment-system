import { create } from "zustand";

interface MobileNavbarStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useMobileNavbar = create<MobileNavbarStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export { useMobileNavbar };
