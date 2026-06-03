import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Cpu, FileText } from 'lucide-react';
import logoJava from "../assets/logojava.png";
import Footer from "../components/_shared/footer";
import SEO from "../components/_shared/SEO";
import { usePortfolioStore } from "../store/usePortfolioStore";

const DetailPortfolioPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        selectedPortfolio,
        fetchPublicPorfolioById,
        isLoading,
        error,
    } = usePortfolioStore();

    const isFetched = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id && !isFetched.current) {
            fetchPublicPorfolioById(id);
            isFetched.current = true;
        }
    }, [id]);
    
    const project = selectedPortfolio;

    const renderIcon = () => {
        if (project?.name === "sipil") return <Camera className="w-6 h-6 text-red-600" />;
        if (project?.name === "teknik") return <Cpu className="w-6 h-6 text-blue-600" />;
        if (project?.name === "manajemen") return <FileText className="w-6 h-6 text-green-600" />;
        return null;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-blue-600 font-semibold">Memuat detail portfolio...</p>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-3xl font-semibold mb-4">Proyek tidak ditemukan</h2>
                <button
                    onClick={() => navigate("/portfolio")}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Kembali ke Portfolio
                </button>
            </div>
        );
    }

    return (
        <div>
            <SEO
                title={`${project.name} | Java Konsul Utama Portfolio`}
                description={project.description}
                keywords={`portfolio, proyek, ${project.name}, java konsul utama`}
            />

            <section className="max-w-4xl mx-auto py-12 px-6 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <img src={logoJava} alt="Logo Java" className="w-60 h-auto" />
                    </div>

                    <button
                        onClick={() => navigate("/portfolio")}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali
                    </button>
                </div>

                <h1 className={`text-4xl font-bold mb-4`}>{project.name}</h1>

                <div className="mb-6">
                    <img
                        src={project.image_url}
                        alt={project.name}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex items-center mb-4 space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {renderIcon()}
                    </div>
                    <span className="text-lg font-semibold text-gray-700 capitalize">
                        {project.name}
                    </span>
                </div>

                <p className="text-gray-700 mb-6">{project.description}</p>

                <div className="mb-6 space-y-1">
                    <p><strong>Team:</strong> {project.team}</p>
                    <p><strong>Lokasi:</strong> {project.location}</p>
                    <p><strong>Tanggal:</strong> {project.date}</p>
                    <p><strong>Durasi:</strong> {project.duration}</p>
                    <p><strong>Biaya:</strong> {project.cost}</p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DetailPortfolioPage;
