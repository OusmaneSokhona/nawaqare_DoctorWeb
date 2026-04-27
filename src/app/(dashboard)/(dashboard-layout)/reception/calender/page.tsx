// "use client";

// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Typography } from "@/components/shared/typography";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setEditDayDrawerOpen } from "@/redux/slices/app-slice";
// import EditDayDrawer from "@/components/shared/reception/edit-drawer";
// import { availableTime } from "@/data";

// /* ---------------- TYPES ---------------- */
// type DateStatus = "available" | "unavailable" | "booked" | "exception";

// /* ---------------- HELPERS ---------------- */
// const getDaysInMonth = (year: number, month: number) =>
//   new Date(year, month + 1, 0).getDate();

// const getStartDay = (year: number, month: number) =>
//   new Date(year, month, 1).getDay();

// /* ---------------- COMPONENT ---------------- */
// export default function CalendarBooking() {
//   const dispatch = useAppDispatch();
//   const { isEditDayDrawerOpen } = useAppSelector((state) => state.app);

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [selectedDate, setSelectedDate] = useState<number | null>(null);
//   const [selectedTime, setSelectedTime] = useState("");

//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const dateStatus: Record<number, DateStatus> = {
//     3: "available",
//     5: "available",
//     7: "available",
//     10: "available",
//     12: "available",
//     14: "available",
//     15: "available",
//     17: "available",
//     19: "available",
//     21: "available",
//     24: "available",
//     26: "available",
//     28: "available",

//     4: "unavailable",
//     11: "unavailable",
//     18: "unavailable",
//     25: "unavailable",

//     6: "booked",
//     13: "booked",
//     20: "booked",
//     27: "booked",

//     8: "exception",
//     22: "exception",
//     29: "exception",
//   };

//   const availableTimes = [
//     "09:00 AM",
//     "09:30 AM",
//     "10:00 AM",
//     "10:30 AM",
//     "11:00 AM",
//     "11:30 AM",
//     "12:00 PM",
//     "12:30 PM",
//     "01:00 PM",
//   ];

//   const daysInMonth = getDaysInMonth(currentYear, currentMonth);
//   const startDay = getStartDay(currentYear, currentMonth);

//   const calendarDates: (number | null)[] = [
//     ...Array(startDay).fill(null),
//     ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
//   ];

//   while (calendarDates.length % 7 !== 0) {
//     calendarDates.push(null);
//   }

//   const isPastDate = (date: number) => {
//     const d = new Date(currentYear, currentMonth, date);
//     return d < today;
//   };

//   return (
//     <div className="px-6">
//       <Typography size="h3" className="font-bold mb-4">
//         Calendar
//       </Typography>

//       {/* Legend */}
//       <div className="flex flex-wrap gap-4 mb-6 text-lg">
//         <Legend color="bg-green-500" label="Available" />
//         <Legend color="bg-red" label="Unavailable" />
//         <Legend color="bg-gray-600" label="Booked" />
//         <Legend color="bg-orange-500" label="Exception" />
//       </div>

//       {/* MAIN FLEX LAYOUT (DESIGN SAME) */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//         {/* LEFT: CALENDAR */}
//         <div>
//           <Typography size="h6" className="pb-2">
//             Select Date
//           </Typography>

//           <div className="bg-white w-[590px] max-md:w-full shadow rounded-xl p-6">
//             {/* Month */}
//             <div className="flex items-center justify-between mb-4">
//               <button
//                 onClick={() =>
//                   currentMonth === 0
//                     ? (setCurrentYear((y) => y - 1), setCurrentMonth(11))
//                     : setCurrentMonth((m) => m - 1)
//                 }
//                 className="p-1 rounded hover:bg-gray-100"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//               </button>

//               <span className="text-sm font-semibold text-primary-color">
//                 {new Date(currentYear, currentMonth).toLocaleString("default", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </span>

//               <button
//                 onClick={() =>
//                   currentMonth === 11
//                     ? (setCurrentYear((y) => y + 1), setCurrentMonth(0))
//                     : setCurrentMonth((m) => m + 1)
//                 }
//                 className="p-1 rounded hover:bg-gray-100"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Days */}
//             <div className="grid grid-cols-7 gap-2 mb-2">
//               {daysOfWeek.map((day) => (
//                 <div
//                   key={day}
//                   className="text-center text-xs font-medium text-gray-500"
//                 >
//                   {day}
//                 </div>
//               ))}
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-7 gap-2">
//               {calendarDates.map((date, idx) => {
//                 const isPast = date ? isPastDate(date) : false;
//                 const isSelected = date === selectedDate && !isPast;

//                 return (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       if (date && !isPast) setSelectedDate(date);
//                     }}
//                     className={`aspect-square rounded-full flex items-center justify-center text-lg
//                       ${
//                         !date
//                           ? ""
//                           : isPast
//                             ? "text-gray-300 cursor-not-allowed"
//                             : isSelected
//                               ? "bg-primary-color text-white font-semibold cursor-pointer"
//                               : "cursor-pointer hover:bg-gray-200 text-gray-700"
//                       }`}
//                   >
//                     {date && (
//                       <div className="flex flex-col items-center">
//                         <span>{date}</span>

