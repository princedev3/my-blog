"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { logout } from "@/actions/logout-action";
import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/user-session";
import { UserButton } from "./userbutton";
import { AlignLeft } from "lucide-react";
import { useToggle } from "../store/toggle-controls";

const Navbar = () => {
  const session = useSessionStore((state) => state.session);
  const state = useToggle((state) => state);

  return (
    <div className="border-b border-zinc-100 ">
      <div className="w-full max-w-4xl mx-auto grid grid-flow-col items-center  h-[60px]">
        <Link href={"/"} className="cursor-pointer w-fit">
          <Logo size={50} color="#172554" />
        </Link>
        <div className="justify-self-end md:flex items-center gap-4 hidden">
          <Link
            href={"/technology"}
            className=" cursor-pointer w-fit text-blue-950"
          >
            Techology
          </Link>
          <Link
            href={"/entertainment"}
            className=" cursor-pointer w-fit text-blue-950"
          >
            Entertainment
          </Link>
          <Link
            href={"/othermatter"}
            className=" cursor-pointer w-fit text-blue-950"
          >
            Other matters
          </Link>
          <UserButton />
        </div>
        <div className="justify-self-end md:hidden items-center gap-4 ">
          <Button onClick={() => state.setIsOpen(true, "sidebarToggle")}>
            <AlignLeft />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
