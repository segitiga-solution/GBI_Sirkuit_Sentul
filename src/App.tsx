import { useState } from "react";
import {
  Church,
  Calendar,
  Users,
  BookOpen,
  Heart,
  Menu,
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  ArrowLeft,
  Cross,
  Baby,
  HandHeart,
  Waves,
  Handshake,
  Users2,
  PersonStanding,
  HandHelping,
} from "lucide-react";

import PastorProfile from "./pages/PastorProfile";
import PastoraSandraProfile from "./pages/PastoraSandraProfile";
import PelayananKedukaan from "./pages/PelayananKedukaan"; 
import PelayananPenyerahanAnak from './pages/PelayananPenyerahanAnak';
import PelayananDiakonia from "./pages/PelayananDiakonia";
import AboutSlideshow from "./pages/AboutSlideshow";
import PelayananBaptisanAir from "./pages/BaptisanAir";
import PelayananPemberkatanPernikahan from "./pages/PemberkatanPernikahan";
import PelayananKonseling from "./pages/Konseling";
import PelayananCommunityOfLove from "./pages/cool";
import PelayananDoa from "./pages/PelayananDoa";






export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const schedules = [
    { day: "Minggu", time: "09:00 WIB", service: "Ibadah Umum" },
    { day: "Minggu", time: "09:00 WIB", service: "Sekolah Minggu" },
  ];

  const ministries = [
    {
      icon: HandHelping,
      title: "Pelayanan Doa",
      description: "Pelayanan Doa hadir untuk menopang jemaat melalui doa syafaat, percaya bahwa kuasa Tuhan bekerja bagi setiap orang yang berseru kepada-Nya.",
      color: "bg-amber-50 text-amber-600",
      action: () => setCurrentPage("doa"),
    },
    {
      icon: Heart,
      title: "Pemberkatan Pernikahan",
      description: "Meneguhkan penyatuan dua insan di hadapan Tuhan agar membangun rumah tangga yang berlandaskan kasih dan firman-Nya.",
      color: "bg-rose-50 text-rose-600",
      action: () => setCurrentPage("pernikahan"),
    },
    {
      icon: Handshake,
      title: "Konseling",
      description:
        "Menolong setiap jemaat yang sedang menghadapi pergumulan hidup, agar menemukan kekuatan, penghiburan, dan arah melalui Firman Tuhan.",
      color: "bg-blue-50 text-blue-600",
      action: () => setCurrentPage("konseling"),
    },
    {
      icon: Users,
      title: "Community of Love",
      description: "Menjadi wadah persekutuan jemaat yang saling mengasihi, menguatkan, dan bertumbuh bersama dalam kasih Kristus.",
      color: "bg-green-50 text-green-600",
      action: () => setCurrentPage("community"),
    },
    {
      icon: Cross,
      title: "Pelayanan Kedukaan",
      description:
        "Mendampingi keluarga berduka dalam doa, pengurusan administrasi, dan perizinan pemakaman dengan kasih Kristus.",
      color: "bg-gray-50 text-gray-700",
      action: () => setCurrentPage("duka"),
    },
    {
      icon: Baby,
      title: "Pelayanan Penyerahan Anak",
      description:
        "Mendoakan dan menyerahkan anak-anak kepada Tuhan agar hidup mereka senantiasa dalam kasih dan penyertaan-Nya sejak dini.",
      color: "bg-pink-50 text-pink-600",
      action: () => setCurrentPage("penyerahan"),
    },
    {
      icon: HandHeart,
      title: "Pelayanan Diakonia",
      description:
      "Menyalurkan kasih Kristus melalui bantuan sosial, kunjungan, dan dukungan bagi jemaat maupun masyarakat yang membutuhkan.",
      color: "bg-purple-50 text-purple-600",
      action: () => setCurrentPage("diakonia"),
    },
    {
       icon: Waves,
       title: "Pelayanan Baptisan Air",
       description:
       "Membawa setiap orang percaya masuk dalam hidup baru di dalam Kristus melalui baptisan air.",
       color: "bg-blue-50 text-blue-600",
       action: () => setCurrentPage("baptisan"),
    },

  ];

  // -------------------------
  // FORM SUBMIT HANDLER
  // -------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nama = (form.querySelector('input[name="nama"]') as HTMLInputElement)
      .value;
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)
      .value;
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
  // RENDER PAGES
  // -------------------------
  if (currentPage === "pastor")
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-white">
        <button
          onClick={() => setCurrentPage("home")}
          className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <PastorProfile />
      </div>
    );

  if (currentPage === "pastora")
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-white">
        <button
          onClick={() => setCurrentPage("home")}
          className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-rose-600 to-rose-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <PastoraSandraProfile />
      </div>
    );

  if (currentPage === "duka")
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-white">
        <button
          onClick={() => setCurrentPage("home")}
          className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-gray-700 to-blue-600 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <PelayananKedukaan />
      </div>
    );

    if (currentPage === "penyerahan")
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <button
        onClick={() => setCurrentPage("home")}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-pink-600 to-pink-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <PelayananPenyerahanAnak />
    </div>
  );

  if (currentPage === "diakonia")
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <button
        onClick={() => setCurrentPage("home")}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-purple-700 to-purple-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <PelayananDiakonia />
    </div>
  );

  if (currentPage === "baptisan")
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <button
        onClick={() => setCurrentPage("home")}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <PelayananBaptisanAir />
    </div>
  );
  
  if (currentPage === "pernikahan")
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <button
        onClick={() => setCurrentPage("home")}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-rose-600 to-pink-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <PelayananPemberkatanPernikahan />
    </div>
  );

    if (currentPage === "konseling")
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <button
        onClick={() => setCurrentPage("home")}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <PelayananKonseling />
    </div>
  );

  if (currentPage === "community")
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <button
        onClick={() => setCurrentPage("home")}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-red-600 to-pink-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <PelayananCommunityOfLove />
    </div>
  );

  if (currentPage === "doa")
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <button
        onClick={() => setCurrentPage("home")}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-gradient-to-br from-indigo-700 to-indigo-500 text-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <PelayananDoa />
    </div>
  );



  // -------------------------
  // MAIN PAGE
  // -------------------------
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* ======= NAVBAR ======= */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* LOGO */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl shadow-lg bg-white border border-amber-100 overflow-hidden">
                <img
                  src="/logo-gbi.png"
                  alt="Logo GBI"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  GBI Sirkuit Sentul
                </h1>
                <p className="text-xs text-gray-600">
                  Gereja Bethel Indonesia
                </p>
              </div>
            </div>

            {/* DESKTOP MENU */}
