import React from "react";

interface BannerProps {
  imageUrl: string;
  altText?: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, altText = "Banner Image" }) => {
  return (
    <section className="relative w-full flex items-center justify-center px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <div className="relative w-full max-w-7xl overflow-hidden rounded-xl sm:rounded-2xl shadow-xl">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-[180px] sm:h-[280px] md:h-[400px] object-cover rounded-xl"
        />
      </div>
    </section>
  );
};

export default Banner;
