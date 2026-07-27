"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectMeta, TagColor } from "@/lib/work";

const TAG_STYLES: Record<TagColor, string> = {
  gray: "bg-[#fafafa] border-[#e9eaeb] text-[#414651]",
  purple: "bg-[#f4f3ff] border-[#d9d6fe] text-[#5925dc]",
  green: "bg-[#ecfdf3] border-[#abefc6] text-[#067647]",
};

export default function FocusedProject({
  project,
  onClose,
}: {
  project: ProjectMeta | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 120%, rgba(24,24,27,0.85) 0%, rgba(16,16,16,0.6) 100%)",
              backdropFilter: "blur(17px)",
              WebkitBackdropFilter: "blur(17px)",
            }}
          />

          {/* Focused card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex w-full max-w-[520px] flex-col gap-4"
          >
            <div className="group relative aspect-[513/378] w-full overflow-hidden rounded-3xl">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="520px"
                className="object-cover"
                priority
              />
              {/* View case study button */}
              <Link
                href={`/work/${project.slug}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[80px] border border-white/90 bg-[rgba(16,16,16,0.51)] px-5 py-2 font-pixel text-sm text-white shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#101010] backdrop-blur-md transition-transform duration-200 hover:scale-[1.03]"
              >
                View case study
              </Link>
            </div>

            <div className="flex flex-col gap-2 pb-6">
              <h2 className="text-lg leading-[22px] text-white">{project.title}</h2>
              <p className="text-sm leading-5 tracking-[-0.01em] font-light text-white/90">
                {project.subtitle}
              </p>
              <div className="mt-1 flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-2xl border px-2 py-0.5 font-inter text-xs font-medium ${TAG_STYLES[tag.color]}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
