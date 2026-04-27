// "use client";
// import { useState } from "react";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const appointments = Array(3).fill({
//   name: "Mr. Alex",
//   date: "Sunday, 12 June",
//   time: "11:30 AM",
//   duration: "10 min",
//   status: "Ready",
// });

// export default function DoctorDashboard() {
//   const [selectedFilter, setSelectedFilter] = useState("Today");
//   const [selectedType, setSelectedType] = useState("Video");
//   const router = useRouter();

//   const filters = ["Today", "Tomorrow", "This Week"];
//   const types = ["Video", "In person", "Home Visit"];

//   return (
//     <div className="">
//       <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT: AGENDA */}
//         <div className="lg:col-span-2 ">
//           <div className="mb-4 space-y-3">
//             <Typography size="h5" className="text-[#2C2C2C]">
//               Upcoming Agenda
//             </Typography>

//             {/* <div>
//               <div className="flex gap-2 bg-[#DEE1F3] max-md:mt-3 p-1 rounded-lg max-sm:w-full max-sm:justify-between text-xl">
//                 {filters.map((filter) => (
//                   <FilterBtn
//                     key={filter}
//                     label={filter}
//                     active={selectedFilter === filter}
//                     onClick={() => setSelectedFilter(filter)}
//                   />
//                 ))}
//               </div>
//               <div className="flex gap-4 bg-[#DEE1F3] p-1 rounded-lg text-xl justify-between sm:w-[285px] mb-4">
//                 {types.map((type) => (
//                   <Chip
//                     key={type}
//                     label={type}
//                     active={selectedType === type}
//                     onClick={() => setSelectedType(type)}
//                   />
//                 ))}
//               </div>
//             </div> */}
//             <div className="bg-[#DEE1F3] max-md:mt-3 p-2 rounded-lg md:max-w-fit flex max-md:flex-col gap-2">
//               {/* Primary / Dominant Time Filter */}
//               <div className="flex gap-2 justify-between flex-wrap">
//                 {filters.map((filter) => (
//                   <button
//                     key={filter}
//                     onClick={() => setSelectedFilter(filter)}
//                     className={`px-3 py-1.5 font-semibold rounded-lg text-md transition-colors duration-200
//           ${selectedFilter === filter ? "bg-white text-black shadow" : "bg-transparent text-gray-500 hover:bg-white/50"}
//         `}
//                   >
//                     {filter}
//                   </button>
//                 ))}
//               </div>

//               {/* Secondary / Lighter Type Filter */}
//               <div className="flex gap-2 justify-between flex-wrap">
//                 {types.map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setSelectedType(type)}
//                     className={`px-3 py-1 rounded-lg text-md border border-gray-300 transition-colors duration-200
//           ${selectedType === type ? "bg-white text-black" : "bg-transparent text-gray-500 hover:bg-white/30"}
//         `}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4 bg-white rounded-lg max-md:p-2 p-4 shadow shadow-[#2F80ED]">
//             {appointments.map((a, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between max-md:flex-col max-md:items-start gap-3
//     transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg
//     border-b rounded-lg p-4"
//               >
//                 {/* Left Side */}
//                 <div className="flex items-center max-md:items-start gap-4">
//                   <Image
//                     src="/assets/svg/sehrImg2.svg"
//                     alt="avatar"
//                     width={80}
//                     height={80}
//                     className="rounded-full"
//                   />

//                   <div>
//                     <p className="font-medium text-lg">{a.name}</p>

//                     <div className="flex flex-wrap items-center gap-4 text-gray-500 text-md mt-1">
//                       <div className="flex items-center gap-1">
//                         <Icon
//                           icon="uil:calendar"
//                           width={18}
//                           height={18}
//                           className="text-primary-color"
//                         />
//                         <span>{a.date}</span>
//                       </div>

//                       <div className="flex items-center gap-1">
//                         <Icon
//                           icon="mdi:clock-outline"
//                           width={18}
//                           height={18}
//                           className="text-primary-color"
//                         />
//                         <span>{a.time}</span>
//                       </div>

