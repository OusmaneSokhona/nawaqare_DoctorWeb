"use client";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { reveiwsTable } from "@/data";
import { Reveiws } from "@/types/dashboard";
import { Rating } from "react-simple-star-rating";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const stats = [
  {
    icon: "mdi:star-rate",
    stat: "32",
    title: "Reviews Pending Moderation",
  },
  {
    icon: "material-symbols:do-not-disturb-on-total-silence-rounded",
    stat: "20%",
    title: "Moderated This Month",
  },
  {
    icon: "ix:distribution",
    stat: "5-star",
    title: "Rating Distribution",
  },
  {
    icon: "material-symbols:published-with-changes",
    stat: "12%",
    title: "Total Published Reviews",
  },
];

const ReviewsPage = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Typography size="h3" as="h3" className="font-bold">
          All Reviews
        </Typography>
        <Typography size="lg" className="text-desc-color">
          Monitor patient feedback and service quality across consultations
        </Typography>
      </div>
      <div className="pt-5 flex flex-wrap gap-5 items-center">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-md w-[190px] h-[190px] max-md:h-auto rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
          >
            <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
              <Icon
                icon={activity.icon}
                width="24"
                height="24"
                className="text-white"
              />
            </div>
            <Typography size="h4" as="h4">
              {activity.stat}
            </Typography>
            <Typography>{activity.title}</Typography>
          </div>
        ))}
      </div>
      <DataTable
        ColumnsData={reveiwsTable.ColumnsData}
        tableRows={reveiwsTable.rowsData}
        roundedHeader={true}
        paginate={true}
        TableBodyRow={({
          id,
          patientName,
          doctorName,
          consultationType,
          comments,
          rating,
          Status,
          Date,
        }: Reveiws) => (
          <tr key={id} className={`hover:bg-white transition`}>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color break-words">
              {patientName}
            </td>

            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {doctorName}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consultationType}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {comments}
            </td>
            <td className="px-4 py-4 text-md whitespace-nowrap">
              <div className="inline-flex items-center gap-2">
                <div className="flex items-center">
                  <Rating
                    size={16}
                    initialValue={rating}
                    allowHover={false}
                    allowFraction
                    readonly
                    SVGstyle={{ display: "inline-block" }}
                  />
                </div>
                {/* <span className="text-gray-300 text-md">({rating})</span> */}
              </div>
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Date}
            </td>
            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Status === "Cancelled"
                  ? "text-red"
                  : Status === "Published"
                    ? "text-secondary-color"
                    : Status === "Draft"
                      ? "text-[#F2994A]"
                      : ""
              }`}
            >
              {Status || "-"}
            </td>
            {/* <td className="px-4 lg:px-6 py-4 text-start text-lg">
              <Icon
                icon="mdi:eye"
                width="20"
                height="20"
                className="cursor-pointer text-primary-color"
                onClick={() => router.push(`/reviews/details?id=${id}`)}
              />
            </td> */}
            <td className="px-4 lg:px-4 py-4 text-start text-lg w-[120px]">
              <div className="flex items-center gap-1">
                <Icon
                  icon="mdi:eye"
                  width="20"
                  height="20"
                  className="cursor-pointer text-primary-color"
                  onClick={() => router.push(`/reviews/details?id=${id}`)}
                />

                <div className="relative">
                  <Icon
                    className="text-primary-color cursor-pointer"
                    icon="ph:dots-three-vertical"
                    width="25"
                    height="25"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === `row-${id}` ? null : `row-${id}`,
                      )
                    }
                  />

                  {openDropdown === `row-${id}` && (
                    <div className="absolute top-6 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-48 py-2 z-20">
                      {["Approve", "Reject", "Mark Abusive", "Archive"].map(
                        (option) => (
                          <div
                            key={option}
                            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              console.log(option, id);
                              setOpenDropdown(null);
                            }}
                          >
                            {option}
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default ReviewsPage;
