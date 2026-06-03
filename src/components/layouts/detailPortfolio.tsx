import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react'

type PortfolioDetailProps = {
    image: string
    title: string
    category: string
    description: string
    date: string
    location?: string
    duration?: string
    team?: string
    cost?: string
}

const DetailPortfolio: React.FC<PortfolioDetailProps> = ({
    image,
    title,
    category,
    description,
    date,
    location = 'Tidak tersedia',
    duration = 'Tidak tersedia',
    team = 'Tidak tersedia',
    cost = 'Tidak tersedia'
}) => {
    const navigate = useNavigate()

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            
            {/* Card Judul dan Gambar */}
            <div className="flex bg-blue-700 p-6 rounded-lg shadow-lg mb-10 items-center">
                {/* Gambar */}
                <img
                    src={image}
                    alt={title}
                    className="w-1/3 h-60 object-cover rounded-lg mr-8"
                />
                {/* Judul */}
                <div className="text-white flex-1">
                    <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
                    <p className="text-lg opacity-80">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                </div>
            </div>

            {/* Info Kategori dan Tanggal */}
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                <span
                    className={`px-4 py-2 rounded-full font-medium ${category === 'sipil'
                            ? 'bg-red-100 text-red-600'
                            : category === 'teknik'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-green-100 text-green-600'
                        }`}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span>•</span>
                <span>Ditambahkan pada: {date}</span>
            </div>

            {/* Deskripsi */}
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{description}</p>

            {/* Info Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
                    <div className="flex items-center space-x-3 mb-4">
                        <MapPin className="text-blue-600" />
                        <h3 className="font-semibold text-lg">Lokasi</h3>
                    </div>
                    <p>{location}</p>
                </div>

                <div className="bg-gradient-to-r from-green-100 via-white to-green-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
                    <div className="flex items-center space-x-3 mb-4">
                        <Calendar className="text-green-600" />
                        <h3 className="font-semibold text-lg">Durasi</h3>
                    </div>
                    <p>{duration}</p>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 via-white to-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
                    <div className="flex items-center space-x-3 mb-4">
                        <Users className="text-yellow-600" />
                        <h3 className="font-semibold text-lg">Tim Pelaksana</h3>
                    </div>
                    <p>{team}</p>
                </div>

                <div className="bg-gradient-to-r from-red-100 via-white to-red-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
                    <div className="flex items-center space-x-3 mb-4">
                        <DollarSign className="text-red-600" />
                        <h3 className="font-semibold text-lg">Biaya Proyek</h3>
                    </div>
                    <p>{cost}</p>
                </div>
            </div>

            {/* Tombol Kembali */}
            <div className="text-right">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                    ← Kembali ke Portofolio
                </button>
            </div>
        </div>
    )
}

export default DetailPortfolio
