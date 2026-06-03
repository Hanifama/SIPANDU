import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import clientOne from "../../assets/client-1.jpg";
import clientTwo from "../../assets/client-2.jpg";
import clientThree from "../../assets/client-3.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Client {
    img: string;
    name: string;
    position: string;
    text: string;
}

const Testimonials: React.FC = () => {
    const clients: Client[] = [
        {
            img: clientOne,
            name: "Desi Permatasari",
            position: "Project Manager PT. XYZ",
            text: "Tim PT. Java Konsul Utama sangat profesional! Mereka memastikan setiap tahapan proyek berjalan sesuai rencana dengan pengawasan yang ketat. Hasil pekerjaan mereka berkualitas tinggi dan selalu tepat waktu. Kami sangat puas!",
        },
        {
            img: clientTwo,
            name: "Dian Permadi",
            position: "Kepala Teknik CV. ABCD",
            text: "Kami sangat terbantu dengan hasil survey dan pemetaan yang presisi. Data yang diberikan sangat detail dan akurat, membantu kami dalam pengambilan keputusan teknis. Terima kasih atas dedikasi dan profesionalisme tim!",
        },
        {
            img: clientThree,
            name: "Rina Kusuma",
            position: "Kepala Desa",
            text: "Dokumen perencanaan dan perancangan dari PT. Java Konsul Utama sangat matang dan terstruktur. Hal ini membuat proses pembangunan berjalan lancar tanpa kendala berarti. Tim mereka benar-benar ahli di bidangnya!",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + clients.length) % clients.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    };

    return (
        <section ref={ref} className="relative py-16 bg-gray-100 px-4 md:px-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left"
                >
                    <p className="text-blue-800 text-base md:text-lg font-semibold uppercase">
                        Apa Kata Klien Kami?
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                        Testimoni <span className="text-blue-800">Klien</span>
                    </h2>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex justify-center md:justify-end space-x-4 my-6">
                    <motion.button
                        onClick={handlePrev}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-700 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-800 transition"
                    >
                        <ChevronLeft size={20} />
                    </motion.button>

                    <motion.button
                        onClick={handleNext}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-700 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-800 transition"
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>

                {/* Testimonial Content */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="relative w-60 h-60 md:w-72 md:h-72"
                    >
                        <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gray-400 rounded-lg z-0"></div>
                        <img
                            src={clients[currentIndex].img}
                            alt={clients[currentIndex].name}
                            className="relative w-full h-full object-cover shadow-md rounded-lg z-10"
                        />
                    </motion.div>

                    {/* Testimonial Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative bg-white shadow-lg rounded-xl p-5 md:p-6 w-full"
                    >
                        <h4 className="text-lg md:text-xl font-semibold">
                            {clients[currentIndex].name}
                        </h4>
                        <h5 className="text-gray-600 text-sm md:text-base">
                            {clients[currentIndex].position}
                        </h5>
                        <p className="text-gray-700 mt-3 text-sm md:text-base leading-relaxed">
                            {clients[currentIndex].text}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
