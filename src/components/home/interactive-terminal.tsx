"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Copy, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/shared/context/language-context";

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error";
  text?: string;
  component?: React.ReactNode;
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const { t, openLinkedInModal } = useLanguage();

  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "output",
      text: t.terminal.welcome,
    },
    {
      id: "2",
      type: "command",
      text: "whoami",
    },
    {
      id: "3",
      type: "output",
      text: t.terminal.whoamiOutput,
    },
  ]);

  // Update initial line when language switches
  useEffect(() => {
    setHistory((prev) => {
      if (prev.length > 0 && prev[0].id === "1") {
        const next = [...prev];
        next[0] = { ...next[0], text: t.terminal.welcome };
        return next;
      }
      return prev;
    });
  }, [t]);

  const handleCopy = (str: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(str);
      setCopiedText(str);
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: "command", text: rawCmd },
    ];

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (cmd === "help") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: "Available commands: whoami, skills, projects, contact, phone, email, github, telegram, linkedin, clear, hire",
      });
    } else if (cmd === "whoami") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: t.terminal.whoamiOutput,
      });
    } else if (cmd === "skills" || cmd === "stack") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: t.terminal.skillsOutput,
      });
    } else if (cmd === "projects") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: t.terminal.projectsOutput,
      });
    } else if (cmd === "github") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `GitHub Profile: ${siteConfig.links.github}`,
      });
    } else if (cmd === "telegram") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Telegram: https://t.me/jsscriptdev (@jsscriptdev)`,
      });
    } else if (cmd === "linkedin") {
      openLinkedInModal();
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Notice: LinkedIn account is currently unavailable. Notice modal opened.`,
      });
    } else if (cmd === "contact" || cmd === "phone" || cmd === "email") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        component: (
          <div className="py-2 space-y-1 text-xs font-mono">
            <div className="text-accent font-semibold">{t.terminal.directContact}</div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">Phone:</span>
              <span className="text-emerald-400 font-bold">{siteConfig.phone}</span>
              <button
                type="button"
                onClick={() => handleCopy(siteConfig.phone)}
                className="text-muted-foreground hover:text-accent transition-colors"
                title="Copy phone"
              >
                {copiedText === siteConfig.phone ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-amber-400 font-bold">{siteConfig.email}</span>
              <button
                type="button"
                onClick={() => handleCopy(siteConfig.email)}
                className="text-muted-foreground hover:text-accent transition-colors"
                title="Copy email"
              >
                {copiedText === siteConfig.email ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
              </button>
            </div>
            <div className="text-muted-foreground">
              Telegram: <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@jsscriptdev</a>
            </div>
            <div className="text-muted-foreground">
              GitHub: <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">github.com/Jamaltop</a>
            </div>
          </div>
        ),
      });
    } else if (cmd === "hire" || cmd === "sudo hire") {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: t.terminal.hireOutput,
      });
    } else {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: "error",
        text: `Command not found: "${cmd}". Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const quickChips = [
    { label: "whoami", cmd: "whoami" },
    { label: "skills", cmd: "skills" },
    { label: "projects", cmd: "projects" },
    { label: "contact", cmd: "contact" },
    { label: "phone", cmd: "phone" },
    { label: "github", cmd: "github" },
    { label: "hire", cmd: "hire" },
    { label: "clear", cmd: "clear" },
  ];

  return (
    <section className="section-py border-t border-border/40">
      <div className="container">
        <Reveal>
          <SectionHeading
            label={t.terminal.tag}
            title={t.terminal.title}
            description={t.terminal.desc}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="max-w-4xl mx-auto rounded-xl bg-[#0c0c0e] border border-border/80 shadow-2xl overflow-hidden font-mono">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#151518] border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-muted-foreground flex items-center gap-1.5">
                  <TerminalIcon size={13} className="text-accent" />
                  camal@baku-terminal ~ zsh
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>interactive</span>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2.5 bg-[#111113] border-b border-border/40 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Sparkles size={11} className="text-accent" />
                {t.terminal.quickCmds}
              </span>
              {quickChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => executeCommand(chip.cmd)}
                  className="px-2.5 py-0.5 text-xs rounded bg-secondary/80 hover:bg-accent hover:text-accent-foreground border border-border/60 hover:border-accent text-foreground/80 transition-all duration-150"
                >
                  ${chip.label}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              className="p-4 sm:p-6 min-h-[260px] max-h-[380px] overflow-y-auto space-y-3 text-xs sm:text-sm"
            >
              {history.map((item) => (
                <div key={item.id} className="leading-relaxed">
                  {item.type === "command" && (
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <span className="text-muted-foreground">camal@baku:~$</span>
                      <span>{item.text}</span>
                    </div>
                  )}
                  {item.type === "output" && (
                    <div className="text-foreground/90 pl-3 border-l-2 border-border/50">
                      {item.text && <p>{item.text}</p>}
                      {item.component}
                    </div>
                  )}
                  {item.type === "error" && (
                    <p className="text-red-400 pl-3 border-l-2 border-red-500/50">
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand(inputVal);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-[#111113] border-t border-border/60"
            >
              <span className="text-accent font-bold text-xs sm:text-sm">camal@baku:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t.terminal.placeholder}
                className="flex-1 bg-transparent text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/40 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="p-1.5 text-muted-foreground hover:text-accent rounded transition-colors"
                title="Run command"
              >
                <CornerDownLeft size={14} />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
