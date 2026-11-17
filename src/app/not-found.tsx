"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-8xl md:text-9xl font-bold text-border/60 font-mono block mb-4">
            404
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-md text-sm hover:bg-accent/90 transition-all duration-200"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
