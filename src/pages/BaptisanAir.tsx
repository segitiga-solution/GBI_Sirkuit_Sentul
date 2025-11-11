import { useState, useEffect } from "react";

export default function PelayananBaptisanAir() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/baptis.jpeg"]; // ganti sesuai nama file gambar kamu

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 text-gray-800">
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Pelayanan Baptisan Air</h1>
          <p className="text-lg text-blue-100 leading-relaxed">
            Baptisan Air adalah tanda ketaatan dan komitmen seorang percaya untuk hidup dalam Kristus,
            sebagaimana tertulis dalam <strong>Roma 6:4</strong>:
            <br />
            <em>
              “Dengan demikian kita telah dikuburkan bersama-sama dengan Dia oleh baptisan dalam kematian,
              supaya, sama seperti Kristus telah dibangkitkan dari antara orang mati oleh kemuliaan Bapa,
              demikian juga kita akan hidup dalam hidup yang baru.”
            </em>
          </p>
        </div>
      </section>

      {/* SLIDESHOW FOTO */}
      <section className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-blue-200">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Foto Baptisan ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>

          {/* Indikator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i === currentImage ? "bg-white scale-110" : "bg-blue-300 opacity-70"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* ISI KONTEN */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-6 leading-relaxed text-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Tentang Pelayanan</h2>
        <p>
          Pelayanan Baptisan Air merupakan langkah iman yang penting bagi setiap orang percaya sebagai simbol
          pertobatan dan keputusan untuk mengikuti Kristus sepenuh hati.
        </p>
        <p>
          Melalui baptisan, kita dimeteraikan dalam kematian dan kebangkitan Yesus Kristus, meninggalkan manusia
          lama dan hidup sebagai ciptaan baru di dalam kasih karunia-Nya.
        </p>
        <p>
          Seperti tertulis dalam <strong>Kisah Para Rasul 2:38</strong>:
          <em>
            “Bertobatlah dan hendaklah kamu masing-masing memberi dirimu dibaptis dalam nama Yesus Kristus untuk
            pengampunan dosamu, maka kamu akan menerima karunia Roh Kudus.”
          </em>
        </p>
        <p>
          GBI Sirkuit Sentul menyediakan pelayanan Baptisan Air bagi jemaat yang rindu mengukuhkan imannya dan
          hidup dalam persekutuan yang baru bersama Kristus.
        </p>

        {/* KONTAK TIM */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-l-4 border-blue-700">
          <h3 className="text-2xl font-bold mb-4">Hubungi Tim Baptisan Air</h3>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda ingin mengikuti pelayanan Baptisan Air, silakan menghubungi sekretariat gereja atau isi
            formulir pada halaman <b>Kontak</b>. Tim kami akan mengarahkan Anda untuk mengikuti kelas persiapan
            baptisan dan ibadah peneguhan iman.
          </p>
        </div>
      </section>
    </div>
  );
}
