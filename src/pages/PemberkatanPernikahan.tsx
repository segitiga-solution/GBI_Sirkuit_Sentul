import { useState, useEffect } from "react";

export default function PelayananPemberkatanPernikahan() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/pemberkatan.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-rose-800 to-pink-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Pelayanan Pemberkatan Pernikahan
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            “Sebab itu seorang laki-laki akan meninggalkan ayahnya dan ibunya
            dan bersatu dengan istrinya, sehingga keduanya menjadi satu daging.”
            <br />
            <span className="text-gray-300 text-sm">
              — Kejadian 2:24 (TB)
            </span>
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
             className={`absolute inset-0 w-full h-full object-contain sm:object-cover object-center transition-opacity duration-1000 ease-in-out ${
             index === currentImage ? "opacity-100" : "opacity-0"
             }`}
            />

          ))}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

          {/* INDIKATOR */}
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
          Pelayanan Pemberkatan Pernikahan adalah momen kudus di mana dua insan
          diberkati dan dipersatukan oleh Tuhan dalam kasih-Nya. GBI Sirkuit
          Sentul percaya bahwa pernikahan adalah rancangan ilahi yang mencerminkan
          hubungan antara Kristus dan jemaat-Nya.
        </p>
        <p>
          Melalui ibadah pemberkatan, kami meneguhkan komitmen suami dan istri
          untuk membangun rumah tangga yang berlandaskan kasih, kesetiaan, dan
          Firman Tuhan — sebagaimana tertulis:
          <br />
          <span className="italic text-gray-700">
            “Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan
            manusia.” — Markus 10:9
          </span>
        </p>
        <p>
          Tim gereja siap mendampingi pasangan yang akan menikah melalui
          pembinaan pra-nikah, persiapan ibadah, serta bimbingan rohani agar
          pernikahan mereka menjadi kesaksian hidup yang memuliakan nama Tuhan.
        </p>

        {/* KONTAK TIM */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-rose-600">
          <h3 className="text-2xl font-bold mb-4">
            Hubungi Tim Pelayanan Pemberkatan
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda ingin mengajukan pemberkatan pernikahan atau membutuhkan
            bimbingan pra-nikah, silakan mengisi formulir pada halaman{" "}
            <b>Kontak</b> kami, atau hubungi langsung sekretariat gereja di
            nomor yang tertera pada bagian bawah situs.
          </p>
        </div>
      </section>
    </div>
  );
}
