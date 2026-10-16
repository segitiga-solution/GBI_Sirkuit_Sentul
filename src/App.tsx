import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Heart,
  Menu,
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Cross,
  Baby,
  HandHeart,
  Waves,
  Handshake,
  UserRound,
  HandHelping,
  PlayCircle,
  Instagram,
  MessageCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import PastorProfile from "./pages/PastorProfile";
import PastoraSandraProfile from "./pages/PastoraSandraProfile";
import PelayananKedukaan from "./pages/PelayananKedukaan";
import PelayananPenyerahanAnak from "./pages/PelayananPenyerahanAnak";
import PelayananDiakonia from "./pages/PelayananDiakonia";
import AboutSlideshow from "./pages/AboutSlideshow";
import PelayananBaptisanAir from "./pages/BaptisanAir";
import PelayananPemberkatanPernikahan from "./pages/PemberkatanPernikahan";
import PelayananKonseling from "./pages/Konseling";
import PelayananCommunityOfLove from "./pages/cool";
import PelayananDoa from "./pages/PelayananDoa";
import FlyerCarousel from "./components/FlyerCarousel";
import { Reveal, SectionHeading, PageShell } from "./components/ui";

import { useActiveSection } from "./hooks/useActiveSection";

/* ===============================
   DATA
================================ */
const schedules = [
  {
    day: "Minggu",
    time: "09:00 WIB",
    service: "Ibadah Umum",
    note: "Ibadah raya seluruh jemaat setiap Minggu pagi",
  },
  {
    day: "Minggu",
    time: "09:00 WIB",
    service: "Sekolah Minggu",
    note: "Pembinaan iman anak-anak sejak usia dini",
  },
];

const churchVideos = [
  {
    title: "Pdm. Sandra Suharsa | Warisan",
    date: "14 Mei 2026",
    category: "Khotbah",
    youtubeId: "OJg8ZRBc5bA",
  },
  {
    title: "Ev. Rudi Hidayat | Rooted",
    date: "10 Mei 2026",
    category: "Khotbah",
    youtubeId: "Sd0DIxIzZwY",
  },
  {
    title: "Pdt. Abed Purnomo | Membangkitkan Iman",
    date: "3 Mei 2026",
    category: "Khotbah",
    youtubeId: "xuJhHSXwhgw",
  },
  {
    title: "EV. Hendri J Pandiangan | Kematian dan Kebangkitan Tuhan Yesus Kristus",
    date: "26 April 2026",
    category: "Khotbah",
    youtubeId: "dN8X_K8USaQ",
  },
  {
    title: "Pdt. Matius Ginting | Mujizat Paskah",
    date: "19 April 2026",
    category: "Khotbah",
    youtubeId: "rDoPFxlCGHA",
  },
  {
    title: "Pdt. Ivonne Ahimsa | Perlindungan Gembala",
    date: "12 April 2026",
    category: "Khotbah",
    youtubeId: "Dd1Iz-Jze7k",
  },
  {
    title: "The Year of The Great Commission | Khotbah EV Hokke Andrian J",
    date: "29 Maret 2026",
    category: "Khotbah",
    youtubeId: "qeiI9XhJrVs",
  },
  {
    title: "Refleksi | Khotbah Firman Tuhan - Pdm. Sandy Suharsa",
    date: "1 Maret 2026",
    category: "Khotbah",
    youtubeId: "oQWY7JixHls",
  },
];

