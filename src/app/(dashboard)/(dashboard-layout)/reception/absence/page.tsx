// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const DeclareAbsenceForm = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [period, setPeriod] = useState<string>("Nov 1 - Nov 3");
//   const [reason, setReason] = useState<string>("Vacation");
//   const [scope, setScope] = useState<string>("all");
//   const [notify, setNotify] = useState<boolean>(false);

//   return (
//     <div className=" p-6 rounded-lg space-y-6">
//       <div className="flex justify-between items-center">
//         <Typography size="h5" className="font-semibold">
//           Select Date
//         </Typography>
//         <Button className="bg-primary-color text-white rounded-lg  px-4">
//           Declare Absence
//         </Button>
//       </div>

//       {/* Calendar */}
//       <div className=" rounded-lg ">
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           inline
//         />
//       </div>

//       {/* Period */}
//       <div>
//         <Typography className="font-semibold mb-2">Period</Typography>
//         <input
//           type="text"
//           value={period}
//           onChange={(e) => setPeriod(e.target.value)}
//           className="w-full rounded-lg border border-gray-300 p-2"
//         />
//       </div>

//       {/* Reason */}
//       <div>
//         <Typography className="font-semibold mb-2">Reason</Typography>
//         <select
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           className="w-full rounded-lg border border-gray-300 p-2"
//         >
//           <option value="Vacation">Vacation</option>
//           <option value="Sick">Sick</option>
//           <option value="Personal">Personal</option>
//         </select>
//       </div>

//       {/* Scope */}
//       <div>
//         <Typography className="font-semibold mb-2">Scope</Typography>
//         <div className="flex flex-col gap-2">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="scope"
//               value="all"
//               checked={scope === "all"}
//               onChange={(e) => setScope(e.target.value)}
//               className="accent-primary-color"
//             />
//             All services
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="scope"
//               value="specific"
//               checked={scope === "specific"}
//               onChange={(e) => setScope(e.target.value)}
//               className="accent-primary-color"
//             />
//             Specific
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={notify}
//               onChange={(e) => setNotify(e.target.checked)}
//               className="accent-primary-color"
//             />
//             Notify affected patients
//           </label>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex justify-end gap-3">
//         <Button className="bg-gray-300 text-gray-700 rounded-lg px-4">
//           Cancel
//         </Button>
//         <Button className="bg-primary-color text-white rounded-lg px-4">
//           Save
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DeclareAbsenceForm;
"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

/* ---------- HELPERS ---------- */
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getStartDay = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

/* ---------- COMPONENT ---------- */
const DeclareAbsenceForm = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [period, setPeriod] = useState("Nov 1 - Nov 3");
  const [reason, setReason] = useState("Vacation");
  const [scope, setScope] = useState("all");
  const [notify, setNotify] = useState(false);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  return (
    <div className="p-6 rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <Typography size="h5" className="font-semibold">
          Select Date
        </Typography>
        <Button className="bg-primary-color text-white rounded-lg px-4">
          Declare Absence
        </Button>
      </div>

      {/* -------- CALENDAR -------- */}
      <div className="bg-white shadow rounded-xl p-6 w-[590px] max-md:w-full">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() =>
              currentMonth === 0
                ? (setCurrentYear((y) => y - 1), setCurrentMonth(11))
                : setCurrentMonth((m) => m - 1)
            }
          >
            <ChevronLeft />
          </button>

          <span className="font-semibold text-primary-color">
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
          >
            <ChevronRight />
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
            const isSelected = date === selectedDate;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (date && !isPast) setSelectedDate(date);
                }}
                className={`aspect-square rounded-full flex items-center justify-center text-sm
                  ${
                    !date
                      ? ""
                      : isPast
                        ? "text-gray-300 cursor-not-allowed"
                        : isSelected
                          ? "bg-primary-color text-white font-semibold"
                          : "cursor-pointer hover:bg-gray-200"
                  }`}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------- FORM FIELDS -------- */}
      <div>
        <Typography className="font-semibold mb-2">Period</Typography>
        <input
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="w-full border rounded-lg p-4"
        />
      </div>

      <div>
        <Typography className="font-semibold mb-2">Reason</Typography>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg p-4"
        >
          <option>Vacation</option>
          <option>Sick</option>
          <option>Personal</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={scope === "all"}
            onChange={() => setScope("all")}
            className="accent-primary-color"
          />
          All services
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={scope === "specific"}
            onChange={() => setScope("specific")}
            className="accent-primary-color"
          />
          Specific
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="accent-primary-color"
          />
          Notify affected patients
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <Button className="bg-gray-300 text-gray-700 rounded-xl w-[10%] max-md:w-full">
          Cancel
        </Button>
        <Button className="bg-primary-color text-white rounded-xl w-[10%] max-md:w-full">
          Save
        </Button>
      </div>
    </div>
  );
};

export default DeclareAbsenceForm;