//                         {dateStatus[date] && !isPast && (
//                           <div
//                             className={`w-1 h-1 rounded-full mt-0.5 ${
//                               dateStatus[date] === "available"
//                                 ? "bg-green-500"
//                                 : dateStatus[date] === "unavailable"
//                                   ? "bg-red"
//                                   : dateStatus[date] === "booked"
//                                     ? "bg-gray-600"
//                                     : "bg-orange-500"
//                             }`}
//                           />
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="space-y-5">
//           <div className="flex items-center gap-3">
//             <Typography size={"h5"} as={"h5"}>
//               Tuesday,April 5{" "}
//             </Typography>
//             <Typography className="text-primary-color font-medium">
//               Normal
//             </Typography>
//           </div>
//           <div className="rounded-xl bg-white p-5 space-y-2">
//             <Typography size={"h6"} as={"h6"}>
//               Available Time
//             </Typography>
//             <Typography className="text-desc-color">
//               3 slot this day are 3 Available / 7 booked / 1 exception
//             </Typography>
//             <div className="flex items-center flex-wrap gap-3">
//               {availableTime.map((time, i) => (
//                 <div className="flex items-center gap-2">
//                   <div
//                     style={{
//                       backgroundColor: time.color,
//                     }}
//                     className="h-5 w-5 rounded-full"
//                   ></div>
//                   <Typography className="font-medium">{time.title}</Typography>
//                 </div>
//               ))}
//             </div>
//             <Typography className="font-medium">Time</Typography>
//             <div className="flex items-center justify-between gap-3">
//               <Typography className="text-desc-color">8:00</Typography>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//             </div>
//             <div className="flex items-center justify-between gap-3">
//               <Typography className="text-desc-color">8:00</Typography>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//             </div>
//             <div className="flex items-center justify-between gap-3">
//               <Typography className="text-desc-color">8:00</Typography>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//               <div
//                 style={{
//                   backgroundColor: "#27AE60",
//                 }}
//                 className="h-5 w-5 rounded-full"
//               ></div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT: SLOTS (SAME DESIGN) */}
//         <div>
//           <Typography size="h6">Available Times</Typography>
//           <div className="w-[590px] max-md:w-full mt-4 grid grid-cols-3 gap-3">
//             {availableTimes.map((time) => (
//               <button
//                 key={time}
//                 onClick={() => setSelectedTime(time)}
//                 className={`py-4 rounded-xl shadow text-sm font-medium
//                   ${
//                     selectedTime === time
//                       ? "bg-primary-color text-white"
//                       : "bg-white hover:bg-gray-200"
//                   }`}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* DRAWER (FUNCTIONALITY SAME AS SECOND FILE) */}
//       {isEditDayDrawerOpen && (
//         <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
//           <EditDayDrawer />
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------------- LEGEND ---------------- */
// const Legend = ({ color, label }: { color: string; label: string }) => (
//   <div className="flex items-center gap-2">
//     <div className={`w-3 h-3 rounded-full ${color}`} />
//     <span className="text-gray-700">{label}</span>
//   </div>
// );

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Typography } from "@/components/shared/typography";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEditDayDrawerOpen } from "@/redux/slices/app-slice";
import EditDayDrawer from "@/components/shared/reception/edit-drawer";
import { availableTime } from "@/data";
import { axiosClient } from "@/api/base";

/* ---------------- TYPES ---------------- */
type DateStatus = "available" | "unavailable" | "booked" | "exception";

/* ---------------- HELPERS ---------------- */
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getStartDay = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

