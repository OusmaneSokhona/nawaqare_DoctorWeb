"use client";
import { Typography } from "@/components/shared/typography";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ConsultationsCharts = () => {
  // Donut Chart Data
  const consultationData = [
    { name: "First Consultation", value: 300 },
    { name: "Follow-up", value: 200 },
    { name: "Urgent", value: 150 },
    { name: "Telemedicine", value: 120 },
  ];

  // Pie colors
  const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3"];

  // Remote vs In-person Data
  const remoteData = [
    { name: "Remote", value: 400 },
    { name: "In-person", value: 200 },
  ];

  const COLORS2 = ["#4285F4", "#FFA726"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Donut Chart */}
      <div className="bg-white p-5 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <Typography size="h4" as="h4" className="mb-3">
          Consultations by type
        </Typography>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={consultationData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {consultationData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Remote vs In-person Chart */}
      <div className="bg-white p-5 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <Typography size="h4" as="h4" className="mb-3">
          Remote vs In-person
        </Typography>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={remoteData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >
              {remoteData.map((_, index) => (
                <Cell key={index} fill={COLORS2[index % COLORS2.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsultationsCharts;
