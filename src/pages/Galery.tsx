import Navbar from "../components/_shared/navbar";
import Footer from "../components/_shared/footer";
import GallerySection from "../components/layouts/galery";
import ScrollToTopButton from "../components/_shared/scrollToTopButton";
import SEO from "../components/_shared/SEO";

export default function GaleryPage() {
    return (
        <div>
            <SEO
                title="Galeri - Java Konsul Utama"
                description="Lihat kumpulan proyek dan dokumentasi visual terbaik dari Java Konsul Utama."
                keywords="galeri, proyek, dokumentasi, Java Konsul Utama"
            />
            <Navbar />
            <div className="pt-16">
                <GallerySection />
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}