const ministries = [
  {
    icon: HandHelping,
    title: "Pelayanan Doa",
    description:
      "Pelayanan Doa hadir untuk menopang jemaat melalui doa syafaat, percaya bahwa kuasa Tuhan bekerja bagi setiap orang yang berseru kepada-Nya.",
    color: "bg-amber-50 text-amber-600",
    ring: "group-hover:border-amber-400 group-hover:shadow-amber-100",
    action: () => setCurrentPageStatic("doa"),
  },
  {
    icon: Heart,
    title: "Pemberkatan Pernikahan",
    description:
      "Meneguhkan penyatuan dua insan di hadapan Tuhan agar membangun rumah tangga yang berlandaskan kasih dan firman-Nya.",
    color: "bg-rose-50 text-rose-600",
    ring: "group-hover:border-rose-400 group-hover:shadow-rose-100",
    action: () => setCurrentPageStatic("pernikahan"),
  },
  {
    icon: Handshake,
    title: "Konseling",
    description:
      "Menolong setiap jemaat yang sedang menghadapi pergumulan hidup, agar menemukan kekuatan, penghiburan, dan arah melalui Firman Tuhan.",
    color: "bg-blue-50 text-blue-600",
    ring: "group-hover:border-blue-400 group-hover:shadow-blue-100",
    action: () => setCurrentPageStatic("konseling"),
  },
  {
    icon: Users,
    title: "Community of Love",
    description:
      "Menjadi wadah persekutuan jemaat yang saling mengasihi, menguatkan, dan bertumbuh bersama dalam kasih Kristus.",
    color: "bg-green-50 text-green-600",
    ring: "group-hover:border-green-400 group-hover:shadow-green-100",
    action: () => setCurrentPageStatic("community"),
  },
  {
    icon: Cross,
    title: "Pelayanan Kedukaan",
    description:
      "Mendampingi keluarga berduka dalam doa, pengurusan administrasi, dan perizinan pemakaman dengan kasih Kristus.",
    color: "bg-gray-100 text-gray-700",
    ring: "group-hover:border-gray-400 group-hover:shadow-gray-100",
    action: () => setCurrentPageStatic("duka"),
  },
  {
    icon: Baby,
    title: "Pelayanan Penyerahan Anak",
    description:
      "Mendoakan dan menyerahkan anak-anak kepada Tuhan agar hidup mereka senantiasa dalam kasih dan penyertaan-Nya sejak dini.",
    color: "bg-pink-50 text-pink-600",
    ring: "group-hover:border-pink-400 group-hover:shadow-pink-100",
    action: () => setCurrentPageStatic("penyerahan"),
  },
  {
    icon: HandHeart,
    title: "Pelayanan Diakonia",
    description:
      "Menyalurkan kasih Kristus melalui bantuan sosial, kunjungan, dan dukungan bagi jemaat maupun masyarakat yang membutuhkan.",
    color: "bg-purple-50 text-purple-600",
    ring: "group-hover:border-purple-400 group-hover:shadow-purple-100",
    action: () => setCurrentPageStatic("diakonia"),
  },
  {
    icon: Waves,
    title: "Pelayanan Baptisan Air",
    description:
      "Membawa setiap orang percaya masuk dalam hidup baru di dalam Kristus melalui baptisan air.",
    color: "bg-sky-50 text-sky-600",
    ring: "group-hover:border-sky-400 group-hover:shadow-sky-100",
    action: () => setCurrentPageStatic("baptisan"),
  },
];

// Jembatan sederhana agar data ministries bisa memanggil setter state App
let setCurrentPageStatic: (page: string) => void = () => {};

