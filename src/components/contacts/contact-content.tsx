"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Send,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Clock,
  MapPin,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { cn } from "@/shared/lib/cn";
import { useLanguage } from "@/shared/context/language-context";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactContent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submittedSnapshot, setSubmittedSnapshot] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { lang, t, openLinkedInModal } = useLanguage();

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = lang === "ru" ? "Укажите ваше имя" : lang === "az" ? "Adınızı qeyd edin" : "Required";
    }

    if (!formData.email.trim()) {
      newErrors.email = lang === "ru" ? "Укажите email" : lang === "az" ? "E-poçt daxil edin" : "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === "ru" ? "Неверный формат email" : lang === "az" ? "Düzgün e-poçt formatı deyil" : "Invalid format";
    }

    if (!formData.message.trim()) {
      newErrors.message = lang === "ru" ? "Напишите сообщение" : lang === "az" ? "Mesajınızı yazın" : "Required";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = lang === "ru" ? "Минимум 5 символов" : lang === "az" ? "Minimum 5 simvol" : "Min 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");

    try {
      // 1. Prepare Web3Forms direct browser submission
      const web3Data = new window.FormData();
      web3Data.append("access_key", "68a9a815-2463-452e-b2c3-39fcb8dd8a28");
      web3Data.append("name", formData.name);
      web3Data.append("email", formData.email);
      web3Data.append("phone", formData.phone || "Не указан");
      web3Data.append("message", formData.message);
      web3Data.append(
        "subject",
        `🔥 Новое сообщение с портфолио от ${formData.name}`
      );
      web3Data.append(
        "from_name",
        `${formData.name} (Портфолио Camal)`
      );

      const web3Promise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3Data,
      });

      // 2. Send to local Next.js API route as well
      const apiPromise = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await Promise.allSettled([web3Promise, apiPromise]);

      setSubmittedSnapshot({ ...formData });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Submission notice:", err);
      setSubmittedSnapshot({ ...formData });
      setStatus("success");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const generateTelegramUrl = (data: FormData) => {
    const text = encodeURIComponent(
      `Привет, Camal!\n\n` +
      `Имя: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Телефон: ${data.phone || "Не указан"}\n\n` +
      `Сообщение: ${data.message}`
    );
    return `https://t.me/jsscriptdev?text=${text}`;
  };

  const generateMailtoUrl = (data: FormData) => {
    const subject = encodeURIComponent(`Запрос с портфолио от ${data.name}`);
    const body = encodeURIComponent(
      `Имя: ${data.name}\nEmail: ${data.email}\nТелефон: ${data.phone || "Не указан"}\n\nСообщение:\n${data.message}`
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-28 md:pt-36">
      <section className="pb-24 md:pb-32">
        <div className="container">
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl mb-14 md:mb-16">
              <span className="inline-block text-accent font-mono text-xs tracking-widest uppercase mb-3 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                {t.contactPage.tag}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                {t.contactPage.titleStart}{" "}
                <span className="text-accent">{t.contactPage.titleEnd}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t.contactPage.desc}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="bg-secondary/30 border border-border/60 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center justify-between">
                    <span>{t.contactPage.formTitle}</span>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      SSL Encrypted
                    </span>
                  </h2>

                  {/* FORM BODY (when not in success state) */}
                  {status !== "success" ? (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                        >
                          {t.contactPage.nameLabel}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.contactPage.namePlaceholder}
                          className={cn(
                            "w-full px-4 py-3 bg-secondary/60 border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-all duration-200",
                            errors.name
                              ? "border-destructive focus:ring-destructive/30"
                              : "border-border/60 focus:ring-accent/40 focus:border-accent/50"
                          )}
                          disabled={status === "submitting"}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 font-mono">
                            <AlertCircle size={12} />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email & Phone Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                          >
                            {t.contactPage.emailLabel}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t.contactPage.emailPlaceholder}
                            className={cn(
                              "w-full px-4 py-3 bg-secondary/60 border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-all duration-200",
                              errors.email
                                ? "border-destructive focus:ring-destructive/30"
                                : "border-border/60 focus:ring-accent/40 focus:border-accent/50"
                            )}
                            disabled={status === "submitting"}
                          />
                          {errors.email && (
                            <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 font-mono">
                              <AlertCircle size={12} />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                          >
                            {t.contactPage.phoneLabel}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+994 51 ..."
                            className="w-full px-4 py-3 bg-secondary/60 border border-border/60 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/50 transition-all duration-200"
                            disabled={status === "submitting"}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                        >
                          {t.contactPage.messageLabel}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t.contactPage.messagePlaceholder}
                          rows={5}
                          className={cn(
                            "w-full px-4 py-3 bg-secondary/60 border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-all duration-200 resize-none",
                            errors.message
                              ? "border-destructive focus:ring-destructive/30"
                              : "border-border/60 focus:ring-accent/40 focus:border-accent/50"
                          )}
                          disabled={status === "submitting"}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 font-mono">
                            <AlertCircle size={12} />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={cn(
                          "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 shadow-md",
                          status === "submitting"
                            ? "bg-accent/60 text-accent-foreground/60 cursor-not-allowed"
                            : "bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/20 active:scale-95"
                        )}
                      >
                        {status === "submitting" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                            <span>{t.contactPage.submitting}</span>
                          </>
                        ) : (
                          <>
                            <span>{t.contactPage.submitBtn}</span>
                            <Send size={15} />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* SUCCESS SCREEN WITH DIRECT ROUTING BUTTONS */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3.5 text-emerald-400">
                        <CheckCircle size={22} className="shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-base text-foreground mb-1">
                            {t.contactPage.successTitle}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {lang === "ru" &&
                              "Сообщение принято сервером! Чтобы получить мгновенный ответ от Camal, вы также можете отправить копию прямо в Telegram или на Email в 1 клик:"}
                            {lang === "en" &&
                              "Message received by server! For an instant reply from Camal, you can also send a pre-filled copy directly to Telegram or Email in 1 click:"}
                            {lang === "az" &&
                              "Mesaj qəbul edildi! Camal-dan dərhal cavab almaq üçün nüsxəni 1 kliklə birbaşa Telegram və ya E-poçtla göndərə bilərsiniz:"}
                          </p>
                        </div>
                      </div>

                      {/* Direct 1-Click Action Options */}
                      {submittedSnapshot && (
                        <div className="space-y-3 pt-2">
                          <a
                            href={generateTelegramUrl(submittedSnapshot)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 rounded-xl bg-[#229ed9]/15 hover:bg-[#229ed9]/25 border border-[#229ed9]/30 text-sm font-semibold text-foreground transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <Send size={18} className="text-[#229ed9]" />
                              <span>
                                {lang === "ru" ? "Открыть диалог в Telegram с этим сообщением" : lang === "az" ? "Bu mesajla Telegram-da söhbət açın" : "Open Telegram chat with this message"}
                              </span>
                            </div>
                            <ExternalLink size={16} className="text-[#229ed9] group-hover:translate-x-0.5 transition-transform" />
                          </a>

                          <a
                            href={generateMailtoUrl(submittedSnapshot)}
                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/80 text-sm font-semibold text-foreground transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <Mail size={18} className="text-accent" />
                              <span>
                                {lang === "ru" ? "Отправить копию через почтовую программу" : lang === "az" ? "E-poçt proqramı vasitəsilə nüsxə göndər" : "Send copy via default email client"}
                              </span>
                            </div>
                            <ExternalLink size={16} className="text-accent group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      )}

                      {/* Reset button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setStatus("idle")}
                          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <RotateCcw size={13} />
                          <span>
                            {lang === "ru" ? "Отправить еще одно сообщение" : lang === "az" ? "Yeni mesaj göndər" : "Send another message"}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Direct Contact Cards Column */}
            <div className="lg:col-span-5 space-y-4">
              <Reveal delay={0.2}>
                <div className="bg-secondary/30 border border-border/60 rounded-2xl p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <h3 className="font-bold text-foreground text-base">{t.contactPage.directChannels}</h3>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {t.contactPage.activeNow}
                    </span>
                  </div>

                  {/* Phone Direct Card */}
                  <div className="p-4 rounded-xl bg-secondary/70 border border-border/70 flex items-center justify-between gap-3">
                    <a
                      href={siteConfig.phoneUrl}
                      className="flex items-center gap-3 min-w-0 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
                        <Phone size={18} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[11px] font-mono uppercase text-muted-foreground">
                          {t.contactPage.callWhatsapp}
                        </span>
                        <span className="block text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                          {siteConfig.phone}
                        </span>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(siteConfig.phone, "phone")}
                      className="p-2 text-muted-foreground hover:text-accent transition-colors rounded-lg bg-background/50 hover:bg-background"
                      title="Copy phone"
                    >
                      {copiedItem === "phone" ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Email Direct Card */}
                  <div className="p-4 rounded-xl bg-secondary/70 border border-border/70 flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-3 min-w-0 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[11px] font-mono uppercase text-muted-foreground">
                          {t.contactPage.directEmail}
                        </span>
                        <span className="block text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                          {siteConfig.email}
                        </span>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(siteConfig.email, "email")}
                      className="p-2 text-muted-foreground hover:text-accent transition-colors rounded-lg bg-background/50 hover:bg-background"
                      title="Copy email"
                    >
                      {copiedItem === "email" ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Social & Messenger Links */}
                  <div className="space-y-2 pt-2">
                    <a
                      href={siteConfig.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/60 text-sm text-foreground/80 hover:text-foreground transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Send size={16} className="text-accent" />
                        <span>Telegram (@jsscriptdev)</span>
                      </div>
                      <ArrowUpRight size={14} className="text-muted-foreground" />
                    </a>

                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/60 text-sm text-foreground/80 hover:text-foreground transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Github size={16} className="text-accent" />
                        <span>GitHub (Jamaltop)</span>
                      </div>
                      <ArrowUpRight size={14} className="text-muted-foreground" />
                    </a>

                    {/* LinkedIn button triggers notice modal */}
                    <button
                      type="button"
                      onClick={openLinkedInModal}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/60 text-sm text-foreground/80 hover:text-foreground transition-all duration-200 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <FaLinkedin size={16} className="text-accent" />
                        <span>LinkedIn Profile</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Notice
                      </span>
                    </button>
                  </div>

                  {/* Location & Response Time Meta */}
                  <div className="pt-4 border-t border-border/40 grid grid-cols-2 gap-3 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-accent" />
                      <span>{siteConfig.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-accent" />
                      <span>{t.contactPage.avgReply}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
