"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useMobileNavbar } from "@/hooks/useMobileNavbar";
import { usePathname } from "next/navigation";

const routes = [
  { label: "Home", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "Upcoming", href: "/upcoming" },
  { label: "History", href: "/history" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { onClose } = useMobileNavbar();

  return (
    <div className="w-full flex flex-col gap-5 lg:grid lg:grid-cols-4 max-w-[900px] justify-center">
      {routes.map((route) => (
        <Link key={route.href} href={route.href} onClick={onClose}>
          <div
            className={cn(
              "nav-link  text-lg rounded-md transition duration-200 after:bg-neutral-900 w-min mx-auto",
              pathname === route.href
                ? "text-neutral-900 lg:after:w-full"
                : "text-neutral-500"
            )}
          >
            {route.label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export { Navbar };
