"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/modules/Navbar/Navbar";

export const NavbarWrapper = () => {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";

  if (hideNavbar) return null;

  return <Navbar />;
};
