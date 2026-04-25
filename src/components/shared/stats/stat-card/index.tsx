// "use client";
// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
// } from "chart.js";
// import { Typography } from "@/components/shared/typography";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

// const StatCards = () => {
//   const cardData = [
//     {
//       title: "New patients",
//       value: "06",
//       chartData: [3, 4, 2, 5, 6, 4, 6],
//     },
//     {
//       title: "Follow-ups Rate",
//       value: "30%",
//       chartData: [20, 25, 18, 28, 30, 25, 30],
//     },
//     {
//       title: "Active patients this week",
//       value: "42",
//       chartData: [35, 38, 40, 39, 42, 40, 42],
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {cardData.map((card, idx) => (
//         <div
//           key={idx}
//           className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-between"
//         >
//           <div className="flex justify-between items-center">
//             <div className="flex flex-col items-center justify-center space-y-1">
//               <Typography size='h5' className="text-[#1F2A37] font-semibold">{card.title}</Typography>
//               <Typography className="text-xl text-desc-color font-semibold">{card.value}</Typography>
//             </div>
//           </div>
//           <div className="mt-4">
//             <Line
//               data={{
//                 labels: card.chartData.map((_, i) => i + 1),
//                 datasets: [
//                   {
//                     data: card.chartData,
//                     borderColor: "#2F80ED",
//                     backgroundColor: "rgba(79, 70, 229, 0.2)",
//                     tension: 0.3,
//                     fill: true,
//                   },
//                 ],
//               }}
//               options={{
//                 responsive: true,
//                 plugins: { legend: { display: false } },
//                 scales: {
//                   x: { display: false },
//                   y: { display: false },
//                 },
//               }}
//               height={60}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatCards;
// "use client";
// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
// } from "chart.js";
// import { Typography } from "@/components/shared/typography";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

// interface CardType {
//   title: string;
//   value: string;
//   chartData: number[];
//   borderColor?: string;
//   backgroundColor?: string;
// }

// interface StatCardsProps {
//   cardData?: CardType[];
// }

// const StatCards: React.FC<StatCardsProps> = ({ cardData }) => {
//   // Default cards if no cardData is passed
//   const defaultData: CardType[] = [
//     {
//       title: "New patients",
//       value: "06",
//       chartData: [3, 4, 2, 5, 6, 4, 6],
//       borderColor: "#2F80ED",
//       backgroundColor: "rgba(79, 70, 229, 0.2)",
//     },
//     {
//       title: "Follow-ups Rate",
//       value: "30%",
//       chartData: [20, 25, 18, 28, 30, 25, 30],
//       borderColor: "#2F80ED",
//       backgroundColor: "rgba(39, 174, 96, 0.2)",
//     },
//     {
//       title: "Active patients this week",
//       value: "42",
//       chartData: [35, 38, 40, 39, 42, 40, 42],
//       borderColor: "#2F80ED",
//       backgroundColor: "rgba(242, 153, 74, 0.2)",
//     },
//     // {
//     //   title: "Appointments Today",
//     //   value: "15",
//     //   chartData: [10, 12, 15, 14, 15, 13, 15],
//     //   borderColor: "#EB5757",
//     //   backgroundColor: "rgba(235, 87, 87, 0.2)",
//     // },
//     // {
//     //   title: "Pending Payments",
//     //   value: "$1,200",
//     //   chartData: [1000, 1050, 1200, 1150, 1200, 1180, 1200],
//     //   borderColor: "#9B51E0",
//     //   backgroundColor: "rgba(155, 81, 224, 0.2)",
//     // },
//   ];

//   const cards = cardData || defaultData;

//   return (
//     <div className="grid grid-cols-4  gap-4">
//       {cards.map((card, idx) => (
//         <div
//           key={idx}
//           className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-between"
//         >
//           <div className="flex flex-col items-center justify-center space-y-1">
//             <Typography size="h5" className="text-[#1F2A37] font-semibold">
//               {card.title}
//             </Typography>
//             <Typography className="text-xl text-desc-color font-semibold">
//               {card.value}
//             </Typography>
//           </div>
//           <div className="mt-4 w-full flex items-center justify-center">
//             <Line
//               data={{
//                 labels: card.chartData.map((_, i) => i + 1),
//                 datasets: [
//                   {
//                     data: card.chartData,
//                     borderColor: card.borderColor || "#2F80ED",
//                     backgroundColor: card.backgroundColor || "rgba(79, 70, 229, 0.2)",
//                     tension: 0.3,
//                     fill: true,
//                   },
//                 ],
//               }}
//               options={{
//                 responsive: true,
//                 plugins: { legend: { display: false } },
//                 scales: {
//                   x: { display: false },
//                   y: { display: false },
//                 },
//               }}
//               height={60}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatCards;
"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Typography } from "@/components/shared/typography";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

interface CardType {
  title: string;
  value: string;
  chartData: number[];
  borderColor?: string;
  backgroundColor?: string;
  desc?: string;
}

interface StatCardsProps {
  cardData?: CardType[];
  chartHeight?: number; // optional
}

const StatCards: React.FC<StatCardsProps> = ({
  cardData,
  chartHeight = 60,
}) => {
  // Default cards if no cardData is passed
  const defaultData: CardType[] = [
    {
      title: "New patients",
      value: "06",
      chartData: [3, 4, 2, 5, 6, 4, 6],
      borderColor: "#2F80ED",
      backgroundColor: "rgba(79, 70, 229, 0.2)",
      desc: "First consultation on the platform",
    },
    {
      title: "Follow-ups Rate",
      value: "30%",
      chartData: [20, 25, 18, 28, 30, 25, 30],
      borderColor: "#27AE60",
      backgroundColor: "rgba(39, 174, 96, 0.2)",
      desc: "Consultations with existing patients",
    },
    {
      title: "Active patients this week",
      value: "42",
      chartData: [35, 38, 40, 39, 42, 40, 42],
      borderColor: "#F2994A",
      backgroundColor: "rgba(242, 153, 74, 0.2)",
      desc: "At least one interaction during this period",
    },
    {
      title: "Repeat patients",
      value: "30 Days",
      chartData: [35, 38, 40, 39, 42, 40, 42],
      borderColor: "#F2994A",
      backgroundColor: "rgba(242, 153, 74, 0.2)",
      desc: "At least one interaction during this period",
    },
  ];

  const cards = cardData || defaultData;

  return (
    <>
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="cursor-pointer bg-white p-4 rounded-xl transform transition-transform duration-300 hover:-translate-y-2 shadow flex flex-col items-center justify-between"
        >
          <div className="flex flex-col items-center justify-center space-y-1">
            <Typography size="h5" className="text-[#1F2A37] font-semibold">
              {card.title}
            </Typography>
            <Typography className="text-xl text-desc-color font-semibold">
              {card.value}
            </Typography>
          </div>
          <div className="mt-4 w-full flex items-center justify-center">
            <Line
              data={{
                labels: card.chartData.map((_, i) => i + 1),
                datasets: [
                  {
                    data: card.chartData,
                    borderColor: card.borderColor || "#2F80ED",
                    backgroundColor:
                      card.backgroundColor || "rgba(79, 70, 229, 0.2)",
                    tension: 0.3,
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } },
              }}
              height={chartHeight}
            />
          </div>
          <Typography className="text-desc-color text-center pt-4">
            {card.desc}
          </Typography>
        </div>
      ))}
    </>
  );
};

export default StatCards;
