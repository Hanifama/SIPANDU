import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import logoJava from "../assets/logojava.png";

import Footer from "../components/_shared/footer";
import SEO from "../components/_shared/SEO";
import { useServiceStore } from "../store/useFeatureStore";

const ServiceDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { services, fetchPublicServices } = useServiceStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (services.length === 0) {
            fetchPublicServices();
        }
    }, [fetchPublicServices]);

    const service = services.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, "-") === slug
    );

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const otherServices = services.filter((s) => s.service_id !== service.service_id);

    return (
        <div>
            <SEO
                title={`${service.name} - Java Konsul Utama`}
                description={service.tagline}
                keywords={`${service.name.toLowerCase()}, layanan konsultasi, java konsul utama`}
            />

            <section className="max-w-4xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-20">
                    <img src={logoJava} alt="Logo Java" className="w-60 h-auto" />
                    <button
                        onClick={() => navigate("/services")}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali
                    </button>
                </div>

                <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                        {service.icon ? (
                            <div className="p-2 rounded-full shadow-lg w-12 h-12 flex items-center justify-center">
                                <img src={service.icon} alt={service.name} className="w-8 h-8 object-contain" />
                            </div>
                        ) : (
                            <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                                <span className="font-bold">{service.name.charAt(0)}</span>
                            </div>
                        )}
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900">{service.name}</h1>
                </div>

                <p className="text-gray-800 text-lg mb-8 font-semibold">{service.tagline}</p>

                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify mb-12">
                    {service.description}
                </div>

                {/* Katalog Harga */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">Katalog Harga</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-800">
                        {[1, 2, 3].map((num) => {
                            const nameKey = `package_${num}_name`;
                            const priceKey = `package_${num}_price`;
                            const name = (service as any)[nameKey];
                            const price = (service as any)[priceKey];

                            if (!price || parseFloat(price) <= 0) return null;

                            return (
                                <li key={num} className="flex justify-between border-b py-2">
                                    <span>{name || `Paket ${num}`}</span>
                                    <span className="font-semibold">
                                        {`Rp${Number(price).toLocaleString("id-ID")}`}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Layanan Lainnya */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Layanan Lainnya</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {otherServices.map((s) => (
                            <Link
                                to={`/services/${s.name.toLowerCase().replace(/\s+/g, "-")}`}
                                key={s.service_id}
                                className="flex items-start space-x-4 p-4 border rounded-md hover:shadow-lg transition-shadow bg-white"
                            >
                                <div className="bg-blue-600 text-white p-3 rounded-full shadow-md flex-shrink-0">
                                    {s.icon ? (
                                        <div className="p-2 rounded-full shadow-md w-10 h-10 flex items-center justify-center">
                                            <img src={s.icon} alt={s.name} className="w-6 h-6 object-contain" />
                                        </div>
                                    ) : (
                                        <div className="bg-blue-600 text-white p-3 rounded-full shadow-md flex-shrink-0">
                                            <span className="font-bold">{s.name.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>
                                    <p className="text-gray-700">{s.tagline}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServiceDetailPage;
