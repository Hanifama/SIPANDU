import React from "react";
import { MapPin, Phone, Mail, MessageSquareText } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#f7f9fc] to-[#e2e8f0]">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami!
          </p>
        </div>

        {/* Grid: Map & Contact Info + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Map & Info */}
          <div className="space-y-10">
            {/* Google Map */}
            <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200">
              <iframe
                className="w-full h-72 md:h-80"
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3083.9164387458745!2d107.63166407024478!3d-6.936521847830077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPT%20java%20konsul%20utama!5e1!3m2!1sid!2sid!4v1750993868317!5m2!1sid!2sid"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Info List */}
            <div className="space-y-6">
              <ContactInfo
                icon={<MapPin />}
                label="Kantor"
                text="Jl Pasopati RT. 002/003, Madalasari, Cikancung, Kab Bandung, Jawa Barat"
              />
              <ContactInfo
                icon={<MapPin />}
                label="Studio"
                text="Jl Hasan Saputra IV No. 20, Turangga, Lengkong, Kota Bandung, Jawa Barat"
              />
              <ContactInfo icon={<Phone />} text="+62 811 2497 999" />
              <ContactInfo icon={<Mail />} text="javakonsulutama@gmail.com" />
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-center items-center text-center space-y-6">
            <div className="bg-blue-100 rounded-full p-6 shadow-md">
              <MessageSquareText className="w-32 h-32 text-blue-700" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800">Ingin ngobrol langsung?</h3>
            <p className="text-gray-600">
              Klik tombol di bawah ini untuk menghubungi tim kami secara langsung melalui WhatsApp atau email.
            </p>

            <div className="flex flex-col space-y-4 w-full">
              <a
                href="https://wa.me/628112497999"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-all shadow-md"
              >
                Chat via WhatsApp
              </a>
              <a
                href="mailto:javakonsulutama@gmail.com"
                className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-all shadow-md"
              >
                Kirim Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactInfoProps {
  icon: React.ReactNode;
  label?: string;
  text: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, text }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-white/70 backdrop-blur p-2 rounded-full shadow-sm text-blue-700">
        {icon}
      </div>
      <p className="text-gray-600">
        {label && <span className="font-semibold text-gray-800">{label}: </span>}
        {text}
      </p>
    </div>
  );
};

export default ContactSection;
