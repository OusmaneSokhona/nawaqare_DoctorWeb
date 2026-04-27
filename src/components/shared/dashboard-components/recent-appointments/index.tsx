import React from "react";
import { Icon } from "@iconify/react";
import { Typography } from "../../typography";

type AppointmentStatus = "Pending" | "Completed" | "Deleted";

interface Appointment {
  id: number;
  patient: string;
  date: string;
  status: AppointmentStatus;
}

const appointments: Appointment[] = [
  { id: 1, patient: "Aslam Ali", date: "1/09/2025", status: "Pending" },
  { id: 2, patient: "Seher shah", date: "1/09/2025", status: "Completed" },
  { id: 3, patient: "Ali", date: "1/09/2025", status: "Deleted" },
  { id: 4, patient: "Seher shah", date: "1/09/2025", status: "Completed" },
  { id: 5, patient: "Aslam Ali", date: "1/09/2025", status: "Pending" },
];

const statusStyles: Record<AppointmentStatus, { icon: string; color: string }> =
  {
    Pending: { icon: "mdi:clock-outline", color: "text-primary-color" },
    Completed: {
      icon: "mdi:check-circle-outline",
      color: "text-secondary-color",
    },
    Deleted: { icon: "mdi:trash-can-outline", color: "text-tertiary-color" },
  };

const RecentAppointments: React.FC = () => {
  return (
    <div className="">
      <Typography size="xl" className="pb-2 font-semibold">
        Recent Appointments
      </Typography>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b-[3px] border-[#374ea2]/20 ">
            <th className="pb-2 pl-10 max-sm:pl-0">Patients</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(({ id, patient, date, status }) => {
            const { icon, color } = statusStyles[status];
            return (
              <tr key={id} className="text-[#828282]">
                <td className="py-4 font-semibold px-10 max-sm:px-0">
                  {patient}
                </td>
                <td className="py-4 font-semibold">{date}</td>
                <td className={`py-4 flex items-center gap-2 ${color}`}>
                  <Icon icon={icon} width={15} height={15} />
                  <span className={`font-semibold ${color}`}>{status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default RecentAppointments;
