import { useState, useEffect } from "react";

export default function PelayananDiakonia() {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const images: string[] = ["/diakonia1.jpeg", "/diakonia2.jpeg","/diakonia3.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Pelayanan Diakonia
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Menyalurkan kasih Kristus melalui pelayanan sosial, kunjungan, dan
            dukungan bagi jemaat maupun masyarakat yang membutuhkan.
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

          {/* INDIKATOR */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i === currentImage
                    ? "bg-purple-700 scale-110"
                    : "bg-gray-300 opacity-70"
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
          Pelayanan Diakonia merupakan wujud nyata kasih Kristus yang diwujudkan
          melalui bantuan sosial, kunjungan, dan dukungan moral bagi jemaat
          maupun masyarakat di sekitar gereja.
        </p>
        <p>
          Kami percaya bahwa setiap tindakan kasih, sekecil apapun, dapat
          membawa pengharapan baru bagi mereka yang membutuhkan. Melalui
          pelayanan ini, gereja berperan aktif menjadi saluran berkat bagi
          lingkungan sekitar.
        </p>
        <p>
          Program diakonia mencakup kegiatan berbagi kebutuhan pokok, pelayanan
          doa bagi yang sakit, kunjungan kasih, serta pemberian bantuan untuk
          warga yang mengalami kesulitan ekonomi.
        </p>

        {/* KONTAK TIM */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-purple-600">
          <h3 className="text-2xl font-bold mb-4">
            Hubungi Tim Pelayanan Diakonia
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda mengetahui anggota jemaat atau warga sekitar yang
            membutuhkan bantuan, silakan hubungi tim diakonia melalui halaman{" "}
            <b>Kontak</b> kami atau melalui sekretariat gereja.
          </p>
        </div>
      </section>
    </div>
  );
}
