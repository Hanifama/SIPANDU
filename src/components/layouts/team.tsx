import { useState } from "react";
import organigramTeam from "../../assets/image.png";
import user from "../../assets/logo.png";

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type TeamSection = {
  id: string;
  title: string;
  members: TeamMember[];
};

const teamData: TeamSection[] = [
  {
    id: "manajemen",
    title: "Manajemen",
    members: [
      { name: "Roni Purawinata, ST., MT.", role: "Direktur Utama", image: user },
      { name: "Nama Lainnya", role: "Jabatan", image: user },
      { name: "Nama Lainnya", role: "Jabatan", image: user },
    ],
  },
  {
    id: "survey",
    title: "Surveyor",
    members: [
      { name: "Nama Surveyor", role: "Senior Surveyor", image: user },
      { name: "Nama Surveyor", role: "Senior Surveyor", image: user },
      { name: "Nama Surveyor", role: "Senior Surveyor", image: user },
    ],
  },
  {
    id: "team-leader",
    title: "Team Leader",
    members: [
      { name: "Nama Leader", role: "Project Team Leader", image: user },
      { name: "Nama Leader", role: "Project Team Leader", image: user },
    ],
  },
  {
    id: "tim-teknik",
    title: "Team Teknik",
    members: [
      { name: "Nama Teknik", role: "Teknisi", image: user },
      { name: "Nama Teknik", role: "Teknisi", image: user },
    ],
  },
];

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState<string>(teamData[0].id);
  const [isOrganigramVisible, setOrganigramVisible] = useState(true);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setOrganigramVisible(false);
  };

  return (
    <section className="p-6 md:p-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center">TEAM JAVA KONSUL UTAMA</h2>
        <p className="text-gray-600 text-center mb-8">Tim profesional kami yang siap memberikan layanan terbaik.</p>

        {isOrganigramVisible ? (
          <div className="flex justify-center">
            <img src={organigramTeam} alt="Organigram" className="rounded-lg shadow-lg w-full max-w-4xl" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Tab Navigation */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-4 md:gap-2 w-full md:w-1/4">
              {teamData.map((section) => (
                <button
                  key={section.id}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-300 border-l-4 md:border-l-0 md:border-b-4 ${activeTab === section.id
                    ? "text-blue-600 border-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-700 border-transparent hover:border-blue-300"
                    }`}
                  onClick={() => handleTabClick(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="w-full md:w-3/4">
              {teamData.map((section) => (
                <div key={section.id} className={`${activeTab === section.id ? "block" : "hidden"} transition-all`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.members.map((member, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 text-center transition-transform hover:-translate-y-1"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="mx-auto rounded-full w-24 h-24 border-4 border-blue-500 object-cover"
                        />
                        <h3 className="text-lg font-semibold mt-4 text-gray-800">{member.name}</h3>
                        <p className="text-blue-600 font-medium">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Toggle View Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setOrganigramVisible(!isOrganigramVisible)}
            className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300"
          >
            <span>
              {isOrganigramVisible ? "Kenalan Dengan Team Kami" : "Melihat Struktur Organisasi"}
            </span>
          </button>
        </div>


      </div>
    </section>
  );
};

export default TeamSection;
