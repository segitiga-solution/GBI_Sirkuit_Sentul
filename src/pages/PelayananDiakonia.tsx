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
<section className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
  <div className="relative w-full h-[240px] sm:h-[340px] md:h-[460px] rounded-md overflow-hidden shadow-md bg-gray-200">

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

    {/* Overlay lembut di bawah */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

    {/* Indikator bulatan */}
    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      {images.map((_, i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
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
          Pelayanan Diakonia adalah wujud nyata kasih Kristus yang menggerakkan kita untuk melayani sesama, terutama mereka yang membutuhkan bantuan, penghiburan, dan dukungan. Sebagaimana tertulis dalam Galatia 6:2,

"Bertolong-tolonganlah menanggung bebanmu! Demikianlah kamu memenuhi hukum Kristus."
        </p>
        <p>
         Kami percaya bahwa setiap tindakan kasih — sekecil apa pun — memiliki makna besar di hadapan Tuhan (Matius 25:40). Melalui Pelayanan Diakonia, GBI Sirkuit Sentul rindu menjadi saluran kasih Allah dengan memberikan dukungan sosial, doa, serta kunjungan kepada jemaat maupun masyarakat yang membutuhkan penguatan rohani maupun materi.
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
