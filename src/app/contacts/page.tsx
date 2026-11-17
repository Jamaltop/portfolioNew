import type { Metadata } from "next";
import { ContactContent } from "@/components/contacts/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — let's discuss your project or just say hello.",
};

export default function ContactsPage() {
  return <ContactContent />;
}
