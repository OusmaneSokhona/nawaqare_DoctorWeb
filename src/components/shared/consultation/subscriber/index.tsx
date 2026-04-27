import React from "react";
import { Icon } from "@iconify/react";
import { Typography } from "../../typography";

//type AppointmentStatus = "Pending" | "Completed" | "Deleted";

interface Appointment {
  id: number;
  patient: string;
  date: string;
  // status: AppointmentStatus;
  expiration: string;
}

const appointments: Appointment[] = [
  { id: 1, patient: "Ph-123656", date: "1 Pack", expiration: "25-Mar-2025" },
  { id: 2, patient: "Ph-123656", date: "1 Pack", expiration: "25-Mar-2025" },
  { id: 3, patient: "Ph-123656", date: "1 Pack", expiration: "25-Mar-2025" },
  { id: 4, patient: "Ph-123656", date: "1 Pack", expiration: "25-Mar-2025" },
  { id: 5, patient: "Ph-123656", date: "1 Pack", expiration: "25-Mar-2025" },
];

// const statusStyles: Record<AppointmentStatus, { icon: string; color: string }> =
//   {
//     Pending: { icon: "mdi:clock-outline", color: "text-primary-color" },
//     Completed: {
//       icon: "mdi:check-circle-outline",
//       color: "text-secondary-color",
//     },
//     Deleted: { icon: "mdi:trash-can-outline", color: "text-tertiary-color" },
//   };

const Subscriber: React.FC = () => {
  return (
    <div className="px-4 py-10">
      {/* <Typography size="h5" as="h5" className="pb-5">
        Recent Appointments
      </Typography> */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b-[3px] border-[#374ea2]/20 ">
            <th className="pb-2 pl-10 max-sm:pl-0">Patient Id</th>
            <th className="pb-2">Remaining</th>
            <th className="pb-2">Expiration</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(({ id, patient, date, expiration }) => {
            // const { icon, color } = statusStyles[status];
            return (
              <tr key={id} className="text-desc-color">
                <td className="py-4 pl-10 max-sm:px-0">{patient}</td>
                <td className="py-4 text-xs">{date}</td>
                <td className={`py-4 flex items-center gap-2 `}>
                  {/* <Icon icon={icon} width={15} height={15} /> */}
                  <span className={` text-xs `}>{expiration}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Subscriber;
