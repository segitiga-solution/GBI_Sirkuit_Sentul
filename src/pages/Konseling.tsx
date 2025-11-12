import { useState, useEffect } from "react";

export default function PelayananKonseling() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/konseling.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Pelayanan Konseling
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            “Tuhan itu dekat kepada orang yang patah hati, dan Ia menyelamatkan
            orang-orang yang remuk jiwanya.” <br />
            <span className="text-sm italic">(Mazmur 34:19)</span>
          </p>
        </div>
      </section>

      {/* SLIDESHOW */}
      <section className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-200">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Foto ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

          {/* Indikator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i === currentImage
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300 opacity-70"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* KONTEN */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-6 leading-relaxed text-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Tentang Pelayanan
        </h2>
        <p>
          Pelayanan Konseling GBI Sirkuit Sentul hadir untuk menolong setiap
          jemaat yang sedang menghadapi pergumulan hidup, agar menemukan
          kekuatan, penghiburan, dan arah melalui Firman Tuhan.
        </p>
        <p>
          Kami percaya bahwa setiap hati yang hancur dapat dipulihkan oleh kasih
          Kristus, sebagaimana tertulis dalam{" "}
          <b>Mazmur 34:19</b>: “Tuhan itu dekat kepada orang yang patah hati,
          dan Ia menyelamatkan orang-orang yang remuk jiwanya.”
        </p>
        <p>
          Melalui pelayanan ini, kami rindu agar setiap pribadi mengalami
          pemulihan rohani, emosional, dan batiniah, serta kembali berjalan
          dalam rencana dan damai sejahtera Tuhan.
        </p>

        {/* KONTAK */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-blue-600">
          <h3 className="text-2xl font-bold mb-4">
            Hubungi Tim Konseling Gereja
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda memerlukan pelayanan konseling, bimbingan rohani, atau doa
            pribadi, silakan mengisi formulir pada halaman <b>Kontak</b> atau
            hubungi sekretariat gereja untuk menjadwalkan waktu pertemuan.
          </p>
        </div>
      </section>
    </div>
  );
}
