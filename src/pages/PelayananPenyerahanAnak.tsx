import { useState, useEffect } from "react";

export default function PelayananPenyerahanAnak() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/penyerahananak.jpeg", "/penyerahananak2.jpeg"]; // ganti dengan gambar kamu

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-pink-600 to-pink-400 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Pelayanan Penyerahan Anak
          </h1>
          <p className="text-lg text-pink-100 leading-relaxed">
            Untuk mendapat anak inilah aku berdoa, dan Tuhan telah memberikan kepadaku apa yang kuminta dari pada-Nya. Maka aku pun menyerahkannya kepada Tuhan; seumur hidup terserahlah ia kepada Tuhan. (1 Samuel 1:27–28)
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
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i === currentImage
                    ? "bg-pink-600 scale-110"
                    : "bg-pink-300 opacity-70"
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
          Pelayanan Penyerahan Anak adalah momen kudus dan penuh sukacita di mana orang tua membawa anak-anak mereka untuk diserahkan kepada Tuhan sebagai ungkapan syukur dan komitmen iman. Kami percaya bahwa setiap anak adalah anugerah dan pusaka dari Tuhan (Mazmur 127:3), dan sejak awal kehidupan mereka, Tuhan telah menaruh rancangan yang indah atas masa depannya.        </p>
        <p>
          GBI Sirkuit Sentul siap mendampingi setiap keluarga yang rindu mempersembahkan anak-anak mereka kepada Tuhan — agar mereka tumbuh dalam kasih, iman, dan pengharapan di dalam Kristus.
        </p>
        <p>
          Pelayanan ini terbuka bagi setiap keluarga jemaat yang rindu mempersembahkan anak mereka kepada Tuhan dengan keyakinan bahwa Ia akan menuntun langkah mereka sejak dini.
        </p>

        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-pink-500">
          <h3 className="text-2xl font-bold mb-4">
            Hubungi Tim Pelayanan Penyerahan Anak
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda ingin mendaftarkan anak untuk didoakan dan diserahkan kepada Tuhan, silakan hubungi sekretariat gereja atau isi formulir di halaman <b>Kontak</b>.
          </p>
        </div>
      </section>
    </div>
  );
}
