import PortfolioImage from "../assets/portfolio.jpg"
import Navbar from "../components/_shared/navbar";
import Banner from "../components/_shared/bannerImage";
import Footer from "../components/_shared/footer";
import PortfolioSection from "../components/layouts/portfolio";
import ScrollToTopButton from "../components/_shared/scrollToTopButton";
import SEO from "../components/_shared/SEO";

export default function PortfolioPage() {
    return (
        <div>
            <SEO
                title="Portfolio - Java Konsul Utama"
                description="Jelajahi berbagai proyek dan hasil karya terbaik dari Java Konsul Utama."
                keywords="portfolio, proyek, hasil kerja, Java Konsul Utama"
            />
            <Navbar />
            <div className="pt-16">
                <Banner imageUrl={PortfolioImage} altText="Layanan Kami" />
            </div>
            <PortfolioSection />
            <Footer />

            <ScrollToTopButton />
        </div>
    )
}