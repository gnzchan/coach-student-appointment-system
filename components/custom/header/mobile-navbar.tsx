"use client";

import { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Navbar } from "@/components/custom/header/navbar";
import { useMobileNavbar } from "@/hooks/useMobileNavbar";

const MobileNavbar = () => {
  const { isOpen, setIsOpen } = useMobileNavbar();

  useEffect(() => {
    const closeSidebarOnLargeScreenHandler = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeSidebarOnLargeScreenHandler);

    return () => {
      window.removeEventListener("resize", closeSidebarOnLargeScreenHandler);
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <RxHamburgerMenu size={24} />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetClose />
        <Navbar />
      </SheetContent>
    </Sheet>
  );
};

export { MobileNavbar };
