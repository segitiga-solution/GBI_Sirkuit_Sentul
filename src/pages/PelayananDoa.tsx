import { useState, useEffect } from "react";

export default function PelayananDoa() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/doa.JPEG","/doa2.JPEG"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Pelayanan Doa</h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Pelayanan Doa hadir untuk menopang jemaat melalui doa syafaat, percaya
            bahwa kuasa Tuhan bekerja bagi setiap orang yang berseru kepada-Nya.
            (Yakobus 5:16)
          </p>
        </div>
      </section>

      {/* SLIDESHOW */}
      <section className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl bg-gray-200">
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
        </div>
      </section>

      {/* ISI KONTEN */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-6 leading-relaxed text-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Tentang Pelayanan
        </h2>
        <p>
          Pelayanan Doa merupakan wadah di mana jemaat bersama-sama bersyafaat bagi
          keluarga, gereja, bangsa, dan setiap kebutuhan yang dipercayakan kepada Tuhan.
        </p>
        <p>
          Kami percaya bahwa doa bukan hanya sarana permohonan, tetapi juga bentuk
          persekutuan yang mempererat hubungan umat dengan Allah.
        </p>
        <p>
          Tim doa GBI Sirkuit Sentul siap mendukung setiap jemaat dalam menghadapi
          pergumulan hidup melalui doa, penguatan firman, dan pengharapan di dalam Kristus.
        </p>

        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-indigo-700">
          <h3 className="text-2xl font-bold mb-4">Hubungi Tim Pelayanan Doa</h3>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda membutuhkan dukungan doa, silakan kirimkan permohonan melalui
            halaman <b>Kontak</b> kami, atau hubungi sekretariat gereja. Kami rindu
            berdoa bersama Anda.
          </p>
        </div>
      </section>
    </div>
  );
}
