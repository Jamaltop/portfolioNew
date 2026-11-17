"use client";

import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { LanguageProvider } from "@/shared/context/language-context";
import { LinkedInModal } from "@/components/ui/linkedin-modal";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen overflow-x-clip" id="top">
        <Header />
        <main>{children}</main>
        <Footer />
        <LinkedInModal />
      </div>
    </LanguageProvider>
  );
};

export default Wrapper;
