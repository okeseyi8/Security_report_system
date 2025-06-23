import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/photo.jpg",
  "/images/photo-four.jpg",
  "/images/photo-two.png",
];

export default function BackgroundSlideshow({ children }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  h-screen overflow-hidden">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[#1f2e05] opacity-40" />
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col  h-full text-white font-semibold ">
        {children}
      </div>
    </div>
  );
}
