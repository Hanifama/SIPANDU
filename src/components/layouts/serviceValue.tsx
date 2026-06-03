import { Briefcase, CheckCircle, Award } from "lucide-react";

interface Value {
  icon: React.ElementType;
  title: string;
  description: string;
}

const companyValues: Value[] = [
  {
    icon: Briefcase,
    title: "Berpengalaman & Terpercaya",
    description:
      "Dengan pengalaman bertahun-tahun, kami telah menangani berbagai proyek dari skala kecil hingga besar.",
  },
  {
    icon: Award,
    title: "Kualitas Tanpa Kompromi",
    description:
      "Setiap layanan kami dirancang dengan standar kualitas tinggi dan dikerjakan secara profesional.",
  },
  {
    icon: CheckCircle,
    title: "Kepuasan Anda Prioritas Kami",
    description:
      "Kami selalu mengutamakan kebutuhan klien dengan layanan yang cepat dan transparan.",
  },
];

// ✅ Komponen Card Reusable
const ValueCard: React.FC<Value> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4 bg-white p-5 sm:p-6 shadow-md rounded-xl">
      <Icon className="w-10 h-10 sm:w-14 sm:h-14 text-blue-500 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-base sm:text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

// ✅ Komponen Utama
const ServicesValues: React.FC = () => {
  return (
    <section className="relative py-10 -mt-32 sm:-mt-40 z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {companyValues.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesValues;
