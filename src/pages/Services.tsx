import ServiceImage from "../assets/services.jpg"
import Navbar from "../components/_shared/navbar";
import Banner from "../components/_shared/bannerImage";
import Footer from "../components/_shared/footer";
import ServicesValues from "../components/layouts/serviceValue";
import ServicesSection from "../components/layouts/serviceProfile";
import ConsultationSection from "../components/_shared/bannerCTA";
import ScrollToTopButton from "../components/_shared/scrollToTopButton";
import SEO from "../components/_shared/SEO";

export default function ServicePage() {
    return (
        <div>
            <SEO
                title="Layanan Kami - Java Konsul Utama"
                description="Pelajari berbagai layanan konsultasi dan solusi dari Java Konsul Utama yang siap membantu kebutuhan bisnis Anda."
                keywords="layanan konsultasi, solusi bisnis, Java Konsul Utama"
            />
            <Navbar />
            <div className="pt-16">
                <Banner imageUrl={ServiceImage} altText="Layanan Kami" />
            </div>
            <ServicesValues />
            <ServicesSection />
            <ConsultationSection />
            <Footer />

            <ScrollToTopButton />
        </div>
    )
}