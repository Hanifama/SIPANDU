import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import bgImage from "../../assets/bg-services.jpg";
import { Ruler, Diamond, Compass, Wrench, Database, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
  isBestService?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  Icon,
  title,
  description,
  isBestService = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimate(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`group h-full flex flex-col p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 text-left ${isBestService
          ? "relative bg-gradient-to-r from-blue-700 to-blue-900 p-8 shadow-2xl hover:shadow-3xl border-2 border-blue-400 text-white"
          : "bg-white"
        }`}
    >
      {isBestService && (
        <div className="absolute top-3 right-3 bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ⭐
        </div>
      )}
      <div className="flex justify-start mb-4 text-5xl">
        <Icon />
      </div>
      <h3 className={`text-xl font-semibold ${isBestService ? "text-white uppercase tracking-wide" : "text-gray-900"}`}>
        {title}
      </h3>
      <p className={`mt-3 ${isBestService ? "text-gray-200 text-lg font-medium" : "text-gray-600"}`}>
        {description}
      </p>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section
      className="services relative bg-[#e1e8e1] bg-cover bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto p-6">
        {/* Badge & Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center space-y-4 pl-0 md:space-x-6 md:pl-[350px]"
        >
          <div className="inline-flex w-[400px] items-center bg-gradient-to-r from-blue-700 to-blue-900 border-2 border-blue-400 text-white justify-center font-semibold px-5 py-2 rounded-full shadow-md text-center mx-auto">
            *Best Service
          </div>
          <div className="text-center md:text-left px-4">
            <h2 className="text-2xl font-bold text-blue-800 uppercase tracking-wide">
              Perencanaan (Feasibility Study & Master Plan)
            </h2>
            <p className="text-sm text-gray-700 mt-2 font-medium">
              PT. Java Konsul Utama menghadirkan layanan perencanaan komprehensif yang mencakup studi kelayakan
              (feasibility study) serta penyusunan master plan. Kami membantu menganalisis aspek teknis, ekonomi, dan
              lingkungan untuk memastikan proyek dapat berjalan dengan efisien, berkelanjutan, dan sesuai dengan standar
              yang berlaku.
            </p>
          </div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {[
            { Icon: Ruler, title: "Survey & Pengukuran", description: "Pengukuran lahan dengan teknologi canggih untuk hasil yang lebih akurat." },
            { Icon: Diamond, title: "Perencanaan Master Plan", description: "Penyusunan rencana strategis proyek agar lebih efisien.", isBestService: true },
            { Icon: Compass, title: "Perancangan Teknik", description: "Desain teknis yang presisi dan sesuai standar." },
            { Icon: Wrench, title: "Manajemen Konstruksi", description: "Pengelolaan proyek dengan sistem yang terorganisir untuk hasil yang optimal." },
            { Icon: Database, title: "Computerized Data Processing", description: "Pemrosesan data berbasis teknologi untuk meningkatkan efisiensi proyek konstruksi." },
            { Icon: Mountain, title: "Analisis Struktur Tanah", description: "Kajian mendalam mengenai struktur tanah untuk memastikan kondisi tanah dengan baik." },
          ].map((service, index) => (
            <Link to="/services" key={index} className="block h-full">
              <ServiceCard {...service} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
