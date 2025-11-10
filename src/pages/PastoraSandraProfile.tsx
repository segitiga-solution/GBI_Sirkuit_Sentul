import { useState, useEffect } from "react";
import { Heart, BookOpen, Users, Lightbulb, Smile, Flower2 } from "lucide-react";

export default function PastoraSandraProfile() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/papi_mami.jpeg",
    "/papikeluarga.jpeg",
    "/mami3.jpeg",
    "/mami2.jpeg", // ubah sesuai nama file di folder public
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const virtues = [
    {
      icon: Heart,
      title: "Hati yang Penuh Kasih",
      verse: "1 Yohanes 4:7-8",
      description:
        "Kasih itu berasal dari Allah. Barangsiapa tidak mengasihi, ia tidak mengenal Allah, sebab Allah adalah kasih.",
    },
    {
      icon: BookOpen,
      title: "Pengajar yang Bijaksana",
      verse: "2 Timotius 1:7",
      description:
        "Sebab Allah tidak memberikan kepada kita roh ketakutan, melainkan roh yang membangkitkan kekuatan, kasih, dan ketertiban.",
    },
    {
      icon: Users,
      title: "Pendamping yang Setia",
      verse: "Galatia 6:2",
      description:
        "Bertolanglah seorang sama lain, dan demikianlah kamu memenuhi hukum Kristus.",
    },
    {
      icon: Lightbulb,
      title: "Pemimpin yang Inspiratif",
      verse: "Titus 2:3-4",
      description:
        "Perempuan tua harus hidup dengan cara yang layak bagi orang-orang yang mengkhususkan diri untuk Tuhan.",
    },
    {
      icon: Smile,
      title: "Pelayan yang Berdedikasi",
      verse: "Kolose 3:17",
      description:
        "Dan apa pun yang kamu lakukan, baik dengan kata-kata maupun perbuatan, lakukanlah semuanya atas nama Tuhan Yesus.",
    },
    {
      icon: Flower2,
      title: "Pemberdaya Perempuan Kristen",
      verse: "1 Timotius 3:11",
      description:
        "Demikian juga perempuan harus bersikap sopan, bukan penggunjing, tetapi setia dalam segala hal.",
    },
  ];

  return (
    <div className="bg-white pt-20">
      {/* Bagian Profil + Slideshow */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Slideshow */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg sm:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl blur-2xl opacity-20 pointer-events-none"></div>

                <div className="relative w-full max-w-md sm:max-w-lg h-[320px] sm:h-[420px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Foto ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        index === currentImage ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {images.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          i === currentImage
                            ? "bg-amber-500 scale-110"
                            : "bg-white/60"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  Pdt. Sandra Suharsa
                </h1>
                <p className="text-2xl text-rose-600 font-semibold">
                  Gembala Sidang
                </p>
                <p className="text-lg text-gray-600 mt-2">GBI Sirkuit Sentul</p>
              </div>

              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Pdt. Sandra Suharsa adalah seorang hamba Tuhan yang memiliki
                  hati melayani dengan sepenuh hidupnya. Sejak tahun 1996,
                  beliau aktif melayani Tuhan secara full-time dan terus setia
                  mendampingi suami tercinta Pdt. Sandy Suharsa, dalam
                  menggembalakan jemaat di GBI Sirkuit Sentul hingga saat ini.
                </p>
                <p>
                  Dengan kerendahan hati dan kasih yang tulus, beliau terlibat
                  dalam berbagai pelayanan rohani, pembinaan jemaat, serta
                  pelayanan doa dan pengajaran. Kehadirannya menjadi teladan
                  bagi banyak wanita dan keluarga Kristen untuk hidup dalam iman
                  dan pengabdian kepada Tuhan.
                </p>
                <p>
                  Selain menggembalakan jemaat, beliau juga turut melayani dalam
                  Yayasan Sosial “Saluran Berkat” yang didirikan pada tahun
                  2008. Melalui yayasan ini, beliau bersama tim melayani
                  berbagai panti sosial dan gereja lintas denominasi, baik di
                  dalam maupun luar negeri dengan tujuan menjadi saluran kasih
                  Kristus bagi banyak orang.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-rose-500 shadow-lg">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "Kasih itu sabar, kasih itu murah hati. Ia tidak iri hati, ia
                  tidak memegahkan diri, ia tidak sombong."
                </p>
                <p className="text-rose-600 font-semibold mt-3">
                  - 1 Korintus 13:4
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fondasi Pelayanan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fondasi Pelayanan
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-rose-600 to-rose-400 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6">
              Nilai-nilai alkitabi yang membimbing pelayanan Pdt. Sandra
              Suharsa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {virtues.map((virtue, index) => {
              const Icon = virtue.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-rose-600" />
                    </div>
                    <p className="text-sm font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                      {virtue.verse}
                    </p>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {virtue.title}
                  </h3>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{virtue.description}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Misi Pelayanan */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Misi Pelayanan
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-rose-500 to-rose-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-rose-500/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-rose-300">
                Mengajar dengan Penuh Passion
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Memberikan pengajaran Firman Tuhan yang relevan, mendalam, dan
                yang menginspirasi perubahan hidup
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-rose-500/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-rose-300">
                Memberdayakan Perempuan
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Membantu perempuan Kristen menemukan potensi mereka dan melayani
                Tuhan dengan percaya diri dan penuh makna
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-rose-500/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-rose-300">
                Mengasihi dengan Tulus
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Membangun hubungan pastoral yang personal, hangat, dan penuh
                kasih dengan setiap jemaat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Pelayanan */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Visi Pelayanan
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Pdt. Sandra Suharsa memiliki visi yang jelas untuk membawa
                perubahan positif dalam kehidupan setiap anggota jemaat melalui
                pelayanan yang penuh kasih dan dedikasi. Beliau percaya bahwa
                setiap orang, khususnya perempuan Kristen, memiliki panggilan
                unik dari Tuhan dan berhak mendapatkan pembimbingan yang kuat.
              </p>

              <p>
                Melalui pengajaran Firman yang mendalam, kepemimpinan yang
                autentik, dan pelayanan pastoral yang personal, beliau
                berusaha menciptakan komunitas gereja yang inklusif, mendukung,
                dan berpusat pada Kristus.
              </p>

              <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 border-l-4 border-rose-500 mt-8">
                <p className="text-lg text-gray-800 italic mb-4">
                  "Karunia-karunia rohani memang bermacam-macam, tetapi satu
                  Roh. Jabatan-jabatan pelayanan memang bermacam-macam, tetapi
                  satu Tuhan."
                </p>
                <p className="text-gray-700 font-semibold">
                  - 1 Korintus 12:4-6 | Pdt. Sandra Suharsa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bergabung */}
      <section className="py-16 bg-rose-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Bergabunglah dengan Kami
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Kami mengundang Anda untuk menjadi bagian dari komunitas GBI
            Sirkuit Sentul dan mengalami pelayanan yang penuh kasih dan
            dedikasi di bawah kepemimpinan Pdt. Sandra Suharsa.
          </p>
          <a
            href="/#schedule"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Lihat Jadwal Ibadah
          </a>
        </div>
      </section>
    </div>
  );
}
