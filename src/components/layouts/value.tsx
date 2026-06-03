import React from "react";
import { Rocket, Handshake, Leaf, Lightbulb, Target, TrendingUp } from "lucide-react";

type ValueProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const ValueCard: React.FC<ValueProps> = ({ icon, title, description, color }) => {
  return (
    <div className="flex items-start gap-4">
      <span className={`text-4xl ${color} transition-transform duration-300 hover:scale-110`}>
        {icon}
      </span>
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const CompanyValues: React.FC = () => {
  const values: ValueProps[] = [
    { icon: <Rocket className="w-10 h-10" />, title: "Innovation", description: "Kami selalu mencari cara baru untuk berinovasi dan memberikan solusi terbaik.", color: "text-blue-600" },
    { icon: <Handshake className="w-10 h-10" />, title: "Integrity", description: "Kejujuran dan transparansi menjadi fondasi dalam setiap keputusan yang kami buat.", color: "text-green-600" },
    { icon: <Leaf className="w-10 h-10" />, title: "Sustainability", description: "Kami berkomitmen pada praktik bisnis yang berkelanjutan untuk masa depan yang lebih baik.", color: "text-yellow-500" },
    { icon: <Lightbulb className="w-10 h-10" />, title: "Creativity", description: "Kreativitas adalah kunci dalam setiap proyek yang kami lakukan.", color: "text-red-500" },
    { icon: <Target className="w-10 h-10" />, title: "Excellence", description: "Kami selalu berusaha memberikan yang terbaik dalam setiap layanan dan produk.", color: "text-purple-600" },
    { icon: <TrendingUp className="w-10 h-10" />, title: "Growth", description: "Kami mendukung pertumbuhan individu dan perusahaan secara berkelanjutan.", color: "text-cyan-600" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Landasan Kami dalam Berkarya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
