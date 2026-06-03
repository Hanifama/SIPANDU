import { useEffect, useState } from "react";
import { ArrowUpCircle } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 backdrop-blur text-blue-900 shadow-xl transition-all duration-500 hover:bg-white hover:scale-105
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}
      `}
      aria-label="Kembali ke atas"
    >
      <ArrowUpCircle className="w-6 h-6" />
    </button>
  );
}
