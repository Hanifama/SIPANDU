import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Ruler
} from "lucide-react";
import { useServiceStore } from "../../store/useFeatureStore";

const colorMap = [
  "from-blue-500 to-blue-300",
  "from-purple-500 to-purple-300",
  "from-green-500 to-green-300",
  "from-yellow-500 to-yellow-300",
  "from-red-500 to-red-300",
  "from-teal-500 to-teal-300",
];

const ServicesSection = () => {
  const { services, fetchPublicServices } = useServiceStore();

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      fetchPublicServices();
      isFetched.current = true;
    }
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Layanan Kami</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          PT Java Konsul Utama menyediakan berbagai layanan teknis dan profesional yang menunjang keberhasilan proyek Anda.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, idx) => {
            const iconUrl = service.icon;
            const color = colorMap[idx % colorMap.length];
            const slug = service.name.toLowerCase().replace(/\s+/g, "-");

            return (
              <div
                key={service.service_id}
                className="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition group overflow-hidden"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-4 bg-gradient-to-br ${color} p-4 rounded-full text-white`}>
                    {iconUrl ? (
                      <img src={iconUrl} alt={service.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <Ruler className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.tagline || "Layanan profesional dari kami."}
                  </p>
                  <Link
                    to={`/services/${slug}`}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Selengkapnya →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
