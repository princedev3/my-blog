"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToggle } from "./toggle-controls";

const ModalProvider = () => {
  const state = useToggle((state) => state);
  return (
    <Sheet
      onOpenChange={state.setIsOpen}
      open={state.isOpen && state.types === "sidebarToggle"}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ModalProvider;
