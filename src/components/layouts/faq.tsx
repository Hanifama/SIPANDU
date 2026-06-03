import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Apa saja layanan yang tersedia oleh Java Konsul Utama?",
    answer:
      "Kami menawarkan layanan seperti perencanaan proyek, manajemen konstruksi, pengawasan, studi kelayakan, dan desain struktur.",
  },
  {
    question: "Bagaimana proses kerja sama dengan Java Konsul Utama?",
    answer:
      "Proses kerja sama dimulai dengan konsultasi awal, analisis kebutuhan proyek, penyusunan rencana, hingga implementasi dan pengawasan proyek.",
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?",
    answer:
      "Waktu pengerjaan tergantung pada skala dan kompleksitas proyek. Proyek kecil bisa memakan waktu beberapa minggu, sedangkan proyek besar bisa berbulan-bulan hingga tahunan.",
  },
  {
    question: "Apakah konsultasi awal tersedia untuk semua jenis proyek?",
    answer:
      "Ya, kami menyediakan konsultasi awal untuk semua jenis proyek guna memahami kebutuhan dan memberikan solusi terbaik bagi Anda.",
  },
  {
    question: "Bagaimana cara mendapatkan penawaran harga untuk proyek saya?",
    answer:
      "Anda bisa menghubungi kami melalui WhatsApp atau email dengan rincian proyek Anda. Tim kami akan memberikan estimasi biaya berdasarkan kebutuhan proyek Anda.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-left">
          Pertanyaan Yang Sering Diajukan
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-left">
          Temukan jawaban atas pertanyaan seputar layanan kami.
        </p>

        <div className="mt-6 sm:mt-8 space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                className="w-full text-left p-3 sm:p-4 bg-blue-800 text-white font-semibold flex justify-between items-center text-sm sm:text-base"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-3 sm:p-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;
