import { useState, useEffect } from "react";

export default function PelayananCommunityOfLove() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/cool.jpeg", "/cool2.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-rose-700 to-pink-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Community of Love
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Menjadi wadah persekutuan jemaat yang saling mengasihi, menguatkan,
            dan bertumbuh bersama dalam kasih Kristus.
          </p>
          <p className="mt-4 italic text-gray-300">
            “Supaya kamu saling mengasihi, sama seperti Aku telah mengasihi kamu.”
            <br />– Yohanes 13:34
          </p>
        </div>
      </section>

      {/* SLIDESHOW FOTO */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Indikator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i === currentImage
                    ? "bg-white scale-110"
                    : "bg-gray-400 opacity-70"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* ISI KONTEN */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-6 leading-relaxed text-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Tentang Pelayanan
        </h2>
        <p>
          Pelayanan <b>Community of Love</b> hadir untuk membangun komunitas yang
          hidup dalam kasih Kristus, di mana setiap jemaat saling mendukung,
          memperhatikan, dan bertumbuh bersama dalam iman.
        </p>
        <p>
          Melalui persekutuan, doa, dan kegiatan bersama, kami percaya bahwa
          kasih Tuhan dapat dinyatakan secara nyata di tengah kehidupan jemaat
          dan masyarakat sekitar.
        </p>
        <p>
          Kami mengundang setiap jemaat untuk menjadi bagian dari komunitas ini,
          agar bersama-sama kita dapat menjadi terang dan garam di dunia.
        </p>

        {/* KONTAK */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-rose-500">
          <h3 className="text-2xl font-bold mb-4">
            Hubungi Tim Community of Love
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Ingin bergabung atau mengetahui lebih lanjut tentang komunitas ini?
            Silakan hubungi tim pelayanan kami melalui halaman <b>Kontak</b> atau
            sekretariat gereja.
          </p>
        </div>
      </section>
    </div>
  );
}
