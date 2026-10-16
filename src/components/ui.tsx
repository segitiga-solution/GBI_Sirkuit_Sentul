import { useEffect, useRef, useState, type ReactNode } from "react";

/* ============================================================
   Reveal — animasi fade-in saat elemen masuk viewport
============================================================ */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================
   SectionHeading — judul seksi modern dengan eyebrow & garis
============================================================ */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="text-center mb-14">
      <span
        className={`inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border ${
          light
            ? "text-amber-300 border-amber-400/30 bg-amber-400/10"
            : "text-amber-700 border-amber-200 bg-amber-50"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-5 text-4xl md:text-5xl font-extrabold tracking-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-amber-300" />
      {subtitle && (
        <p
          className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ============================================================
   PageShell — wrapper halaman detail pelayanan yang konsisten
============================================================ */
export function PageShell({
  gradient,
  onBack,
  children,
}: {
  gradient: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white animate-fadeIn">
      <button
        onClick={onBack}
        aria-label="Kembali"
        className={`fixed top-5 left-5 z-10 flex items-center gap-2 bg-gradient-to-br ${gradient} text-white shadow-premium hover:shadow-glow rounded-full px-4 py-3 hover:-translate-x-1 transition-all`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span className="hidden sm:inline text-sm font-semibold">Kembali</span>
      </button>
      {children}
    </div>
  );
}
