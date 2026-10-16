import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const flyers = [
  "/flyer-pengkhotbah.jpeg",
  "/flyer-pengkhotbah3.jpeg",
  "/flyer-pengkhotbah4.jpeg",
  "/flyer-pengkhotbah5.jpeg",
  "/flyer-pengkhotbah6.jpeg",
  "/flyer-pengkhotbah7.png",
  "/flyer-pengkhotbah8.jpeg",
  "/flyer-pengkhotbah9.jpeg",
  "/flyer-pengkhotbah10.jpeg",
  "/flyer-pengkhotbah11.jpeg",
  "/flyer-pengkhotbah12.jpeg",
  "/flyer-pengkhotbah13.jpeg",
];

export default function FlyerCarousel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = (next: number) => {
    setFade(false);
    setTimeout(() => {
      setIndex(((next % flyers.length) + flyers.length) % flyers.length);
      setFade(true);
    }, 200);
  };

  // Auto slide setiap 7 detik
  useEffect(() => {
    const auto = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % flyers.length);
        setFade(true);
      }, 200);
    }, 7000);
    return () => clearInterval(auto);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* FRAME PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl shadow-premium bg-gradient-to-br from-amber-50 to-white border border-amber-200/70 w-full max-w-xl mx-auto group">
        <img
          key={index}
          src={flyers[index]}
          alt={`Flyer Pengkhotbah ${index + 1}`}
          className={`w-full object-contain p-4 md:p-6 transition-all duration-500 ${
            fade ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
          }`}
        />

        {/* CONTROLS */}
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Sebelumnya"
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/85 hover:bg-white text-slate-700 w-11 h-11 rounded-full shadow-lg flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Berikutnya"
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/85 hover:bg-white text-slate-700 w-11 h-11 rounded-full shadow-lg flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* COUNTER */}
        <span className="absolute top-4 right-4 text-xs font-semibold text-amber-700 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-amber-200">
          {index + 1} / {flyers.length}
        </span>
      </div>

      {/* INDICATORS */}
      <div className="flex flex-wrap justify-center mt-5 gap-2 max-w-xl mx-auto">
        {flyers.map((_, i) => (
          <button
            key={i}
            aria-label={`Flyer ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === index
                ? "bg-amber-600 w-8"
                : "bg-gray-300 hover:bg-gray-400 w-2.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