//                       <div className="flex items-center gap-1">
//                         <Icon
//                           icon="mingcute:phone-call-line"
//                           width={18}
//                           height={18}
//                           className="text-primary-color"
//                         />
//                         <span>{a.status}</span>
//                       </div>

//                       <div className="flex items-center gap-1">
//                         <Icon
//                           icon="mdi:clock-outline"
//                           width={18}
//                           height={18}
//                           className="text-primary-color"
//                         />
//                         <span>{a.duration}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => router.push("/bookings/details")}
//                   className="px-5 py-2 text-md rounded-full bg-primary-color text-white"
//                 >
//                   View Detail
//                 </button>
//               </div>
//             ))}

//             <p className="text-end font-semibold text-lg text-primary-color underline mt-4 pb-6 cursor-pointer">
//               View full appointment
//             </p>
//           </div>
//         </div>

//         {/* RIGHT SIDE remains EXACTLY SAME */}
//         {/* RIGHT: ALERTS & ACTIVITY */}
//         <div className="space-y-6 ">
//           {/* <Card title="Alerts" link className='bg-white rounded-xl p-5'>
//             <AlertItem text="Prescription pending pharmacy validation" />
//             <AlertItem text="Document rejected" />
//             <AlertItem text="Patient waiting too long" />
//           </Card> */}
//           <div>
//             <div className="flex items-center justify-between">
//               <Typography size="h5" className="text-[#2C2C2C]">
//                 Alerts
//               </Typography>
//               <Typography className="text-primary-color cursor-pointer font-medium text-xl underline">
//                 View All
//               </Typography>
//             </div>
//             <div
//               className="bg-white  transition-all duration-300 ease-out
//   hover:-translate-y-2 hover:shadow-lg space-y-3 rounded-lg  mt-3 p-5"
//             >
//               <div>
//                 <div className="flex gap-2 items-start">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mingcute:phone-call-line"
//                     width={24}
//                     height={24}
//                   />
//                   <div className="flex flex-col">
//                     <Typography className="text-[#2C2C2C] text-xl leading-tight">
//                       Prescription pending pharmacy validation
//                     </Typography>
//                     <Typography className="text-primary-color font-medium text-lg underline">
//                       Review
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex gap-3 items-start">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mingcute:phone-call-line"
//                     width={20}
//                     height={20}
//                   />
//                   <div className="flex flex-col">
//                     <Typography className="text-[#2C2C2C]  text-xl leading-tight">
//                       Document rejected
//                     </Typography>
//                     <Typography className="text-primary-color font-medium text-md underline">
//                       view
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex gap-3 items-start">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mingcute:phone-call-line"
//                     width={20}
//                     height={20}
//                   />
//                   <div className="flex flex-col">
//                     <Typography className="text-[#2C2C2C]  text-xl leading-tight">
//                       Patient waiting too long
//                     </Typography>
//                     <Typography className="text-primary-color font-medium text-md underline">
//                       view
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* <Card title="Recent Activity">
//             <ActivityItem text="Mr. Alex joined call" time="09:15 AM" />
//             <ActivityItem text="Ordnance sent to pharmacy" time="09:15 AM" />
//             <ActivityItem text="Payment confirmed by patient" time="09:15 AM" />
//           </Card> */}
//           <div>
//             <div className="flex items-center justify-between">
//               <Typography size="h5" className="text-[#2C2C2C]">
//                 Recent Activity
//               </Typography>
//               <Typography className="text-primary-color cursor-pointer font-medium text-xl underline">
//                 View All
//               </Typography>
//             </div>
//             <div
//               className="bg-white transition-all mt-5 duration-300 ease-out
//             hover:-translate-y-2 hover:shadow-lg space-y-3 rounded-lg p-5"
//             >
//               <div>
//                 <div className="flex gap-3 items-start">
//                   <Icon
//                     className="text-primary-color mt-1"
//                     icon="mingcute:phone-call-line"
//                     width={20}
//                     height={20}
//                   />
//                   <div>
//                     <Typography className="text-[#2C2C2C]  text-xl">
//                       Mr. Alex joined call
//                     </Typography>
//                     <Typography className="text-desc-color font-medium">
//                       20 Sep, 2025, 09:15 AM
//                     </Typography>
//                     <Typography className="text-primary-color text-sm underline underline-offset-4 cursor-pointer">
//                       View
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex gap-3 items-start">
//                   <Icon
//                     className="text-primary-color mt-1"
//                     icon="healthicons:rx-outline"
//                     width={20}
//                     height={20}
//                   />
//                   <div>
//                     <Typography className="text-[#2C2C2C]  text-xl">
//                       Ordonnance sent to pharmacy
//                     </Typography>
//                     <Typography className="text-desc-color font-medium">
//                       20 Sep, 2025, 09:15 AM
//                     </Typography>
//                     <Typography className="text-primary-color text-sm underline underline-offset-4 cursor-pointer">
//                       View
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex gap-3 items-start">
//                   <Icon
//                     className="text-primary-color mt-1"
//                     icon="fluent:payment-32-regular"
//                     width={20}
//                     height={20}
//                   />
//                   <div>
//                     <Typography className="text-[#2C2C2C]  text-xl">
//                       Payment confirmed by patient
//                     </Typography>
//                     <Typography className="text-desc-color font-medium">
//                       20 Sep, 2025, 09:15 AM
//                     </Typography>
//                     <Typography className="text-primary-color text-sm underline underline-offset-4 cursor-pointer">
//                       View
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function FilterBtn({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-2 font-semibold py-1 rounded-lg text-md ${
//         active ? "bg-white text" : "text-gray-500"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// function Chip({ label, active, onClick }) {
//   return (
//     <span
//       onClick={onClick}
//       className={`px-2 py-1 rounded-lg text-md cursor-pointer ${
//         active ? "bg-white text-" : "text-gray-500"
//       }`}
//     >
//       {label}
//     </span>
//   );
// }

"use client";
import { useState, useMemo } from "react";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ---------------- MOCK DATA ---------------- */

const appointments = [
  {
    id: 1,
    name: "Mr. Alex",
    date: new Date(),
    time: "11:30 AM",
    duration: "10 min",
    status: "Ready",
    type: "Video",
  },
  {
    id: 4,
    name: "Mr. Alex",
    date: new Date(),
    time: "11:30 AM",
    duration: "10 min",
    status: "Ready",
    type: "Video",
  },
  {
    id: 5,
    name: "Mr. Alex",
    date: new Date(),
    time: "11:30 AM",
    duration: "10 min",
    status: "Ready",
    type: "Video",
  },
  {
    id: 2,
    name: "Mr. John",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "01:00 PM",
    duration: "15 min",
    status: "Pending",
    type: "In person",
  },
  {
    id: 3,
    name: "Mrs. Emma",
    date: new Date(new Date().setDate(new Date().getDate() + 4)),
    time: "09:00 AM",
    duration: "20 min",
    status: "Ready",
    type: "Home Visit",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function DoctorDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [selectedType, setSelectedType] = useState("Video");
  const router = useRouter();

  const filters = ["Today", "Tomorrow", "This Week"];
  const types = ["Video", "In person", "Home Visit"];

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredAppointments = useMemo(() => {
    const today = new Date();

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);

      const isToday = appointmentDate.toDateString() === today.toDateString();

      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const isTomorrow =
        appointmentDate.toDateString() === tomorrow.toDateString();

      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const isThisWeek =
        appointmentDate >= today && appointmentDate <= nextWeek;

      const matchesTime =
        (selectedFilter === "Today" && isToday) ||
        (selectedFilter === "Tomorrow" && isTomorrow) ||
        (selectedFilter === "This Week" && isThisWeek);

      const matchesType = appointment.type === selectedType;

      return matchesTime && matchesType;
    });
  }, [selectedFilter, selectedType]);

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= LEFT SIDE ================= */}
      <div className="lg:col-span-2">
        <div className="mb-4 space-y-3">
          <Typography size="h5" className="text-[#2C2C2C]">
            Upcoming Agenda
          </Typography>

          {/* FILTER BLOCK */}
          <div className="bg-[#dee1f4] p-2 rounded-lg flex max-sm:flex-col gap-2 md:max-w-fit">
            {/* Time Filter */}
            <div className="flex gap-2 flex-wrap max-sm:justify-between">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 font-semibold rounded-lg text-md transition
                  ${
                    selectedFilter === filter
                      ? "bg-white text-black shadow"
                      : "text-gray-500 hover:bg-white/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap max-sm:justify-between">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-lg text-md border border-gray-300 transition
                  ${
                    selectedType === type
                      ? "bg-white text-black"
                      : "text-gray-500 hover:bg-white/30"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* APPOINTMENTS */}
        <div className="space-y-4 bg-white rounded-lg p-4 shadow shadow-[#2F80ED]">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between max-md:flex-col max-md:items-start gap-3 border-b rounded-lg p-4 hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src="/assets/svg/sehrImg2.svg"
                    alt="avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />

                  <div>
                    <p className="font-bold text-lg">{a.name}</p>

                    <div className="flex flex-wrap items-center gap-4 text-md mt-1">
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="uil:calendar"
                          width={18}
                          className="text-primary-color"
                        />
                        <span>
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(a.date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mdi:clock-outline"
                          width={18}
                          className="text-primary-color"
                        />
                        <span>{a.time}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mingcute:phone-call-line"
                          width={18}
                          className="text-primary-color"
                        />
                        <span>{a.status}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mdi:clock-outline"
                          width={18}
                          className="text-primary-color"
                        />
                        <span>{a.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/bookings/details")}
                  className="px-5 py-2 text-sm rounded-full bg-primary-color text-white"
                >
                  View Detail
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-10 text-gray-500 font-medium">
              No data found
            </div>
          )}
          <Typography
            onClick={() => router.push("/bookings")}
            className="text-primary-color underline underline-offset-4 text-end cursor-pointer"
          >
            View full appointment
          </Typography>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="space-y-6">
        {/* Alerts */}
        <div>
          <div className="flex items-center justify-between">
            <Typography size="h5" className="text-[#2C2C2C]">
              Alerts
            </Typography>
            <Typography className="text-primary-color cursor-pointer font-medium text-lg underline">
              View All
            </Typography>
          </div>

          <div className="bg-white mt-3 p-5 rounded-lg hover:shadow-lg transition space-y-4">
            {[
              "Prescription pending pharmacy validation",
              "Document rejected",
              "Patient waiting too long",
            ].map((alert, index) => (
              <div key={index} className="flex gap-3 items-start">
                <Icon
                  icon="mingcute:phone-call-line"
                  width={20}
                  className="text-primary-color mt-1"
                />
                <div>
                  <Typography className="text-[#2C2C2C] font-medium text-lg">
                    {alert}
                  </Typography>
                  <Typography className="text-primary-color text-sm underline cursor-pointer">
                    Review
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between">
            <Typography size="h5" className="text-[#2C2C2C]">
              Recent Activity
            </Typography>
            <Typography className="text-primary-color cursor-pointer font-medium text-lg underline">
              View All
            </Typography>
          </div>

          <div className="bg-white mt-3 p-5 rounded-lg hover:shadow-lg transition space-y-4">
            {[
              "Mr. Alex joined call",
              "Ordonnance sent to pharmacy",
              "Payment confirmed by patient",
            ].map((activity, index) => (
              <div key={index} className="flex gap-3 items-start">
                <Icon
                  icon="mingcute:phone-call-line"
                  width={20}
                  className="text-primary-color mt-1"
                />
                <div>
                  <Typography className="text-[#2C2C2C] font-medium text-lg">
                    {activity}
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    20 Sep, 2025, 09:15 AM
                  </Typography>
                  <Typography className="text-primary-color text-sm underline cursor-pointer">
                    View
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