<div className="hidden md:flex space-x-8 font-medium">
  <a href="#home" className="hover:text-amber-600">
    Beranda
  </a>
  <a href="#about" className="hover:text-amber-600">
    Tentang
  </a>
  <a href="#schedule" className="hover:text-amber-600">
    Jadwal
  </a>
  <a href="#ministries" className="hover:text-amber-600">
    Pelayanan
  </a>
  <a href="#contact" className="hover:text-amber-600">
    Kontak
  </a>
</div>

{/* MOBILE MENU BUTTON */}
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
>
  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>
</div>
</div>

{/* === MOBILE MENU === */}
{isMenuOpen && (
  <div
    className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-lg z-[9999]"
  >
    <div className="px-6 py-4 space-y-3">
      {["Beranda", "Tentang", "Jadwal", "Pelayanan", "Kontak"].map((item) => (
  <button
    key={item}
    onClick={() => {
      setIsMenuOpen(false);
      const sectionId = item.toLowerCase();

      if (sectionId === "beranda") {
        // Scroll ke atas dengan smooth
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        const offset = el.offsetTop - 80; // biar ga ketutup navbar
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }}
    className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 font-medium"
  >
    {item}
  </button>
))}

    </div>
  </div>
)}
</nav>


      {/* ======= HOME ======= */}
      <section
        id="home"
        className="pt-24 relative bg-gradient-to-br from-amber-50 via-white to-blue-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-center px-4 py-32">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            GBI Sirkuit
            <span className="block bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Sentul
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-6 leading-relaxed max-w-3xl mx-auto">
            “Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.” <br />
            <span className="text-gray-500 text-lg">Yeremia 29:11</span>
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#schedule"
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              Lihat Jadwal Ibadah
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-lg border border-gray-200 hover:scale-105 transition-all"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* ======= ABOUT ======= */}
    <section id="about" className="py-24 bg-white">
       <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tentang Kami
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
         GBI Sirkuit Sentul adalah gereja yang berkomitmen untuk membangun umat
         Tuhan melalui pengajaran Firman yang benar, persekutuan yang hangat,
         dan pelayanan yang penuh kasih.
        </p>

      {/* Grid dua kolom */}
        <div className="grid md:grid-cols-2 gap-12 items-center text-left">
      {/* === Slideshow Foto Gereja === */}
      <AboutSlideshow />

      {/* === Info Gembala Sidang === */}
      <div className="mt-12 text-center">
        <h4 className="font-bold text-gray-900 mb-6 text-2xl">
          Gembala Sidang
        </h4>

        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          <button
            onClick={() => setCurrentPage("pastor")}
            className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-amber-200 hover:border-amber-500 transition-all group p-6"
          >
            <p className="text-gray-900 font-bold text-lg group-hover:text-amber-600 transition-colors">
              Pdt. Sandy Suharsa
            </p>
            <p className="text-sm text-gray-600 group-hover:text-amber-600 transition-colors mt-1">
              Klik untuk melihat profil →
            </p>
          </button>

          <button
            onClick={() => setCurrentPage("pastora")}
            className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-rose-200 hover:border-rose-500 transition-all group p-6"
          >
            <p className="text-gray-900 font-bold text-lg group-hover:text-rose-600 transition-colors">
              Pdt. Sandra Suharsa
            </p>
            <p className="text-sm text-gray-600 group-hover:text-rose-600 transition-colors mt-1">
              Klik untuk melihat profil →
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ======= JADWAL ======= */}
      <section
        id="schedule"
        className="py-24 bg-gradient-to-br from-amber-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Jadwal Ibadah
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {schedules.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {s.service}
                </h3>
                <p className="text-gray-700 text-lg flex justify-center items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" /> {s.day}
                </p>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {s.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PELAYANAN ======= */}
      <section id="ministries" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Pelayanan Kami
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministries.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={i}
                  onClick={m.action}
                  className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 cursor-pointer`}
                >
                  <div
                    className={`${m.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {m.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======= KONTAK ======= */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Informasi */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Hubungi Kami</h2>
            <p className="text-gray-300 mb-8">
              Kami senang mendengar dari Anda. Silakan kirim pesan atau
              kunjungi kami di lokasi gereja.
            </p>

            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-amber-400 mt-1" />
                <p>
                  New Green Sentul Resort (Bonjour) - Gardenia Hall <br />
                  Jl. Raya Golf Palm Hill, Desa Tangkil Sentul, Citeureup, Bogor
                </p>
              </div>
              <div className="flex items-start gap-4">
  <Phone className="h-6 w-6 text-amber-400 mt-1" />
  <a
    href="https://wa.me/6285772065763"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-amber-400 transition-colors"
  >
    +62 8577 2065 763
  </a>
</div>

              <div className="flex items-start gap-4">
  <Mail className="h-6 w-6 text-amber-400 mt-1" />
  <a
    href="mailto:gbissn30@gmail.com"
    className="hover:text-amber-400 transition-colors"
  >
    gbissn30@gmail.com
  </a>
</div>

                <div className="flex items-start gap-4">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6 text-amber-400 mt-1"
             >
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             d="M7.5 3h9a4.5 4.5 0 0 1 4.5 4.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm9.75 3.75h.008v.008h-.008V6.75zM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5z"
            />
            </svg>
              <a
               href="https://www.instagram.com/gbi_sirkuitsentul"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-amber-400 transition-colors"
              >
              @gbi_sirkuitsentul
              </a>
            </div>

            </div>
           </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <input
                  name="nama"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <textarea
                  name="pesan"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="bg-gray-950 text-gray-400 py-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-white rounded-lg overflow-hidden border border-amber-100">
              <img
                src="/logo-gbi.png"
                alt="Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <p className="font-bold text-white">GBI Sirkuit Sentul</p>
              <p className="text-sm">Gereja Bethel Indonesia</p>
            </div>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} GBI Sirkuit Sentul. Semua hak
            dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
