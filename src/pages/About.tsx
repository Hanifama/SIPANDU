import AboutImage from "../assets/About-Us.jpg"
import Navbar from "../components/_shared/navbar";
import Banner from "../components/_shared/bannerImage";
import VisionMission from "../components/layouts/visiMission";
import TeamSection from "../components/layouts/team";
import CompanyValues from "../components/layouts/value";
import ConsultationSection from "../components/_shared/bannerCTA";
import Footer from "../components/_shared/footer";
import ScrollToTopButton from "../components/_shared/scrollToTopButton";
import CompanyProfile from "../components/layouts/compro";
import SEO from "../components/_shared/SEO";

export default function AboutPage() {
    return (
        <div>
            <SEO
                title="Tentang Kami | Java Konsul Utama"
                description="Kenali lebih dekat Java Konsul Utama – visi, misi, dan tim profesional kami yang siap memberikan layanan terbaik."
                keywords="Tentang Java Konsul, Profil Perusahaan, Konsultan, Profesional"
            />

            <Navbar />
            <div className="pt-16">
                <Banner imageUrl={AboutImage} altText="Tentang Kami" />
            </div>
            <CompanyProfile />
            <VisionMission />
            <TeamSection />
            <CompanyValues />
            <ConsultationSection />
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}
