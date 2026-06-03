import { Briefcase, Handshake, Star } from "lucide-react";
import React from "react";

const CompanyProfile: React.FC = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-between px-4 sm:px-6 md:px-10 py-8 md:py-16 gap-10">
      {/* Profile Perusahaan */}
      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-1">Profil Perusahaan</h3>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">PT Java Konsul Utama</h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <p className="border-b pb-2">
              <strong>Nama Perusahaan:</strong> PT Java Konsul Utama
            </p>
            <p className="border-b pb-2">
              <strong>Bidang Usaha:</strong> Jasa Konsultan Teknik
            </p>
            <p className="border-b pb-2">
              <strong>Berdiri Sejak:</strong> 2013
            </p>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg shadow-md text-center">
            <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-green-600">9+</p>
            <p className="text-sm sm:text-base text-gray-700">Tahun Pengalaman</p>
          </div>
          <div className="p-4 rounded-lg shadow-md text-center">
            <Handshake className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">650+</p>
            <p className="text-sm sm:text-base text-gray-700">Dipercaya lebih dari 650 Klien</p>
          </div>
          <div className="p-4 rounded-lg shadow-md text-center">
            <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">4.9</p>
            <p className="text-sm sm:text-base text-gray-700">Klien Kami Merasa Puas</p>
          </div>
        </div>
      </div>

      {/* Sepatah Kata */}
      <div className="w-full md:w-1/2 text-justify space-y-4 max-w-prose">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center md:text-left">
          Sepatah Kata Dari Kami
        </h2>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Pembangunan bangsa Indonesia sejalan dengan situasi ekonomi, politik, dan keamanan yang belum stabil,
          yang dialami hampir semua perusahaan jasa konstruksi saat ini. Kami yakin bahwa pembangunan di setiap
          aspek prioritas pembangunan bangsa yang dilakukan oleh pemerintah harus dimulai dengan perencanaan yang
          matang, komprehensif, serta berkualitas tinggi.
        </p>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Dengan adanya pembangunan nasional, perusahaan perlu mengevaluasi kembali langkah dan strateginya,
          termasuk restrukturisasi sebagai langkah antisipatif dalam menghadapi berbagai kendala yang semakin kompleks.
          Hal inilah yang menuntun kami di <strong>Java Konsul</strong> untuk berkembang menjadi perusahaan
          <strong> Persero Terbatas (PT)</strong> dengan nama <strong>PT Java Konsul Utama</strong>.
        </p>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          PT Java Konsul Utama didirikan oleh tenaga ahli profesional muda serta senior yang handal dengan berbagai
          pengalaman, untuk mengembangkan profesi konsultan sebagai bentuk kepedulian terhadap pembangunan nasional
          Republik Indonesia. Kami berharap profil perusahaan ini dapat menjadi sumber informasi yang bermanfaat
          bagi pengguna jasa dalam upaya melaksanakan program pembangunan mereka.
        </p>
      </div>
    </section>
  );
};

export default CompanyProfile;