/* ===============================
   VIDEO CARD (lazy iframe)
================================ */
function VideoCard({ video }: { video: (typeof churchVideos)[number] }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="group bg-white rounded-3xl shadow-soft hover:shadow-premium transition-all duration-300 border border-slate-100 overflow-hidden h-full flex flex-col">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlay(true)}
            className="absolute inset-0 w-full h-full block focus:outline-none"
            aria-label={`Putar video ${video.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white/90 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
          </button>
        )}
      </div>

      <div className="p-6 text-left flex flex-col flex-1">
        <span className="inline-flex w-fit items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          <Sparkles className="h-3 w-3" /> {video.category}
        </span>
        <h3 className="text-lg font-bold text-slate-900 mt-3 leading-snug">
          {video.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">{video.date}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-4 inline-flex items-center gap-1.5 text-amber-600 font-semibold hover:gap-3 transition-all"
        >
          Tonton di YouTube <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

/* ===============================
   APP
================================ */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  // hubungkan helper statis dengan state ini
  setCurrentPageStatic = setCurrentPage;

  // efek shadow navbar saat scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- listener untuk handle hash navigation (dari halaman profil dll) ---
  useEffect(() => {
    const scrollToSection = (hash: string) => {
      const id = hash.startsWith("#") ? hash.slice(1) : hash;
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      setCurrentPage("home");
      setTimeout(() => scrollToSection(hash), 150);
    };

    if (window.location.hash && !sessionStorage.getItem("hashHandled")) {
      sessionStorage.setItem("hashHandled", "true");
      handleHash();
    }

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeSection = useActiveSection([
    "home",
    "about",
    "messages",
    "schedule",
    "ministries",
    "contact",
  ]);

  const navLinks = [
    { id: "home", label: "Beranda" },
    { id: "about", label: "Tentang" },
    { id: "messages", label: "Khotbah" },
    { id: "schedule", label: "Jadwal" },
    { id: "ministries", label: "Pelayanan" },
    { id: "contact", label: "Kontak" },
  ];

  const goto = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // -------------------------
  // FORM SUBMIT HANDLER
  // -------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nama = (
      form.querySelector('input[name="nama"]') as HTMLInputElement
    ).value;
    const email = (
      form.querySelector('input[name="email"]') as HTMLInputElement
    ).value;
    const pesan = (
      form.querySelector('textarea[name="pesan"]') as HTMLTextAreaElement
    ).value;

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzYyyRAzRv2UckfSlhHvl7Bed9k77VKd5uFZtNSmd-WMg1c48bJrYkTzr9gr5D0otFu/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nama, email, pesan }),
        }
      );

      alert("✅ Pesan berhasil dikirim! Terima kasih atas partisipasi Anda 🙏");
      form.reset();
    } catch (err) {
      alert("❌ Gagal mengirim pesan. Silakan coba lagi.");
      console.error(err);
    }
  };

  // -------------------------
  // RENDER SUB-PAGES
  // -------------------------
  const subPages: Record<
    string,
    { gradient: string; element: React.ReactNode }
  > = {
    pastor: { gradient: "from-amber-600 to-amber-500", element: <PastorProfile /> },
    pastora: { gradient: "from-rose-600 to-rose-500", element: <PastoraSandraProfile /> },
    duka: { gradient: "from-gray-700 to-slate-600", element: <PelayananKedukaan /> },
    penyerahan: { gradient: "from-pink-600 to-pink-500", element: <PelayananPenyerahanAnak /> },
    diakonia: { gradient: "from-purple-700 to-purple-500", element: <PelayananDiakonia /> },
    baptisan: { gradient: "from-blue-700 to-blue-500", element: <PelayananBaptisanAir /> },
    pernikahan: { gradient: "from-rose-600 to-pink-500", element: <PelayananPemberkatanPernikahan /> },
    konseling: { gradient: "from-blue-600 to-indigo-500", element: <PelayananKonseling /> },
    community: { gradient: "from-red-600 to-pink-500", element: <PelayananCommunityOfLove /> },
    doa: { gradient: "from-indigo-700 to-indigo-500", element: <PelayananDoa /> },
  };

  if (subPages[currentPage]) {
    const p = subPages[currentPage];
    return (
      <PageShell
        gradient={p.gradient}
        onBack={() => setCurrentPage("home")}
      >
        {p.element}
      </PageShell>
    );
  }

  // -------------------------
  // MAIN PAGE
  // -------------------------
  return (
    <div className="min-h-screen bg-white scroll-smooth font-sans text-slate-900 antialiased">
      {/* ======= NAVBAR ======= */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-soft"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* LOGO */}
            <button
              onClick={() => goto("home")}
              className="flex items-center space-x-3 group text-left"
            >
              <div className="w-12 h-12 rounded-2xl shadow-md bg-white border border-amber-100 overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/logo-gbi.png"
                  alt="Logo GBI"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
                  GBI Sirkuit Sentul
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Gereja Bethel Indonesia
                </p>
              </div>
            </button>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-1 font-medium">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goto(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-amber-700"
                      : "text-slate-600 hover:text-amber-600"
                  }`}
                >
                  {activeSection === item.id && (
                    <span className="absolute inset-0 bg-amber-100/70 rounded-full -z-10" />
                  )}
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/6285772065763"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-semibold shadow-md hover:shadow-glow hover:scale-105 transition-all"
              >
                <MessageCircle className="h-4 w-4" /> Hubungi Kami
              </a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* === MOBILE MENU === */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-xl border-t border-slate-100 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => goto(item.id)}
                className={`block w-full text-left py-2.5 font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "text-amber-600 font-semibold"
                    : "text-slate-700 hover:text-amber-600"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/6285772065763"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-3 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold shadow-md"
            >
              <MessageCircle className="h-4 w-4" /> Hubungi Kami
            </a>
          </div>
        </div>
      </nav>

      {/* ======= HERO ======= */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24 pb-20 bg-slate-950 overflow-hidden"
      >
        {/* Background foto gereja + overlay */}
        <img
          src="/gereja1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 animate-[fadeIn_2s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-float [animation-delay:1.5s]" />

        <div className="relative max-w-7xl mx-auto text-center px-4">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-amber-300 bg-white/10 border border-white/15 backdrop-blur px-5 py-2 rounded-full">
              <Cross className="h-4 w-4" /> Selamat Datang · Welcome Home
            </span>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              GBI{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                Sirkuit Sentul
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-8 text-base md:text-xl text-slate-200/90 leading-relaxed max-w-3xl mx-auto italic">
              “Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku
              mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai
              sejahtera dan bukan rancangan kecelakaan, untuk memberikan
              kepadamu hari depan yang penuh harapan.”
            </p>
            <p className="mt-4 text-sm md:text-base font-semibold tracking-widest uppercase text-amber-300">
              — Yeremia 29:11
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => goto("schedule")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold rounded-2xl shadow-glow hover:scale-105 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" /> Lihat Jadwal Ibadah
              </button>
              <button
                onClick={() => goto("contact")}
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/25 backdrop-blur hover:bg-white/20 hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" /> Hubungi Kami
              </button>
            </div>
          </Reveal>

          {/* Scroll hint */}
          <div className="mt-20 hidden md:flex justify-center">
            <button
              onClick={() => goto("about")}
              aria-label="Gulir ke bawah"
              className="animate-bounce text-white/50 hover:text-amber-300 transition-colors"
            >
              <ChevronRight className="h-8 w-8 rotate-90" />
            </button>
          </div>
        </div>
      </section>

      {/* ======= ABOUT ======= */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            eyebrow="Tentang Kami"
            title={
              <>
                Satu Keluarga,{" "}
                <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
                  Satu Tujuan
                </span>
              </>
            }
            subtitle="GBI Sirkuit Sentul adalah gereja yang berkomitmen untuk membangun umat Tuhan melalui pengajaran Firman yang benar, persekutuan yang hangat, dan pelayanan yang penuh kasih."
          />

          {/* Grid dua kolom */}
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            {/* === Slideshow Foto Gereja === */}
            <Reveal>
              <AboutSlideshow />
            </Reveal>

            {/* === Info Gembala Sidang === */}
            <Reveal delay={150}>
              <div className="text-center md:text-left">
                <h4 className="font-extrabold text-slate-900 mb-2 text-2xl tracking-tight">
                  Gembala Sidang
                </h4>
                <p className="text-slate-500 mb-8">
                  Kenali lebih dekat para hamba Tuhan yang melayani di tengah
                  keluarga besar GBI Sirkuit Sentul.
                </p>

                <div className="flex flex-col space-y-5">
                  <button
                    onClick={() => setCurrentPage("pastor")}
                    className="w-full max-w-md bg-gradient-to-br from-white to-amber-50/60 rounded-2xl shadow-soft hover:shadow-premium border border-amber-200/70 hover:border-amber-500 transition-all group p-6 flex items-center gap-5 text-left"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <UserRound className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-bold text-lg group-hover:text-amber-600 transition-colors">
                        Pdt. Sandy Suharsa
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 inline-flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                        Lihat profil lengkap <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentPage("pastora")}
                    className="w-full max-w-md bg-gradient-to-br from-white to-rose-50/60 rounded-2xl shadow-soft hover:shadow-premium border border-rose-200/70 hover:border-rose-500 transition-all group p-6 flex items-center gap-5 text-left"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <UserRound className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-bold text-lg group-hover:text-rose-600 transition-colors">
                        Pdt. Sandra Suharsa
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 inline-flex items-center gap-1 group-hover:text-rose-600 transition-colors">
                        Lihat profil lengkap <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ======= KEGIATAN & KHOTBAH (YOUTUBE) ======= */}
      <section
        id="messages"
        className="py-24 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            eyebrow="Renungan"
            title="Kegiatan & Khotbah"
            subtitle="Saksikan kembali rekaman khotbah dan kegiatan jemaat. Iman tumbuh melalui pendengaran akan Firman Tuhan."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {churchVideos.map((video, i) => (
              <Reveal key={i} delay={(i % 3) * 120}>
                <VideoCard video={video} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======= JADWAL ======= */}
      <section
        id="schedule"
        className="py-24 bg-gradient-to-br from-amber-50 via-white to-blue-50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <SectionHeading
            eyebrow="Waktu Ibadah"
            title="Jadwal Ibadah"
            subtitle="Mari bersama-sama menaikkan ibadah kepada Tuhan tepat waktu dan dengan hati yang siap."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {schedules.map((s, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="bg-white rounded-3xl p-10 shadow-soft hover:shadow-premium transition-all border border-amber-100/80 hover:-translate-y-1.5 text-center h-full">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-200">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                    {s.service}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">{s.note}</p>
                  <p className="text-slate-700 text-lg flex justify-center items-center gap-2 font-medium">
                    <Clock className="h-5 w-5 text-amber-600" /> {s.day}
                  </p>
                  <p className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mt-3">
                    {s.time}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======= FLYER PENGKHOTBAH ======= */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            eyebrow="Agenda"
            title="Pengkhotbah Minggu Ini"
            subtitle="Simak informasi terbaru seputar jadwal dan pengkhotbah minggu ini."
          />
          <Reveal>
            <FlyerCarousel />
          </Reveal>
        </div>
      </section>

      {/* ======= FLIPBOOK ANYFLIP ======= */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            eyebrow="Bahan Renungan"
            title="Renungan Komunitas Profesional"
            subtitle="Renungan khusus untuk komunitas profesional yang memuridkan — baca langsung di sini."
          />
          <Reveal>
            <div className="relative w-full overflow-hidden rounded-3xl shadow-premium border border-slate-200 bg-white">
              <div className="relative w-full" style={{ paddingTop: "64%" }}>
                <iframe
                  src="https://anyflip.com/foen/qcyv"
                  title="Renungan khusus komunitas profesional yang memuridkan"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======= PELAYANAN ======= */}
      <section id="ministries" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            eyebrow="Melayani"
            title={
              <>
                Pelayanan{" "}
                <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
                  Kami
                </span>
              </>
            }
            subtitle="Delapan wujud kasih yang kami jalankan untuk menumbuhkan iman dan memberkati sesama. Klik salah satu pelayanan untuk info lengkap."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={i} delay={(i % 4) * 100}>
                  <div
                    onClick={m.action}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && m.action()}
                    className={`group h-full bg-white rounded-3xl p-8 shadow-soft hover:shadow-premium transition-all duration-300 border border-slate-100 ${m.ring} cursor-pointer hover:-translate-y-1.5`}
                  >
                    <div
                      className={`${m.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {m.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {m.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Selengkapnya <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======= CTA STRIP ======= */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="/gereja3.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-amber-950/60" />
        <Reveal className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Ada tempat untukmu di meja Tuhan.
          </h2>
          <p className="mt-5 text-lg text-slate-200 max-w-2xl mx-auto">
            Entah kamu sedang bersyukur atau bergumul — keluarga besar GBI
            Sirkuit Sentul siap berjalan bersama engkau.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6285772065763"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold shadow-glow hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" /> Chat WhatsApp
            </a>
            <button
              onClick={() => goto("ministries")}
              className="px-8 py-4 rounded-2xl bg-white/10 border border-white/25 text-white font-semibold backdrop-blur hover:bg-white/20 transition-all"
            >
              Jelajahi Pelayanan
            </button>
          </div>
        </Reveal>
      </section>

      {/* ======= KONTAK ======= */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Informasi */}
          <div>
            <Reveal>
              <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-amber-300 border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 rounded-full">
                Kontak
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight">
                Hubungi Kami
              </h2>
              <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-amber-300" />
              <p className="text-slate-300 mt-6 mb-10 text-lg leading-relaxed">
                Kami senang mendengar dari Anda. Silakan kirim pesan atau
                kunjungi kami di lokasi gereja.
              </p>
            </Reveal>

            <div className="space-y-5">
              <Reveal delay={100}>
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <MapPin className="h-6 w-6 text-amber-400 mt-1 shrink-0" />
                  <a
                    href="https://maps.app.goo.gl/v4FnscQaFudAk7JdA?g_st=iw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-amber-400 transition-colors leading-relaxed"
                  >
                    New Green Sentul Resort (Bonjour) – Gardenia Hall
                    <br />
                    <span className="text-slate-400">
                      Jl. Raya Golf Palm Hill, Desa Tangkil Sentul, Citeureup,
                      Bogor
                    </span>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <Phone className="h-6 w-6 text-amber-400 mt-1 shrink-0" />
                  <a
                    href="https://wa.me/6285772065763"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors"
                  >
                    +62 8577 2065 763
                  </a>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <Mail className="h-6 w-6 text-amber-400 mt-1 shrink-0" />
                  <a
                    href="mailto:gbissn30@gmail.com"
                    className="hover:text-amber-400 transition-colors"
                  >
                    gbissn30@gmail.com
                  </a>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <Instagram className="h-6 w-6 text-amber-400 mt-1 shrink-0" />
                  <a
                    href="https://www.instagram.com/gbi_sirkuitsentul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors"
                  >
                    @gbi_sirkuitsentul
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={150}>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/15 shadow-premium">
              <h3 className="text-2xl font-bold mb-2">Kirim Pesan</h3>
              <p className="text-slate-300 text-sm mb-8">
                Doa, pertanyaan, atau permintaan pelayanan — tulis di sini.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-200">
                    Nama Lengkap
                  </label>
                  <input
                    name="nama"
                    type="text"
                    required
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-white placeholder-slate-400"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-200">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-white placeholder-slate-400"
                    placeholder="email@contoh.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-200">
                    Pesan
                  </label>
                  <textarea
                    name="pesan"
                    rows={4}
                    required
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-white placeholder-slate-400 resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold py-4 rounded-2xl hover:scale-[1.02] shadow-glow transition-all inline-flex items-center justify-center gap-2"
                >
                  <Mail className="h-5 w-5" /> Kirim Pesan
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-white rounded-xl overflow-hidden border border-amber-100 shadow-md">
              <img
                src="/logo-gbi.png"
                alt="Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <p className="font-bold text-white">GBI Sirkuit Sentul</p>
              <p className="text-xs text-slate-500">
                Gereja Bethel Indonesia
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => goto(item.id)}
                className="hover:text-amber-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GBI Sirkuit Sentul. Semua hak
            dilindungi.
          </p>
        </div>
      </footer>

      {/* ======= FLOATING WHATSAPP ======= */}
      <a
        href="https://wa.me/6285772065763"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-premium hover:scale-110 transition-transform animate-float"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
