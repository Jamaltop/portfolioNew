"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "@/shared/hooks/use-in-view";
import { cn } from "@/shared/lib/cn";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function Reveal({
  children,
  variants = defaultVariants,
  className,
  delay = 0,
}: RevealProps) {
  const { ref, isInView } = useInView(0.15);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}
