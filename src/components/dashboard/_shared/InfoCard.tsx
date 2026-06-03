import React from "react";

type InfoCardProps = {
  title: string;
  value: string | number;
  color: "blue" | "red" | "green" | "purple";
  icon: React.ReactNode;
};

const InfoCard = ({ title, value, color, icon }: InfoCardProps) => {
  const bgGradients: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    red: "from-rose-500 to-rose-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
  };

  const textColors: Record<string, string> = {
    blue: "text-blue-700",
    red: "text-rose-700",
    green: "text-emerald-700",
    purple: "text-purple-700",
  };

  return (
    <div
      className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.01] border border-gray-100`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`h-12 w-12 rounded-full bg-gradient-to-br ${bgGradients[color]} flex items-center justify-center text-white shadow`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className={`text-xl font-bold ${textColors[color]}`}>{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
