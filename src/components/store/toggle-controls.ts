import { create } from "zustand";

type menuTypes = "sidebarToggle" | "ticketDialog";

type modalType = {
  types: menuTypes | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean, types?: menuTypes) => void;
};
export const useToggle = create<modalType>((set) => ({
  types: null,
  isOpen: false,
  setIsOpen: (isOpen, types) => set({ isOpen, types }),
}));