/* ---------------- COMPONENT ---------------- */
export default function CalendarBooking() {
  const dispatch = useAppDispatch();
  const { isEditDayDrawerOpen } = useAppSelector((state) => state.app);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(
    today.getDate(),
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [apiDateStatus, setApiDateStatus] = useState<Record<number, DateStatus>>({});

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /* ---------------- LOAD REAL BOOKINGS ---------------- */
  useEffect(() => {
    axiosClient
      .get("/api/v1/bookings/doctor")
      .then((res) => {
        const data: any[] = res.data?.data ?? res.data ?? [];
        if (!Array.isArray(data) || data.length === 0) return;
        const status: Record<number, DateStatus> = {};
        data.forEach((booking: any) => {
          const date = new Date(booking.scheduled_at ?? booking.date ?? booking.created_at);
          if (
            date.getFullYear() === currentYear &&
            date.getMonth() === currentMonth
          ) {
            const day = date.getDate();
            status[day] = ["CANCELLED", "REJECTED"].includes(booking.status)
              ? "unavailable"
              : booking.status === "COMPLETED"
              ? "exception"
              : "booked";
          }
        });
        setApiDateStatus(status);
      })
      .catch(() => {});
  }, [currentYear, currentMonth]);

  /* ---------------- DATE STATUS (API or fallback mock) ---------------- */
  const MOCK_STATUS: Record<number, DateStatus> = {
    3: "available", 5: "available", 7: "available", 10: "available",
    12: "available", 14: "available", 15: "available", 17: "available",
    6: "booked", 13: "booked", 20: "booked", 27: "booked",
    4: "unavailable", 11: "unavailable", 18: "unavailable", 25: "unavailable",
    8: "exception", 22: "exception", 29: "exception",
  };

  const dateStatus: Record<number, DateStatus> =
    Object.keys(apiDateStatus).length > 0 ? apiDateStatus : MOCK_STATUS;

  /* ---------------- DYNAMIC SELECTED DATE ---------------- */
  const selectedFullDate =
    selectedDate !== null
      ? new Date(currentYear, currentMonth, selectedDate)
      : null;

  const formattedSelectedDate = selectedFullDate
    ? selectedFullDate.toLocaleDateString("default", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  const selectedStatus =
    selectedDate && dateStatus[selectedDate]
      ? dateStatus[selectedDate]
      : "available";

  /* ---------------- SLOT SUMMARY (dynamic placeholder) ---------------- */
  const slotSummary = useMemo(() => {
    return {
      available: 3,
      booked: 7,
      exception: 1,
    };
  }, [selectedDate]);

  /* ---------------- CALENDAR LOGIC ---------------- */
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDay = getStartDay(currentYear, currentMonth);

  const calendarDates: (number | null)[] = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (calendarDates.length % 7 !== 0) {
    calendarDates.push(null);
  }

  const isPastDate = (date: number) => {
    const d = new Date(currentYear, currentMonth, date);
    return d < today;
  };

  const availableTimes = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
  ];

  return (
    <div className="">
      <Typography size="h3" className="font-bold mb-4">
        Calendar
      </Typography>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-lg">
        <Legend color="bg-green-500" label="Available" />
        <Legend color="bg-red" label="Unavailable" />
        <Legend color="bg-gray-600" label="Booked" />
        <Legend color="bg-orange-500" label="Exception" />
      </div>

      {/* MAIN GRID (UNCHANGED UI) */}
      <div className="flex max-md:flex-col gap-5">
        {/* LEFT: CALENDAR */}
        <div className="basis-1/2">
          <Typography size="h6" className="pb-2">
            Select Date
          </Typography>

          <div className="bg-white w-full shadow rounded-xl p-6">
            {/* Month */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  currentMonth === 0
                    ? (setCurrentYear((y) => y - 1), setCurrentMonth(11))
                    : setCurrentMonth((m) => m - 1)
                }
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <span className="text-sm font-semibold text-primary-color">
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <button
                onClick={() =>
                  currentMonth === 11
                    ? (setCurrentYear((y) => y + 1), setCurrentMonth(0))
                    : setCurrentMonth((m) => m + 1)
                }
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDates.map((date, idx) => {
                const isPast = date ? isPastDate(date) : false;
                const isSelected = date === selectedDate && !isPast;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (date && !isPast) setSelectedDate(date);
                    }}
                    className={`aspect-square rounded-full flex items-center justify-center text-lg
                      ${
                        !date
                          ? ""
                          : isPast
                            ? "text-gray-300 cursor-not-allowed"
                            : isSelected
                              ? "bg-primary-color text-white font-semibold cursor-pointer"
                              : "cursor-pointer hover:bg-gray-200 text-gray-700"
                      }`}
                  >
                    {date && (
                      <div className="flex flex-col items-center">
                        <span>{date}</span>

                        {dateStatus[date] && !isPast && (
                          <div
                            className={`w-1 h-1 rounded-full mt-0.5 ${
                              dateStatus[date] === "available"
                                ? "bg-green-500"
                                : dateStatus[date] === "unavailable"
                                  ? "bg-red"
                                  : dateStatus[date] === "booked"
                                    ? "bg-gray-600"
                                    : "bg-orange-500"
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (UNCHANGED UI) */}
        <div className="basis-1/2 space-y-5">
          <div className="flex items-center gap-3">
            <Typography size={"h5"} as={"h5"}>
              {formattedSelectedDate}
            </Typography>
            <Typography className="text-primary-color font-medium capitalize">
              {selectedStatus === "available" ? "Normal" : selectedStatus}
            </Typography>
          </div>

          <div className="rounded-xl bg-white p-5 space-y-2">
            <Typography size={"h6"} as={"h6"}>
              Available Time
            </Typography>

            <Typography className="text-desc-color">
              {slotSummary.available} slot this day are {slotSummary.available}{" "}
              Available / {slotSummary.booked} booked / {slotSummary.exception}{" "}
              exception
            </Typography>

            <div className="flex items-center flex-wrap gap-3">
              {availableTime.map((time, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    style={{ backgroundColor: time.color }}
                    className="h-5 w-5 rounded-full"
                  ></div>
                  <Typography className="font-medium">{time.title}</Typography>
                </div>
              ))}
            </div>

            <Typography className="font-medium">Time</Typography>

            <div className="w-full mt-4 grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-4 rounded-xl shadow text-sm font-medium
                    ${
                      selectedTime === time
                        ? "bg-primary-color text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DRAWER */}
      {isEditDayDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <EditDayDrawer />
        </div>
      )}
    </div>
  );
}

/* ---------------- LEGEND ---------------- */
const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-gray-700">{label}</span>
  </div>
);
