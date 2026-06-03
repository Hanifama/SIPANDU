import React, { useEffect, useRef } from "react";
import { useGalleryStore } from "../../store/useGalleryStore";

const GallerySection: React.FC = () => {
  const { galleries, fetchPublicGalleries, isLoading, error } = useGalleryStore();
  const isFetchedRef = useRef(false);

  // Ambil data hanya sekali saat komponen pertama dimuat
  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchPublicGalleries();
      isFetchedRef.current = true;
    }
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Judul dan deskripsi */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-800">
            Keseruan dan Karya Kami
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-3 lg:mt-4 text-base sm:text-lg max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto">
            Melihat lebih dekat proses, kerja keras, dan momen seru yang membentuk perjalanan kami.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-gray-500 text-sm mt-10">Memuat galeri...</div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 text-sm mt-10">
            Memuat galeri.. Belum ada galeri yang tersedia.
          </div>
        )}

        {/* Galeri Kosong */}
        {!isLoading && galleries.length === 0 && !error && (
          <div className="text-center text-gray-500 text-sm mt-10">
            Belum ada galeri yang tersedia.
          </div>
        )}

        {/* Galeri Terisi */}
        {!isLoading && galleries.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            style={{ gridAutoFlow: "dense" }}
          >
            {galleries.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300 aspect-[4/3] md:aspect-auto"
                style={{
                  ...(typeof window !== "undefined" &&
                    window.innerWidth >= 768 && {
                      gridRowEnd: `span ${index % 2 === 0 ? 2 : 3}`,
                      gridColumnEnd: `span ${index % 3 === 0 ? 2 : 1}`,
                    }),
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.alt || item.name || "Galeri"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold text-lg rounded-2xl">
                  {item.alt || item.name || "Galeri"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
