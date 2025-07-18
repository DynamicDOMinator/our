"use client";
import { usePathname } from "next/navigation";
import LastSection from "./LastSection";

export default function ConditionalLastSection() {
  const pathname = usePathname();

  // Only render LastSection on the home page
  if (pathname === "/" || pathname === "/about") {
    return <LastSection />;
  }

  return null;
}
