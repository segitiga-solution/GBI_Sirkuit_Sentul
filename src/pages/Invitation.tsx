import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";



/* ================= INFO CARD COMPONENT ================= */
function InfoCard({
  icon,
  title,
  desc,
  delay,
  link,
}: {
  icon: JSX.Element;
  title: string;
  desc: string;
  delay: number;
  link?: string;
}) {
  const Wrapper: any = link ? "a" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Wrapper
        href={link}
        target={link ? "_blank" : undefined}
        rel={link ? "noopener noreferrer" : undefined}
        className={`block bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100 
        transition-all ${
          link ? "cursor-pointer hover:-translate-y-2 hover:shadow-2xl" : ""
        }`}
      >
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600">{desc}</p>
        {link && (
          <p className="mt-3 text-sm text-amber-600 font-medium">
            Lihat di Google Maps →
          </p>
        )}
      </Wrapper>
    </motion.div>
  );
}

/* ================= MAIN PAGE ================= */

/* ================= SNOWFALL ================= */

function Snowfall() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {[...Array(40)].map((_, i) => (
        <span
          key={i}
          className="absolute top-[-10px] text-white opacity-80 animate-snow"
          style={{
            left: Math.random() * 100 + "%",
            fontSize: Math.random() * 10 + 10 + "px",
            animationDelay: Math.random() * 10 + "s",
            animationDuration: Math.random() * 10 + 10 + "s",
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}

export default function InvitationPage() {
  const [loading, setLoading] = useState(false);

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const nama = (form.nama as HTMLInputElement).value;
    const jumlah = (form.jumlah as HTMLInputElement).value;

    await fetch("https://script.google.com/macros/s/AKfycbzRig8LrmNwh_GeUuMFAx-A8uPt2NNmf8a_ZGJgctSK6UBflnybxhb8zafjlGrzTDbxtw/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, jumlah }),
    });

    alert("🙏 Terima kasih, RSVP Anda sudah tercatat");
    form.reset();
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-gray-800"
      style={{ backgroundImage: "url('/invitation-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Snow */}
      <Snowfall />

      {/* Content */}
      <div className="relative z-10">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-28 px-4 text-white"
        >
          <p className="uppercase tracking-widest text-amber-300 font-semibold mb-4">
            You are Invited to
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            GBI Sirkuit Sentul
            <span className="block text-amber-400">Christmas Celebration</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            "Bersyukurlah kepada TUHAN, sebab la baik! Bahwasanya untuk selama-lamanya kasih setia-Nya - 1 Tawarikh 16:34."
          </p>
        </motion.section>

        {/* INFO CARD */}
        <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4">
          <InfoCard
            icon={<Calendar />}
            title="Hari / Tanggal"
            desc="Minggu, 21 Desember 2025"
            delay={0}
          />
          <InfoCard
            icon={<Clock />}
            title="Waktu"
            desc="09.00 WIB"
            delay={0.15}
          />
          <InfoCard
            icon={<MapPin />}
            title="Lokasi"
            desc="Gardenia Hall – Sentul"
            delay={0.3}
            link="https://maps.app.goo.gl/7ixwSh9bvGUB3ofA6"
          />
        </section>

        {/* RSVP */}
        <section className="py-28 px-4">
          <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Konfirmasi Kehadiran
            </h2>

            <form onSubmit={handleRSVP} className="space-y-6">
              <input
                name="nama"
                required
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 border rounded-xl"
              />
              <input
                name="jumlah"
                type="number"
                min={1}
                required
                placeholder="Jumlah Kehadiran"
                className="w-full px-4 py-3 border rounded-xl"
              />
              <button
                disabled={loading}
                className="w-full bg-amber-500 text-white py-4 rounded-xl font-semibold"
              >
                {loading ? "Mengirim..." : "Kirim RSVP"}
              </button>
            </form>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-300 pb-12">
          © {new Date().getFullYear()} GBI Sirkuit Sentul
        </footer>
      </div>
    </div>
  );
}
