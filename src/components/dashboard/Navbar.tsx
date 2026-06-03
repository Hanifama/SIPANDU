import { Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onOpen }: { onOpen: () => void }) => {
  const userName = localStorage.getItem("userName");
  const userImage = localStorage.getItem("userImage");

  const getInitial = (name: string | null | undefined) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const initial = getInitial(userName);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center gap-4">
        {/* tombol menu */}
        <button
          onClick={onOpen}
          className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* greeting */}
        <div className="flex flex-col">
          <h2 className="text-base md:text-xl font-semibold text-slate-800">
            Hallo, <span className="text-blue-800">{userName}</span> 👋
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Semoga harimu menyenangkan ✨
          </p>
        </div>
      </div>

      {/* Profile section */}
      <div className="relative" ref={dropdownRef}>
        {userImage ? (
          <img
            src={userImage}
            alt="User"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-300 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
        ) : (
          <div
            className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer ring-2 ring-blue-300 select-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {initial}
          </div>
        )}

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-gray-200 z-50 overflow-hidden">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                navigate("/profile"); // Navigasi ke halaman /profile
              }}
            >
              Profile
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
