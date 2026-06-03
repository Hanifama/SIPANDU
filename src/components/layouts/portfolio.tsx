import { useEffect, useRef, useState } from "react";
import { Filter, Camera, Cpu, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolioStore } from "../../store/usePortfolioStore";

const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState(3);

  const {
    portfolios,
    isLoading,
    fetchPublicPortfolios,
    error,
  } = usePortfolioStore();

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      fetchPublicPortfolios();
      isFetched.current = true;
    }
  }, []);

  const filteredPortfolio = portfolios
    .filter(item => filter === "all" || item.name === filter)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="mx-auto px-12">
        <div className="text-left">
          <h2 className="text-4xl font-bold text-blue-600">Portfolio Kami</h2>
          <p className=" text-gray-600">
            Berbagai proyek unggulan yang telah kami selesaikan dengan profesionalisme tinggi.
          </p>
        </div>

        {/* Sementara disembunyikan */}
        {false && (
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-2">
            <div className="flex items-end space-x-2">
              <input
                type="text"
                placeholder="Cari Proyek..."
                className="px-4 py-2 w-full md:w-90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition-all duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {false && (
          <div
            className={`overflow-hidden bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-500 ease-in-out ${isDropdownOpen
              ? "max-h-[300px] opacity-100 translate-y-0 scale-100"
              : "max-h-0 opacity-0 translate-y-2 scale-95"
              }`}
            style={{ transitionProperty: "max-height, opacity, transform" }}
          >
            <div className="flex flex-wrap justify-center gap-2 p-4">
              {["all", "sipil", "teknik", "manajemen"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out ${filter === category
                    ? "bg-blue-600 text-white"
                    : "text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
                    }`}
                  onClick={() => {
                    setFilter(category);
                    setIsDropdownOpen(false);
                  }}
                >
                  {category === "all"
                    ? "Semua"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          {isLoading ? (
            <p className="mt-12 text-center text-blue-600 font-semibold">Memuat data portfolio...</p>
          ) : error ? (
            <p className="mt-12 text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {filteredPortfolio.slice(0, visibleItems).map((item) => (
                  <Link
                    to={`/portfolio/${item.portfolio_id}`}
                    key={item.portfolio_id}
                    className="bg-transparent rounded-lg overflow-hidden p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl block"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center justify-start space-x-3 mb-4">
                      {item.name === "sipil" && (
                        <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <Camera className="w-6 h-6 text-red-600" />
                        </span>
                      )}
                      {item.name === "teknik" && (
                        <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-blue-600" />
                        </span>
                      )}
                      {item.name === "manajemen" && (
                        <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green-600" />
                        </span>
                      )}
                      <span className="text-sm font-semibold text-gray-500">
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                  </Link>
                ))}
              </div>

              {filteredPortfolio.length > visibleItems && (
                <div className="relative flex items-center justify-center mt-10">
                  <div className="absolute w-full h-0.5 bg-gray-300" />
                  <button
                    onClick={handleLoadMore}
                    className="relative group overflow-hidden px-6 py-2 bg-blue-800 text-white rounded-lg transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
                    <span className="relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                      Lihat Lainnya
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
