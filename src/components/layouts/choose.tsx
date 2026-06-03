import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import bgImage from "../../assets/javakonsulimg.jpg";
import { CheckCircle } from "lucide-react";

const WhyChooseUs: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isInView);
  }, [isInView]);

  return (
    <section id="why-choose-us" ref={ref} className="container min-h-screen max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 py-16">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
        {/* Gambar */}
        <motion.div
          className="relative md:order-1 order-2"
          initial={{ opacity: 0, x: -50 }}
          animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 md:-bottom-8 md:-left-8 w-full h-full bg-blue-100 rounded-lg shadow-lg z-0"></div>
          <img src={bgImage} alt="Kenapa Memilih Kami" loading="lazy" className="w-full h-auto rounded-lg shadow-lg relative z-10" />
        </motion.div>

        {/* Konten teks */}
        <motion.div
          className="md:order-2 order-1"
          initial={{ opacity: 0, x: 50 }}
          animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-sm sm:text-base font-bold text-blue-800 leading-tight">Kenapa Memilih Kami?</h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mt-4 font-medium">
            Rencanakan Konstruksi Anda <span className="text-blue-800 font-semibold">Bersama Kami</span>
          </p>
          <div className="mt-6 space-y-6">
            {[{
              title: "Komitmen pada Kepuasan Klien",
              description: "Kami bekerja dengan transparansi, profesionalisme, dan komunikasi yang jelas agar setiap proyek berjalan sesuai harapan klien."
            }, {
              title: "Keahlian & Pengalaman Teruji",
              description: "Dengan pengalaman bertahun-tahun di bidang Survey, Pengukuran, Perencanaan, dan Manajemen Konstruksi, kami telah menangani berbagai proyek berskala nasional dengan hasil yang presisi dan berkualitas."
            }, {
              title: "Jaminan Harga Terbaik",
              description: "Dari perencanaan hingga pengawasan konstruksi, kami menyediakan solusi menyeluruh yang memastikan proyek berjalan lancar, tepat waktu, dan sesuai standar."
            }].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 * index }}
              >
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={animate ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, ease: "backOut", delay: 0.3 * index }}
                >
                  <CheckCircle className="text-blue-800 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </motion.div>
                <div className="max-w-full sm:max-w-md">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 text-justify text-sm sm:text-base">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;