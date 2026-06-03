import React from "react";
import img from "../../assets/explore.jpg";
import { ListTodo, Compass } from "lucide-react";

const VisionMission: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Konten */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-gray-800">🌟 Visi & Misi Kami</h2>

          {/* Visi Card */}
          <div className="group bg-white/90 backdrop-blur-md border border-blue-100 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 shadow-md">
                <Compass   className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 group-hover:underline transition-all duration-200">
                Visi
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Java Konsul Utama berkomitmen dalam bekerja dan berusaha secara
              maksimal dalam memberikan layanan jasa dengan segala keahlian yang
              dibutuhkan disertai kejujuran dan totalitas dalam bekerja.
            </p>
          </div>

          {/* Misi Card */}
          <div className="group bg-white/90 backdrop-blur-md border border-rose-100 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-rose-100 text-rose-600 rounded-full p-4 shadow-md">
                <ListTodo className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-rose-700 group-hover:underline transition-all duration-200">
                Misi
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Java Konsul Utama akan memberikan warna baru dalam dunia
              jasa konsultan teknik dengan kesiapan ilmu-ilmu dari tenaga-tenaga ahli yang
              dimiliki oleh PT Java Konsul Utama yang senantiasa menjunjung tinggi etika,
              profesionalisme dan norma-norma dalam jasa konsultan sebagai wujud dari
              kesungguhan untuk ikut serta dalam pembangunan.
            </p>
          </div>
        </div>

        {/* Gambar Kiri */}
        <div className="relative">
          <img
            src={img}
            alt="Visi dan Misi"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
