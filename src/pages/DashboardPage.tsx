import { useEffect, useRef } from "react";
import {
  ServerCog,
  Folder,
  Image,
  Users,
} from "lucide-react";

import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import InfoCard from "../components/dashboard/_shared/InfoCard";
import CustomTable from "../components/dashboard/_shared/CustomTable";

import { useServiceStore } from "../store/useFeatureStore";
import { useGalleryStore } from "../store/useGalleryStore";
import { usePortfolioStore } from "../store/usePortfolioStore";

const columnsService = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Nama Layanan", minWidth: 150 },
  { id: "tagline", label: "Tagline", minWidth: 150 },
];

const columnsGalleries = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "title", label: "Judul", minWidth: 150 },
  { id: "created_dt", label: "Dibuat Pada", minWidth: 150 },
];

const columnsPortfolio = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "project", label: "Project Name", minWidth: 150 },
  { id: "team", label: "Team", minWidth: 100 },
];

const DashboardPage = () => {
  const isFetchedRef = useRef(false);

  const { services, fetchServices } = useServiceStore();
  const { galleries, fetchGalleries } = useGalleryStore();
  const { portfolios, fetchPortfolios } = usePortfolioStore();

  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchServices();
      fetchGalleries();
      fetchPortfolios();
      isFetchedRef.current = true;
    }
  }, []);

  const rowsService = services.map((service, index) => ({
    service_id: service.service_id,
    no: index + 1,
    name: service.name,
    tagline: service.tagline,
    package_1_price: `Rp ${service.package_1_price?.toLocaleString("id-ID") || "-"}`,
  }));

  const rowsGalleries = galleries.map((gallery, index) => ({
    no: index + 1,
    title: gallery.name,
    created_dt: gallery.created_dt,
  }));

  const rowsPortfolio = portfolios.map((item, index) => ({
    portfolio_id: item.portfolio_id,
    no: index + 1,
    project: item.name,
    team: item.team || "-",
  }));

  return (
    <DashboardLayout>
      {/* Cards hide dulu */}
      {false && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <InfoCard
            title="Total Layanan"
            value={services.length.toString()}
            color="blue"
            icon={<ServerCog size={24} />}
          />
          <InfoCard
            title="Portfolio"
            value={portfolios.length.toString()}
            color="green"
            icon={<Folder size={24} />}
          />
          <InfoCard
            title="Galeri"
            value={galleries.length.toString()}
            color="purple"
            icon={<Image size={24} />}
          />
          <InfoCard
            title="Users"
            value="3"
            color="red"
            icon={<Users size={24} />}
          />
        </div>
      )}

      <div className="space-y-10">
        <CustomTable
          title="Daftar Layanan"
          columns={columnsService}
          rows={rowsService}
          isLoading={false}
        />

        <CustomTable
          title="Daftar Galeri"
          columns={columnsGalleries}
          rows={rowsGalleries}
          isLoading={false}
        />

        <CustomTable
          title="Daftar Portfolio"
          columns={columnsPortfolio}
          rows={rowsPortfolio}
          isLoading={false}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
