import React from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/40"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-8"
        >
          <div className="p-5 rounded-full bg-gradient-to-br from-red-100 to-blue-100 ring-4 ring-white shadow-lg">
            <AlertTriangle className="w-14 h-14 text-red-500" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-7xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 to-red-500 text-transparent bg-clip-text tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-500 leading-relaxed mb-10">
          Oops! Sepertinya halaman yang kamu cari tidak tersedia.
        </p>

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(37,99,235,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg border border-white/30 hover:opacity-90 transition-all duration-300"
        >
          Kembali
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
