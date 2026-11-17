import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about my journey, skills, and philosophy as a frontend developer.",
};

export default function AboutPage() {
  return <AboutContent />;
}
