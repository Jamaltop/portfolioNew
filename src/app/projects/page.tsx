import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects/projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've built — from full-stack applications to UI experiments.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
