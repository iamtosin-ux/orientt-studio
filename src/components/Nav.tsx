"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Cal from "@calcom/embed-react";

const CAL_LINK = "samuel-tosin/30min";

const SERVICES = ["Product design", "Website", "Mobile apps"];
const PRICING_TABS = ["Basic", "Pro"] as const;

const PLANS = {
  Basic: {
    cadence: "Billed Monthly",
    price: "£3500",
    columns: [
      ["Dedicated partnership", "Up to 40hours design hours per month"],
      ["One week trial", "Continuous iteration till we hit the mark"],
    ],
  },
  Pro: {
    cadence: "Billed Monthly",
    price: "£5000",
    columns: [
      ["Dedicated partnership", "Up to 60hours design hours per month"],
      ["One week trial", "Continuous iteration till we hit the mark"],
    ],
  },
} as const;

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.17 10h11.66M11.67 5.83 15.83 10l-4.16 4.17"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="11" height="9" viewBox="0 0 8.75 6.5" fill="none" aria-hidden>
      <path
        d="M1 3.25 3.25 5.5 7.75 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Mode = "info" | "book" | null;

export default function Nav() {
  const [mode, setMode] = useState<Mode>(null);
  const [tab, setTab] = useState<(typeof PRICING_TABS)[number]>("Basic");
  const navRef = useRef<HTMLElement>(null);
  const expanded = mode !== null;

  // Lets other parts of the page (e.g. the footer "Contact us" link) open the booking panel
  useEffect(() => {
    const onOpenBook = () => setMode("book");
    window.addEventListener("open-book", onOpenBook);
    return () => window.removeEventListener("open-book", onOpenBook);
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMode(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [expanded]);

  // Sections opt into a light backdrop with data-nav-theme="light";
  // the CTA flips from its blue tint to a white, dark-text variant.
  const [navTheme, setNavTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    if (!els.length) return;

    // Track every element currently under the nav band; "light" wins
    // if any of them are light, so the theme reverts to dark as soon
    // as the last light element scrolls past.
    const intersecting = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) intersecting.add(e.target);
          else intersecting.delete(e.target);
        });
        let theme: "dark" | "light" = "dark";
        intersecting.forEach((el) => {
          if (el.getAttribute("data-nav-theme") === "light") theme = "light";
        });
        setNavTheme(theme);
      },
      { rootMargin: "-44px 0px -90% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const plan = PLANS[tab];
  const widthClass =
    mode === "book"
      ? "w-[840px] max-w-[calc(100vw-1.25rem)] rounded-[28px]"
      : mode === "info"
        ? "w-[636px] max-w-[calc(100vw-1.25rem)] rounded-[28px]"
        : "rounded-full";

  return (
    <>
      {/* Backdrop behind the expanded nav — blurs the page with a subtle radial tint */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeIn" } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            onClick={() => setMode(null)}
            aria-hidden
            className="fixed inset-0 z-40"
            style={{
              background:
                "radial-gradient(13.36% 95.22% at 50% -15.45%, rgba(24,24,27,0.00) 0%, rgba(24,24,27,0.01) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-2.5 py-6">
        <motion.nav
          ref={navRef}
          layout
          transition={expanded ? { duration: 0.38, ease: "easeIn" } : { duration: 0 }}
          className={`relative flex flex-col overflow-hidden border border-white/[0.18] bg-white/[0.08] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.15),0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-[1.8] ${widthClass}`}
        >
        {/* Top bar — shared across both states */}
        <motion.div layout="position" className="flex items-center justify-center gap-3 p-1">
          <a
            href="#top"
            aria-label="orientt: home"
            className={`px-2 transition-colors duration-200 ${
              navTheme === "light" ? "text-[#101010]" : "text-white"
            }`}
          >
            <svg width={69} height={30} viewBox="0 0 68.9673 29.9901" fill="none" aria-hidden>
              <path d="M9.34509 21.9882C8.58724 21.9882 7.88226 21.854 7.23212 21.5865C6.581 21.3191 6.01212 20.9431 5.52647 20.4596C5.03984 19.976 4.66385 19.4086 4.39851 18.7593C4.13316 18.11 4 17.4034 4 16.6386C4 15.8738 4.1361 15.1643 4.40732 14.5091C4.67854 13.8528 5.05844 13.2805 5.54507 12.79C6.0317 12.2996 6.60645 11.9177 7.27031 11.6443C7.93416 11.371 8.65088 11.2338 9.42146 11.2338C10.192 11.2338 10.8843 11.368 11.5344 11.6354C12.1856 11.9029 12.7535 12.2818 13.2401 12.7723C13.7267 13.2627 14.1027 13.8321 14.368 14.4824C14.6334 15.1317 14.7665 15.8383 14.7665 16.6031C14.7665 17.3679 14.6304 18.0774 14.3592 18.7326C14.087 19.3889 13.7081 19.9583 13.2225 20.4428C12.7358 20.9273 12.1611 21.3053 11.4972 21.5796C10.8334 21.854 10.1166 21.9901 9.34607 21.9901L9.34509 21.9882ZM9.38327 19.1807C9.80039 19.1807 10.1793 19.0691 10.521 18.8461C10.8618 18.6231 11.131 18.3182 11.3269 17.9294C11.5227 17.5406 11.6206 17.1054 11.6206 16.6208C11.6206 16.1363 11.5227 15.6814 11.3269 15.2936C11.131 14.9058 10.8627 14.5998 10.521 14.3768C10.1803 14.1538 9.80039 14.0423 9.38327 14.0423C8.96616 14.0423 8.58724 14.1538 8.2465 14.3768C7.90576 14.5998 7.6365 14.9058 7.44067 15.2936C7.24485 15.6824 7.14693 16.1245 7.14693 16.6208C7.14693 17.1172 7.24485 17.5416 7.44067 17.9294C7.6365 18.3182 7.90478 18.6241 8.2465 18.8461C8.58724 19.0691 8.96714 19.1807 9.38327 19.1807Z" fill="currentColor" />
              <path d="M21.7177 11.2348C21.5532 11.2091 21.3887 11.1963 21.2252 11.1963C20.6563 11.1963 20.157 11.3493 19.7281 11.6552C19.2983 11.9611 18.9634 12.3933 18.7235 12.9538L18.61 11.3305H15.7665V21.9901H18.8557V16.6791C18.8557 15.9153 19.032 15.3321 19.3864 14.9314C19.7399 14.5298 20.2706 14.3295 20.9785 14.3295C21.1302 14.3295 21.2781 14.3393 21.424 14.3581C21.5327 14.3729 21.8264 14.3956 22.0281 14.4272V11.3137C21.9331 11.2782 21.8293 11.2516 21.7177 11.2348Z" fill="currentColor" />
              <path d="M26.1418 9.5424C26.1418 9.83154 26.0752 10.0911 25.944 10.323C25.8118 10.5539 25.6257 10.7394 25.3849 10.8776C25.144 11.0167 24.8748 11.0858 24.5761 11.0858C24.2775 11.0858 24.0112 11.0167 23.7762 10.8776C23.5412 10.7384 23.3571 10.5539 23.2259 10.323C23.0937 10.0921 23.0281 9.83154 23.0281 9.5424C23.0281 9.25326 23.0937 8.99373 23.2259 8.76281C23.3571 8.5319 23.5412 8.34637 23.7762 8.20822C24.0112 8.06908 24.2775 8 24.5761 8C24.8748 8 25.144 8.06908 25.3849 8.20822C25.6257 8.34736 25.8118 8.5319 25.944 8.76281C26.0752 8.99373 26.1418 9.25425 26.1418 9.5424ZM23.0408 21.9901V11.8081H26.13V21.9901H23.0408Z" fill="currentColor" />
              <path d="M32.3341 21.9901C31.5762 21.9901 30.8811 21.8599 30.2495 21.5984C29.618 21.3378 29.0677 20.9648 28.6007 20.4813C28.1326 19.9977 27.7733 19.4244 27.5207 18.7622C27.2681 18.1001 27.1418 17.3738 27.1418 16.5843C27.1418 15.7949 27.271 15.113 27.5305 14.4637C27.789 13.8143 28.1493 13.2479 28.6105 12.7634C29.0716 12.2798 29.6121 11.9039 30.2309 11.6364C30.8497 11.369 31.5195 11.2348 32.2401 11.2348C32.9979 11.2348 33.6873 11.366 34.3061 11.6266C34.9249 11.8881 35.4556 12.2601 35.8981 12.7436C36.3407 13.2282 36.6814 13.8074 36.9213 14.4824C37.1612 15.1574 37.2817 15.9094 37.2817 16.7363V17.4241H30.3063C30.4326 18.0478 30.6725 18.5294 31.027 18.8669C31.3804 19.2043 31.8289 19.3731 32.3723 19.3731C32.7767 19.3731 33.1331 19.2902 33.4435 19.1244C33.7529 18.9586 34.028 18.7109 34.2679 18.3794L37.0917 19.1244C36.8518 19.7106 36.4944 20.2168 36.0205 20.6431C35.5466 21.0704 34.9934 21.401 34.3619 21.6369C33.7303 21.8727 33.0538 21.9901 32.3341 21.9901ZM32.2391 13.5657C31.7339 13.5657 31.3129 13.7285 30.979 14.0531C30.6441 14.3778 30.4199 14.8396 30.3063 15.4377H34.0975C33.9967 14.8396 33.7852 14.3778 33.463 14.0531C33.1409 13.7285 32.7336 13.5657 32.2401 13.5657H32.2391Z" fill="currentColor" />
              <path d="M38.2817 21.9891V11.4657H41.1251L41.22 12.8028C41.5108 12.3065 41.9084 11.9117 42.4146 11.6187C42.9198 11.3256 43.5014 11.1795 44.1584 11.1795C44.8791 11.1795 45.5067 11.3581 46.0442 11.7144C46.5808 12.0706 46.9979 12.5709 47.2956 13.2144C47.5922 13.8578 47.7411 14.6186 47.7411 15.4969V21.9891H44.6519V15.936C44.6519 15.338 44.5158 14.8633 44.2446 14.513C43.9724 14.1627 43.5974 13.988 43.1166 13.988C42.7759 13.988 42.4753 14.0709 42.2158 14.2367C41.9563 14.4025 41.7517 14.6285 41.5999 14.9146C41.4482 15.2008 41.3728 15.5225 41.3728 15.8797V21.9901H38.2836L38.2817 21.9891Z" fill="currentColor" />
              <path d="M55.3081 19.229C55.0741 19.2862 54.8567 19.3149 54.654 19.3149C54.2624 19.3149 53.9716 19.1964 53.7826 18.9616C53.5927 18.7257 53.4987 18.3853 53.4987 17.9392V13.8568H55.3815L55.9308 11.3157H53.4987V8.04441H50.4095V11.3167H48.7411V13.8578H50.4095V18.3221C50.4095 19.5063 50.716 20.4142 51.3289 21.0448C51.9419 21.6753 52.8172 21.9901 53.954 21.9901C54.4592 21.9901 54.9204 21.9289 55.3375 21.8086C55.7546 21.6882 56.1276 21.5382 56.4557 21.3596L55.9818 18.9912C55.7673 19.0928 55.5421 19.1728 55.3091 19.23L55.3081 19.229ZM64.4914 18.9902C64.276 19.0918 64.0518 19.1718 63.8187 19.229C63.5847 19.2862 63.3664 19.3149 63.1647 19.3149C62.773 19.3149 62.4822 19.1964 62.2932 18.9616C62.1033 18.7257 62.0093 18.3853 62.0093 17.9392V13.8568H64.606V11.3157H62.0093V8.04441H58.9201V11.3167H56.9012L56.3519 13.8578H58.9211V18.3221C58.9211 19.5063 59.2266 20.4142 59.8405 21.0448C60.4535 21.6753 61.3288 21.9901 62.4656 21.9901C62.9708 21.9901 63.432 21.9289 63.8491 21.8086C64.2662 21.6882 64.6383 21.5382 64.9673 21.3596L64.4934 18.9912L64.4914 18.9902Z" fill="currentColor" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setMode((m) => (m === "book" ? null : "book"))}
            aria-expanded={mode === "book"}
            className={`group relative flex h-[39px] w-[192px] items-center justify-center gap-2 rounded-[80px] transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-0 ${
              navTheme === "light" ? "bg-white text-[#101010]" : "text-accent-fill"
            }`}
            style={{
              boxShadow:
                navTheme === "light"
                  ? "0px 2px 6px 0px rgba(0,0,0,0.18), 0px 1px 2px 0px rgba(0,0,0,0.12)"
                  : "0px 2px 5px 0px rgba(44,90,218,0.39), 0px 8px 8px 0px rgba(44,90,218,0.1), 0px 0px 30px 0px rgba(44,90,218,0.2)",
            }}
          >
            {navTheme === "light" ? (
              <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" />
            ) : (
              <>
                <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_0_1px_rgba(255,255,255,1)]" />
                <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#2c5ada] transition-shadow duration-200 group-hover:shadow-[inset_0_0_12px_0_rgba(255,255,255,0.12),inset_0_-10px_36px_0_#2c5ada]" />
              </>
            )}
            <span className="text-sm font-semibold">Book an intro call</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMode((m) => (m === null ? "info" : null))}
            aria-label={mode !== null ? "Close" : "Open details"}
            aria-expanded={mode !== null}
            className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full transition-transform duration-200 ease-out hover:scale-105 active:scale-100"
            style={{
              background:
                navTheme === "light"
                  ? "#ffffff"
                  : "radial-gradient(120% 120% at 50% 120%, #4a76f0 0%, #3d5ebb 25%, #314785 45%, #242f50 65%, #1e2436 80%, #18181b 100%)",
              boxShadow:
                navTheme === "light"
                  ? "0px 2px 6px 0px rgba(0,0,0,0.18), 0px 1px 2px 0px rgba(0,0,0,0.12)"
                  : undefined,
            }}
          >
            <span
              className={`pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] ${
                navTheme === "light" ? "" : "hidden"
              }`}
            />
            <span
              className={`pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] ${
                navTheme === "light" ? "hidden" : ""
              }`}
            />
            <motion.span
              animate={{ rotate: mode !== null ? 45 : 0 }}
              transition={mode !== null ? { duration: 0.4, ease: "easeIn" } : { duration: 0 }}
              className="grid place-items-center"
            >
              {/* A rotated plus reads as an "x" when expanded */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M10 4.17v11.66M4.17 10h11.66"
                  stroke={navTheme === "light" ? "#101010" : "white"}
                  strokeWidth="1.67"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
          </button>
        </motion.div>

        {/* Expanded panel — height collapse keeps the container shrink in sync with the fade */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key={mode}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, transition: { duration: 0.38, ease: "easeIn" } }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0 } }}
              className="overflow-hidden"
            >
              {mode === "book" ? (
                <div className="px-1 pb-1 pt-4">
                  <div className="h-[560px] w-full overflow-hidden rounded-2xl">
                    <Cal
                      calLink={CAL_LINK}
                      style={{ width: "100%", height: "100%", overflow: "scroll" }}
                      config={{ theme: "dark", layout: "month_view" }}
                    />
                  </div>
                </div>
              ) : (
              <div className="flex flex-col gap-6 px-1 pb-1 pt-5">
              {/* Studio description */}
              <div className="space-y-4 px-[18px] text-[15px] leading-6 text-[#d4d4d8]">
                <p>
                  Orientt Studio is a premier design subscription built to help founders ship
                  at venture speed. We turn complex concepts into validated, market-ready
                  products, prioritising speed-to-market and long-term success.
                </p>
                <p>
                  Currently partnering with category-defining teams across AI Insurance,
                  Travel, Fraud &amp; Compliance, FinTech, OpEx, DevTools, and Health &amp;
                  Sports Performance.
                </p>
              </div>

              {/* Service badges */}
              <div className="flex flex-wrap gap-3 px-[18px]">
                {SERVICES.map((s) => (
                  <span
                    key={s}
                    className="rounded-2xl border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 font-inter text-xs font-medium text-[#414651]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Pricing block */}
              <div className="flex flex-col gap-3 rounded-[20px] bg-gradient-to-b from-[#232324] to-[#3d3d3d] px-2 py-3">
                <div className="flex items-center gap-2.5 px-[9px]">
                  <p className="flex-1 text-sm font-semibold tracking-[-0.01em] text-white">
                    Pricing
                  </p>
                  <div className="flex gap-0.5 rounded-xl bg-white/[0.04] p-0.5">
                    {PRICING_TABS.map((t) => {
                      const active = t === tab;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTab(t)}
                          className={`rounded-[10px] px-2 py-0.5 text-xs transition-colors ${
                            active
                              ? "border border-[rgba(82,82,91,0.32)] bg-[#27272a] font-semibold text-[#f4f4f5] shadow-[inset_0_2px_0_0_rgba(255,255,255,0.02)]"
                              : "font-normal text-[#f4f4f5]/80 hover:text-[#f4f4f5]"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border-2 border-[rgba(111,111,111,0.6)] bg-gradient-to-b from-[#161617] to-[#3c3c3c] px-2.5 py-3">
                  <div>
                    <p className="text-base leading-8 text-[#71717a]">{plan.cadence}</p>
                    <div className="flex items-end gap-1 font-semibold text-white">
                      <span className="text-[32px] leading-10">{plan.price}</span>
                      <span className="pb-1 text-sm">GBP</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {plan.columns.map((col, i) => (
                      <ul key={i} className="flex flex-1 flex-col gap-4">
                        {col.map((f) => (
                          <li key={f} className="flex items-start gap-1.5">
                            <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#079455]">
                              <Check />
                            </span>
                            <span className="text-xs leading-5 text-white">{f}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
              </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      </header>
    </>
  );
}
