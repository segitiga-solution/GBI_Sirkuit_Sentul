import { useState, useEffect } from "react";

export default function AboutSlideshow() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/gereja1.jpg", "/gereja2.jpg", "/gereja3.jpg","/gereja4.jpeg","/gereja5.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-100 to-blue-100">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Gereja ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay lembut */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Indikator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i === currentImage ? "bg-amber-500 scale-110" : "bg-white/60"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
