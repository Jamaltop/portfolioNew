"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, Mail, Check, Copy, AlertCircle } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/shared/context/language-context";
import { siteConfig } from "@/config/site";

export function LinkedInModal() {
  const { isLinkedInModalOpen, closeLinkedInModal, t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(siteConfig.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isLinkedInModalOpen && (
        <motion.div
          key="linkedin-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeLinkedInModal}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        >
          <motion.div
            key="linkedin-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#111113] border border-border/80 rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLinkedInModal}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0077b5]/15 border border-[#0077b5]/30 flex items-center justify-center text-[#0077b5]">
                <FaLinkedin size={26} />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle size={12} />
                  {t.linkedinModal.badge}
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  {t.linkedinModal.title}
                </h3>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t.linkedinModal.desc}
            </p>

            {/* Direct Connect Options */}
            <div className="space-y-2.5 mb-6">
              {/* Telegram */}
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeLinkedInModal}
                className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/70 hover:bg-secondary border border-border/70 hover:border-accent/40 text-sm font-medium text-foreground transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#229ed9]/15 text-[#229ed9] flex items-center justify-center">
                    <Send size={15} />
                  </div>
                  <span>{t.linkedinModal.telegramBtn}</span>
                </div>
                <span className="text-xs font-mono text-accent group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>

              {/* Phone */}
              <a
                href={siteConfig.phoneUrl}
                onClick={closeLinkedInModal}
                className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/70 hover:bg-secondary border border-border/70 hover:border-accent/40 text-sm font-medium text-foreground transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Phone size={15} />
                  </div>
                  <span className="font-mono">{t.linkedinModal.callBtn}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>

              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/70 border border-border/70 text-sm font-medium text-foreground">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <Mail size={15} />
                  </div>
                  <span className="truncate font-mono text-xs sm:text-sm text-muted-foreground">
                    {siteConfig.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-background text-xs font-mono text-accent transition-colors"
                >
                  {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeLinkedInModal}
              className="w-full py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground uppercase tracking-wider transition-colors"
            >
              {t.linkedinModal.closeBtn}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
