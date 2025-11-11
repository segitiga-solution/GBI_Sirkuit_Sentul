import { useState, useEffect } from "react";
import { Heart, BookOpen, Users, Award, Zap, Share2 } from "lucide-react";

export default function PastorProfile() {
  // Gambar-gambar slideshow
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/papi-mami.jpeg",
    "/papikeluarga.jpeg",
    "/papi-mami3.jpeg" // ubah nama file sesuai di folder public kamu
  ];

  // Ganti foto otomatis setiap 4 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const virtues = [
    {
      icon: Heart,
      title: "Hamba yang Setia",
      verse: "1 Korintus 4:2",
      description: "Diharapkan dari seorang hamba, supaya ia terbukti setia",
    },
    {
      icon: BookOpen,
      title: "Pengajar yang Bijaksana",
      verse: "2 Timotius 2:2",
      description:
        "Apa yang telah kau dengar dari padaku di depan banyak saksi, percayakan itu kepada orang-orang yang dapat dipercaya",
    },
    {
      icon: Users,
      title: "Pemimpin yang Penuh Kasih",
      verse: "1 Petrus 5:2-3",
      description:
        "Gembalakan kawanan domba Allah yang ada di bawah pengawasan kamu dengan sukarela, bukan karena paksaan",
    },
    {
      icon: Award,
      title: "Pelayan yang Rendah Hati",
      verse: "Filipi 2:3",
      description:
        "Jangan lakukan apa pun karena kepentingan sendiri atau karena ingin mencari kehormatan",
    },
    {
      icon: Zap,
      title: "Dinamis dalam Iman",
      verse: "Yosua 1:8",
      description:
        "Ialah jangan lepas dari mulutmu buku Taurat ini, tetapi renungkanlah itu siang dan malam",
    },
    {
      icon: Share2,
      title: "Pelayanan yang Autentik",
      verse: "1 Yohanes 1:3",
      description:
        "Apa yang telah kami lihat dan dengar, kami beritakan kepadamu supaya kamu juga beroleh persekutuan dengan kami",
    },
  ];

  return (
<div className="min-h-screen bg-white pt-20">
  {/* Bagian Profil + Slideshow Foto */}
  <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg sm:max-w-lg">
            {/* Efek background glowing */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl blur-2xl opacity-20"></div>

            {/* Slideshow container responsif */}
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

              {/* Indikator bulatan di bawah slideshow */}
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

            {/* Bagian Teks Profil */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  Pdt. Sandy Suharsa
                </h1>
                <p className="text-2xl text-amber-600 font-semibold">
                  Gembala Sidang
                </p>
                <p className="text-lg text-gray-600 mt-2">GBI Sirkuit Sentul</p>
              </div>

              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Pdt. Sandy Suharsa adalah seorang pemimpin rohani yang
                  berdedikasi dalam melayani Tuhan dan jemaat GBI Sirkuit
                  Sentul. Dengan pengalaman bertahun-tahun dalam melayani,
                  beliau telah menunjukkan komitmen yang teguh terhadap Firman
                  Tuhan dan kepedulian yang mendalam terhadap setiap jemaat.
                </p>
                <p>
                  Sebagai gembala sidang Pdt. Sandy Suharsa berfokus pada
                  pengajaran Firman Tuhan yang kuat, membangun komunitas gereja
                  yang saling mendukung, dan membawa jemaat lebih dekat dengan
                  Kristus. Pelayanannya mencerminkan nilai-nilai kesetiaan,
                  kebijaksanaan, dan kasih yang sejati.
                </p>
                <p>
                  Bersama istri tercinta Ibu Pdt. Sandra Gunawan serta kedua
                  anak mereka Tirza Vinienzia dan Fanuel Octavian Suharsa
                  beliau terus aktif melayani melalui berbagai bidang.
                </p>
                <p>
                  Sejak tahun 2008 bersama beberapa hamba Tuhan dari Gereja Suku
                  Karo, mereka mendirikan Yayasan Sosial “Saluran Berkat”, yang
                  bertujuan memperluas jangkauan pelayanan untuk memberkati
                  panti sosial dan gereja-gereja lintas denominasi, baik di
                  dalam negeri maupun di luar negeri.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-lg">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "Karena Aku datang bukan untuk dilayani, melainkan untuk
                  melayani dan memberikan nyawa-Ku menjadi tebusan bagi banyak
                  orang."
                </p>
                <p className="text-amber-600 font-semibold mt-3">
                  - Matius 20:28
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
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6">
              Nilai-nilai alkitabi yang membimbing pelayanan Pdt. Sandy Suharsa
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
                    <div className="bg-gradient-to-br from-amber-50 to-blue-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
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

      {/* Panggilan Pelayanan */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Panggilan Pelayanan
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-amber-500/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">
                Membimbing
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Membimbing jemaat melalui pengajaran Firman Tuhan yang kuat dan
                relevan untuk kehidupan sehari-hari
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-amber-500/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">
                Melayani
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Melayani dengan hati yang tulus, menunjukkan kasih Kristus
                kepada setiap individu dalam jemaat
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-amber-500/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">
                Membangun
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Membangun komunitas gereja yang kuat, saling mendukung, dan
                berpusat pada Kristus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Pelayanan */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Visi Pelayanan
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Pdt. Sandy Suharsa memiliki visi untuk membangun sebuah gereja
                yang tidak hanya kuat secara rohani, tetapi juga menjadi terang
                dan garam di tengah masyarakat. Beliau percaya bahwa setiap
                anggota jemaat memiliki potensi yang luar biasa untuk melayani
                Tuhan.
              </p>

              <p>
                Melalui pengajaran yang mendalam, kepemimpinan yang autentik,
                dan pelayanan yang tulus, Pdt. Sandy Suharsa berusaha membawa
                setiap jemaat kepada kedewasaan rohani dan membantu mereka
                menemukan tujuan Tuhan dalam hidup mereka.
              </p>

              <div className="bg-gradient-to-r from-amber-100 to-blue-100 rounded-2xl p-8 border-l-4 border-amber-500 mt-8">
                <p className="text-lg text-gray-800 italic mb-4">
                  "Setiap manusia adalah ciptaan Tuhan yang berharga, dan setiap
                  hidup memiliki tujuan. Melalui pelayanan kami, kami ingin
                  membantu Anda menemukan rencana Tuhan yang indah untuk hidup
                  Anda."
                </p>
                <p className="text-gray-700 font-semibold">
                  - Pdt. Sandy Suharsa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ajak Bergabung */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Bergabunglah dengan Kami
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Jika Anda ingin mengenal lebih dekat tentang pelayanan GBI Sirkuit
            Sentul atau ingin bergabung dengan komunitas kami, kami dengan
            senang hati menyambut Anda.
          </p>
          {/* ganti <a href="/#schedule"> atau button lama dengan ini */}
<button
  onClick={() => {
    // set hash — ini akan memicu 'hashchange' dan listener di App.tsx
    window.location.hash = "schedule";
  }}
  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
>
  Lihat Jadwal Ibadah
</button>

        </div>
      </section>
    </div>
  );
}
