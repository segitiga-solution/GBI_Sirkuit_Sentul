import { useState, useEffect } from "react";

export default function PelayananKedukaan() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/duka.jpeg", "/duka2.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Pelayanan Kedukaan
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Pelayanan Kedukaan hadir sebagai wujud kasih Kristus untuk menghibur dan mendampingi keluarga yang berduka, sebagaimana Tuhan adalah sumber segala penghiburan (2 Korintus 1:3–4). Kami percaya bahwa di dalam Kristus ada pengharapan akan kehidupan kekal (Yohanes 11:25), dan setiap pelayanan ini dilakukan dengan kasih dan empati bagi mereka yang sedang berduka.
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

          {/* GRADIENT OVERLAY UNTUK TEKSTUR LEMBUT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* INDIKATOR */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i === currentImage
                    ? "bg-gray-800 scale-110"
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
          Pelayanan Kedukaan hadir untuk mendampingi keluarga yang sedang berduka dengan kasih Kristus.
          Kami percaya bahwa setiap kehidupan berharga di hadapan Tuhan dan layak mendapatkan penghormatan terakhir yang penuh kasih dan hormat.
        </p>
        <p>
          Melalui pelayanan ini, GBI Sirkuit Sentul siap membantu dalam setiap langkah proses kedukaan — mulai dari pengurusan administrasi, perizinan pemakaman, hingga dukungan doa dan penghiburan rohani bagi keluarga yang ditinggalkan.
        </p>
        <p>
          Kami juga melayani ibadah penghiburan di rumah duka, serta membantu koordinasi teknis dengan pihak pemakaman agar seluruh proses berjalan dengan baik, tertib, dan penuh kasih.
        </p>
        <P>
          Setiap pelayanan dijalankan dengan semangat empati, ketulusan, dan pengharapan dalam Kristus, bahwa setiap jiwa yang percaya kepada-Nya telah memperoleh kehidupan yang kekal.
        </P>

        {/* KONTAK TIM */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-gray-700">
          <h3 className="text-2xl font-bold mb-4">
            Hubungi Tim Pelayanan Kedukaan
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda membutuhkan bantuan atau ingin menghubungi tim kedukaan,
            silakan mengisi formulir pada halaman <b>Kontak</b> kami, atau
            hubungi langsung sekretariat gereja di nomor yang tertera pada
            bagian bawah situs.
          </p>
        </div>
      </section>
    </div>
  );
}
