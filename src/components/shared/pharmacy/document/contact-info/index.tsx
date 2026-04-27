"use client";
import { Typography } from "@/components/shared/typography";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import SearchInput from "@/components/shared/search-bar";
import { useRouter } from "next/navigation";
import SimpleModal from "@/components/ui/modals/new-message";

const contactCard = [
  {
    title: "Sarah Wilson",
    dsc: "How did your morning routine go today? Remember to practice the breathing exercises we discussed.",
    Status: "Open",
    time: "2 hours ago",
    icon: "mdi:clock",
  },
  {
    title: "Dr. Sarah Wilson",
    dsc: "How did your morning routine go today? Remember to practice the breathing exercises we discussed.",
    Status: "Pending",
    time: "2 hours ago",
    icon: "mdi:clock",
  },
  {
    title: "Sarah Wilson",
    dsc: "How did your morning routine go today? Remember to practice the breathing exercises we discussed.",
    Status: "Close",
    time: "2 hours ago",
    icon: "mdi:clock",
  },
];

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-primary-color text-white";
    case "Pending":
      return "bg-[#F2994A] text-white";
    case "Close":
      return "bg-red text-white";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

const ContactInfo = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Typography size="h5" className="font-bold ">
        Contact
      </Typography>
      <div className="flex justify-between items-center pb-6">
        <SearchInput />
        {/* <div className='bg-primary-color rounded-xl px-6 py-3'>
                <Typography className='text-white font-semibold cursor-pointer' onClick={() => router.push('/pharmacies/new-message')}>New Message</Typography>
            </div> */}
        <div className="bg-primary-color rounded-xl px-6 py-3">
          <Typography
            className="text-white font-semibold cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            New Message
          </Typography>
        </div>
      </div>
      {contactCard.map((d, i) => (
        <div
          key={i}
          className="bg-white flex justify-between items-start border shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-xl px-3 py-6"
        >
          {/* LEFT SIDE */}
          <div className="flex gap-3">
            <Image
              src={"/assets/svg/contactImg.svg"}
              width={100}
              height={100}
              alt="prof"
            />

            <div className="space-y-3">
              {/* Title + Status */}
              <div className="flex gap-10 items-center">
                <Typography className="font-bold">{d.title}</Typography>

                {/* Normal Status Badge */}
                <button
                  className={`px-3 py-1 font-medium rounded-full ${getStatusClasses(
                    d.Status,
                  )}`}
                >
                  {d.Status}
                </button>
              </div>

              {/* Description */}
              <Typography>{d.dsc}</Typography>
            </div>
          </div>

          {/* RIGHT SIDE - Time + Clock + Pending Circle */}
          <div className="flex items-center gap-2">
            {/* Time + Icon */}
            <div className="flex items-center gap-2">
              <Icon icon={d.icon} className="text-gray-600 text-lg" />
              <Typography>{d.time}</Typography>
            </div>

            {/* Pending Counter ONLY on right side */}
            {d.Status === "Pending" && (
              <div className="w-10 h-10 rounded-full bg-primary-color text-white flex items-center justify-center text-sm font-bold">
                <Typography className="w-[6px] h-[20px]">1</Typography>
              </div>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <SimpleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(title, description) => {
            console.log("New Message =>", title, description);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ContactInfo;
