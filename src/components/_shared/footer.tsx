import {
  Mail,
  Home,
  Facebook,
  Instagram,
  Download,
  Building,
} from 'lucide-react';
import logo from '../../assets/logojava.png';
import { Link } from 'react-router-dom';

const Footer = () => {

  const handleDownload = (path: string, filename: string) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="bg-[#f5f5f5] text-gray-800 py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr_1fr_1.5fr] gap-12">


        {/* 1. Ikuti Kami */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-6">Ikuti Kami</h3>
          <div className="flex flex-col gap-6 text-gray-700 text-sm">

            <a
              href="https://facebook.com/javakonsul"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-blue-600 transition"
            >
              <Facebook size={28} /> <span>@javakonsul</span>
            </a>

            <a
              href="https://www.tiktok.com/@javakonsul"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-pink-600 transition"
            >
              {/* TikTok icon custom */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 256 256"
                className="text-pink-600"
              >
                <defs>
                  <linearGradient id="tiktokGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2ea" />
                    <stop offset="100%" stopColor="#ff0050" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#tiktokGradient)"
                  d="M203.5 94.5c-18.2-4.3-32.3-19.1-36.3-37.2V37h-36v125.3c0 13.3-10.7 24.1-24 24.1s-24-10.8-24-24.1 10.7-24.1 24-24.1c2.7 0 5.2.4 7.6 1.3V99.8c-2.5-.3-5.1-.5-7.6-.5-33.3 0-60.3 27.1-60.3 60.6s27 60.6 60.3 60.6 60.3-27.1 60.3-60.6V120c13.5 9.4 30.1 14.9 47.7 14.9v-36c-7.6 0-15-1.2-21.9-3.4z"
                />
              </svg>
              <span>@javakonsul</span>
            </a>

            <a
              href="https://instagram.com/javakonsul_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-pink-500 transition"
            >
              <Instagram size={28} /> <span>@javakonsul_</span>
            </a>
          </div>
        </div>

        {/* 2. Layanan Kami */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-6">Layanan Kami</h3>
          <ul className="space-y-3 text-gray-700 text-sm">
            {[
              { name: 'Survey Pengukuran dan Penyelidikan', slug: 'survey-pengukuran' },
              { name: 'Perencanaan Sistem', slug: 'perencanaan-sistem' },
              { name: 'Perancangan Teknik', slug: 'perancangan-teknik' },
              { name: 'Computerized Data Processing', slug: 'data-processing' },
              { name: 'Manajemen Konstruksi & Supervisi', slug: 'manajemen-konstruksi' },
              { name: 'Analisa Tanah (Laboratorium Tanah)', slug: 'analisa-tanah' },
            ].map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="hover:text-blue-600 transition"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Informasi Kontak */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-6">Hubungi Kami</h3>
          <ul className="space-y-4 text-gray-700 text-sm">
            <li className="flex items-start gap-3">
              <Home size={20} className="mt-1" />
              <div>
                <p><strong>Kantor:</strong> Jl Pasopati RT. 002/003, Madalasari, Cikancung, Kab Bandung, Jawa Barat</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Building size={20} className="mt-1" />
              <div>
                <p><strong>Studio:</strong> Jl Hasan Saputra IV No. 20, Turangga, Lengkong, Kota Bandung, Jawa Barat</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} />
              <a href="mailto:javakonsulutama@gmail.com" className="hover:text-blue-600 transition">
                javakonsulutama@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-green-600"
              >
                <path d="M20.52 3.48A11.75 11.75 0 0012 0C5.37 0 0 5.37 0 12a11.6 11.6 0 001.64 6l-1.6 5.83 6.04-1.58A11.92 11.92 0 0012 24c6.63 0 12-5.37 12-12a11.66 11.66 0 00-3.48-8.52zm-2.13 12.96c-.31.87-1.83 1.65-2.52 1.76-.67.11-1.23.16-3.08-.89-2.65-1.44-4.36-4.55-4.5-4.74-.14-.2-1.11-1.52-1.11-2.9 0-1.38.72-2.07.98-2.35.26-.28.57-.35.76-.35.2 0 .4 0 .58.01.19.01.44-.07.67.52.22.58.74 2 .8 2.15.06.15.1.32.02.51-.08.19-.12.31-.25.48-.13.17-.28.38-.4.52-.14.17-.3.35-.12.68.18.33.8 1.33 1.72 2.15 1.18 1.14 2.17 1.5 2.55 1.67.38.18.6.15.82-.09.22-.24.95-1.1 1.21-1.47.27-.38.54-.31.9-.19.36.12 2.27 1.07 2.66 1.26.39.2.65.3.74.47.09.18.09 1.05-.22 1.92z" />
              </svg>

              <a
                href="https://wa.me/628112497999"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600 transition"
              >
                +62 811-2497-999
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Logo + Deskripsi + Download */}
        <div className="md:col-span-1">
          <img src={logo} alt="Java Konsul Logo" className="w-80 mb-4" />
          <p className="text-sm leading-relaxed text-gray-700 mb-6">
            Konsultan profesional dalam perencanaan dan pengelolaan proyek sipil, memastikan solusi terbaik untuk setiap kebutuhan konstruksi Anda.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                handleDownload("/data/company.pdf", "brosur-java-konsul.pdf")
              }
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
            >
              <Download size={18} /> Brosur
            </button>

            <button
              onClick={() =>
                handleDownload("/data/company.pdf", "company-profile-java-konsul.pdf")
              }
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
            >
              <Download size={18} /> Company Profile
            </button>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-16 text-center text-sm text-gray-500 border-t border-gray-300 pt-6">
        © {new Date().getFullYear()} PT. Java Konsul Utama. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
