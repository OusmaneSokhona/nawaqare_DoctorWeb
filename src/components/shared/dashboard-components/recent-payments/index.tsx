import React from "react";
import { Icon } from "@iconify/react";
import { Typography } from "../../typography";

type AppointmentStatus = "Paid" | "NotPaid";

interface Appointment {
  id: number;
  patient: string;
  date: string;
  status: AppointmentStatus;
}

const appointments: Appointment[] = [
  { id: 1, patient: "Aslam Ali", date: "1/09/2025", status: "Paid" },
  { id: 2, patient: "Seher shah", date: "1/09/2025", status: "NotPaid" },
  { id: 3, patient: "John", date: "1/09/2025", status: "Paid" },
  { id: 4, patient: "Seher shah", date: "1/09/2025", status: "Paid" },
  { id: 5, patient: "Aslam Ali", date: "1/09/2025", status: "NotPaid" },
];

const statusStyles: Record<AppointmentStatus, { icon: string; color: string }> =
  {
    Paid: {
      icon: "material-symbols--cloud-done-outline",
      color: "text-secondary-color",
    },
    NotPaid: { icon: "majesticons--restricted", color: "text-tertiary-color" },
  };

const RecentPayments: React.FC = () => {
  return (
    <div className="">
      <Typography size="h5" as="h5" className="pb-5">
        Recent Payments
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
            // console.log(icon);

            return (
              <tr key={id} className="text-desc-color">
                <td className="py-4 px-10 max-sm:px-0 text-start">{patient}</td>
                <td className="py-4 text-xs">{date}</td>
                <td className={`py-4 flex items-center gap-2 ${color}`}>
                  <Icon
                    icon={icon}
                    width={15}
                    height={15}
                    className={`${color}`}
                  />
                  <span className={`text-xs ${color}`}>{status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default RecentPayments;
