import ConsultationSection from "../components/_shared/bannerCTA";
import Footer from "../components/_shared/footer";
import Navbar from "../components/_shared/navbar";
import ScrollToTopButton from "../components/_shared/scrollToTopButton";
import SEO from "../components/_shared/SEO";
import WhyChooseUs from "../components/layouts/choose";
import Clients from "../components/layouts/client";
import FAQSection from "../components/layouts/faq";
import Header from "../components/layouts/header";
import ServicesSection from "../components/layouts/service";
import Testimonials from "../components/layouts/testimonials";

export default function HomePage() {
    return (
        <div>
            <SEO
                title="Java Konsul Utama | Konsultan Perencanaan & Pelaksanaan"
                description="Java Konsul Utama menghadirkan layanan konsultasi perencanaan dan pelaksanaan proyek terbaik di Indonesia. Lihat portofolio kami dan konsultasi gratis sekarang!"
                keywords="konsultan perencanaan, jasa pelaksanaan proyek, konsultan teknik, manajemen proyek, konsultan konstruksi"
            />
            <Navbar />
            <Header />
            <WhyChooseUs />
            <ServicesSection />
            <Clients />
            <Testimonials />
            <FAQSection />
            <ConsultationSection />
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}