"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToggle } from "./toggle-controls";
import { UserButton } from "../dev/userbutton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout-action";
import { useSessionStore } from "./user-session";

const ModalProvider = () => {
  const state = useToggle((state) => state);
  const session = useSessionStore((state) => state.session);
  const router = useRouter();
  const handleLogout = async () => {
    const res = await logout();
    router.push("/login");
  };
  return (
    <Sheet
      onOpenChange={state.setIsOpen}
      open={state.isOpen && state.types === "sidebarToggle"}
    >
      <SheetContent>
        <SheetHeader>
          <SheetDescription>
            <div className="grid gap-y-4 ">
              {session ? (
                <>
                  <Link
                    href={"/technology"}
                    className=" cursor-pointer  text-lg w-fit text-blue-950"
                  >
                    Techology
                  </Link>
                  <Link
                    href={"/entertainment"}
                    className=" cursor-pointer  text-lg w-fit text-blue-950"
                  >
                    Entertainment
                  </Link>
                  <Link
                    href={"/othermatter"}
                    className=" cursor-pointer text-lg w-fit text-blue-950"
                  >
                    Other matters
                  </Link>
                  <Link
                    href={"/create-blog"}
                    className=" cursor-pointer  text-lg w-fit text-blue-950"
                  >
                    Create-blog
                  </Link>
                  <span
                    onClick={handleLogout}
                    className=" cursor-pointer  text-lg w-fit text-blue-950"
                  >
                    Log out
                  </span>
                </>
              ) : (
                <Link
                  href={"/login"}
                  className=" cursor-pointer  text-lg w-fit text-blue-950"
                >
                  Login
                </Link>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ModalProvider;
