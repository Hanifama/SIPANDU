import img from "../assets/head.jpg"

export type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  borderColor: string;
  textColor: string;
  image: string;
  team: string;
  fullDescription: string;
  date: string;
  location: string;
  duration: string;
  cost: string;
};

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Proyek Jembatan Kota",
    description:
      "Proyek ini merupakan inisiatif strategis pemerintah daerah untuk membangun jembatan modern yang menghubungkan dua wilayah penting kota. Jembatan ini diharapkan mampu mengurangi kemacetan lalu lintas, mempersingkat waktu tempuh, serta menjadi ikon arsitektur baru di kawasan pusat kota.",
    category: "sipil",
    borderColor: "border-red-600",
    textColor: "text-red-600",
    image: img,
    team: "Tim A",
    fullDescription:
      "Proyek ini mencakup perencanaan, desain, dan pengawasan pembangunan jembatan kota yang direncanakan untuk mengurangi kemacetan lalu lintas dan meningkatkan konektivitas antara dua bagian kota.",
    date: "Januari 2023",
    location: "Jakarta, Indonesia",
    duration: "12 bulan",
    cost: "Rp 50 Miliar"
  },
  {
    id: 2,
    title: "Gedung Perkantoran",
    description:
      "Pembangunan gedung perkantoran modern dengan mengadopsi konsep smart building, hemat energi, dan ramah lingkungan. Proyek ini melibatkan tim multidisiplin yang mengintegrasikan sistem pendingin udara otomatis, kontrol cahaya pintar, dan manajemen energi berbasis IoT.",
    category: "teknik",
    borderColor: "border-blue-600",
    textColor: "text-blue-600",
    image: img,
    team: "Tim B",
    fullDescription:
      "Proyek ini bertujuan untuk membangun gedung perkantoran yang memenuhi standar internasional dengan sistem teknik canggih untuk efisiensi energi dan kenyamanan penghuninya.",
    date: "Maret 2023",
    location: "Surabaya, Indonesia",
    duration: "18 bulan",
    cost: "Rp 75 Miliar"
  },
  {
    id: 3,
    title: "Manajemen Proyek Mall",
    description:
      "Proyek ini mencakup koordinasi dan pengawasan pembangunan pusat perbelanjaan bertingkat dengan area hiburan, bioskop, food court, serta taman indoor. Dikelola dengan prinsip lean construction dan pemanfaatan software manajemen proyek untuk efisiensi maksimal.",
    category: "manajemen",
    borderColor: "border-green-600",
    textColor: "text-green-600",
    image: img,
    team: "Tim C",
    fullDescription:
      "Proyek ini melibatkan pembangunan sebuah mall besar di pusat kota, yang mencakup penyewaan ruang ritel, desain interior, dan pengelolaan seluruh proses konstruksi hingga selesai.",
    date: "Agustus 2022",
    location: "Bandung, Indonesia",
    duration: "24 bulan",
    cost: "Rp 120 Miliar"
  },
  {
    id: 4,
    title: "Renovasi Stadion Olahraga",
    description:
      "Renovasi besar-besaran terhadap stadion utama kota untuk meningkatkan kapasitas tempat duduk, fasilitas atlet, dan sistem pencahayaan. Proyek ini dirancang agar stadion siap menjadi tuan rumah untuk ajang olahraga berskala nasional maupun internasional.",
    category: "sipil",
    borderColor: "border-red-600",
    textColor: "text-red-600",
    image: img,
    team: "Tim D",
    fullDescription:
      "Renovasi stadion ini bertujuan untuk meningkatkan kapasitas dan fasilitas stadion untuk memenuhi standar internasional dalam menggelar acara olahraga skala besar.",
    date: "November 2022",
    location: "Jakarta, Indonesia",
    duration: "14 bulan",
    cost: "Rp 100 Miliar"
  },
  {
    id: 5,
    title: "Pembangunan Jaringan Telekomunikasi",
    description:
      "Implementasi jaringan kabel fiber optik di berbagai kota untuk mempercepat konektivitas digital dan mendukung transformasi digital nasional. Fokus proyek adalah pada wilayah yang belum terjangkau infrastruktur modern.",
    category: "teknik",
    borderColor: "border-blue-600",
    textColor: "text-blue-600",
    image: img,
    team: "Tim E",
    fullDescription:
      "Pembangunan jaringan fiber optik ini bertujuan untuk meningkatkan konektivitas internet dan layanan komunikasi di seluruh Indonesia.",
    date: "Juni 2023",
    location: "Surabaya, Indonesia",
    duration: "9 bulan",
    cost: "Rp 40 Miliar"
  },
  {
    id: 6,
    title: "Sistem Keamanan Gedung Perkantoran",
    description:
      "Pengadaan dan instalasi sistem keamanan canggih berbasis kamera pengawas, sensor gerak, dan akses pintu otomatis di gedung perkantoran pusat. Sistem ini juga terintegrasi dengan pemantauan jarak jauh melalui aplikasi mobile.",
    category: "teknik",
    borderColor: "border-blue-600",
    textColor: "text-blue-600",
    image: img,
    team: "Tim F",
    fullDescription:
      "Proyek ini melibatkan instalasi sistem keamanan terbaru untuk memastikan perlindungan maksimal bagi penghuni gedung dan aset yang ada di dalamnya.",
    date: "Desember 2022",
    location: "Jakarta, Indonesia",
    duration: "6 bulan",
    cost: "Rp 25 Miliar"
  }
];
