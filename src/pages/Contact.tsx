import ContactImage from "../assets/contact-us.jpg"
import Navbar from "../components/_shared/navbar";
import Banner from "../components/_shared/bannerImage";
import Footer from "../components/_shared/footer";
import ContactSection from "../components/layouts/contact";
import ScrollToTopButton from "../components/_shared/scrollToTopButton";
import SEO from "../components/_shared/SEO";

export default function ContactPage() {
    return (
        <div>
            <SEO
                title="Hubungi Kami | Java Konsul Utama"
                description="Hubungi tim Java Konsul Utama untuk informasi lebih lanjut mengenai layanan kami. Kami siap membantu kebutuhan Anda."
                keywords="Kontak Java Konsul, Konsultasi, Layanan Konsultan, Hubungi Kami"
            />

            <Navbar />
            <div className="pt-16">
                <Banner imageUrl={ContactImage} altText="Layanan Kami" />
            </div>
            <ContactSection />
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}
