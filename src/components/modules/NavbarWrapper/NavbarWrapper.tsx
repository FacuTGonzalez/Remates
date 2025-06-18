"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/modules/Navbar/Navbar";

export const NavbarWrapper = () => {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname === "/registerAccount";

  if (hideNavbar) return null;

  return <Navbar />;
};
