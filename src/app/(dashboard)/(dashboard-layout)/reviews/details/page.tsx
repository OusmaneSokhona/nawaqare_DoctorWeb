"use client";

import React, { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { contactusTable, reveiwsTable } from "@/data";
import { ContactUs, Reveiws } from "@/types/dashboard";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/shared/button";
import CustomDropdown from "@/components/shared/custom-dropdown";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import ReviewStepper from "@/components/shared/review/review-stepper";
import InternalModal from "@/components/ui/modals/internal-notes";

const ReviewsDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   const contact = (reveiwsTable.rowsData as Reveiws[]).find(
  //     (item) => item?.id?.toString() === id
  //   );
  const contact = (reveiwsTable.rowsData as unknown as Reveiws[])
    .map((item) => ({
      ...item,
      comments: Number(item.comments) || 0, // convert string comments to number
    }))
    .find((item) => item.id.toString() === id);

  const [assignedTo, setAssignedTo] = useState("Billing Team");
  //   const [message, setMessage] = useState(contact?.desc || ""); // Initialize with contact desc for editing

  if (!contact)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Typography as="h3" size="h3">
          No Data Found
        </Typography>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );

  // Function to get status color class dynamically
  const getStatusClass = (status: string) => {
    const lowerStatus = status?.toLowerCase().trim();
    if (lowerStatus === "published") return "bg-secondary-color";
    if (lowerStatus === "draft" || lowerStatus === "in-progress")
      return "bg-orange-400";
    if (lowerStatus === "cancelled") return "bg-red";
    if (lowerStatus === "open") return "bg-primary-color";
    return "bg-gray-400"; // Default for any unmatched status
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex max-md:items-start justify-between items-center max-md:flex-col max-md:gap-3 ">
        <div>
          <Typography as="h2" size="h3" className="font-bold text-gray-900">
            {/* Ticket #{contact.Ticket} — {contact.title} */}
            Review ID — R-10458
          </Typography>
          <Typography as="p" size="md" className="text-gray-500 mt-1">
            Date Submitted: 14 Oct 2025
          </Typography>
        </div>
        <div className="flex gap-3 items-center">
          <div
            className={`px-4 py-2 rounded-full text-lg font-medium text-white ${getStatusClass(contact.Status)}`}
          >
            {contact.Status}
          </div>
          <div className="w-[150px] h-[45px] flex items-center justify-center rounded-xl bg-primary-color">
            <Typography
              className="text-white font-bold cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Add Internal Note
            </Typography>
          </div>
        </div>
      </div>

      {/* White Section */}
      <div className="bg-white p-8  rounded-xl shadow-sm flex flex-col gap-6">
        {/* Assign To */}
        <div>
          <Typography as="p" className="mb-2 font-medium text-gray-700">
            Doctor Name
          </Typography>
          <div className="border rounded-lg px-3 py-3">
            {contact.doctorName}
          </div>
          {/* <CustomDropdown
            placeholder="Select team"
            value={assignedTo}
            options={["Billing Team", "Support Team", "Technical Team"]}
            onChange={(val: string) => setAssignedTo(val)}
          /> */}
        </div>

        {/* Billing + Message Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Billing Box */}
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <div className="flex justify-between">
              <div>
                <Typography as="h5" className="font-semibold text-gray-800">
                  Specialty
                </Typography>
                <Typography
                  as="p"
                  className="text-gray-500 text-sm mt-1"
                >{`Consultation Type: ${contact.consultationType}`}</Typography>
                <Typography as="p" className="text-desc-color  text-sm">
                  Patient ID: {contact.patientName}
                </Typography>
              </div>
              <div>
                <Typography className="font-semibold">
                  General Practitioner
                </Typography>
                <div className="">
                  <span className="px-3 py-1 rounded text-xs font-medium">
                    <div className="inline-flex items-center gap-2">
                      <div className="flex items-center">
                        <Rating
                          size={16}
                          initialValue={Number(contact.rating)}
                          allowHover={false}
                          allowFraction
                          readonly
                          SVGstyle={{ display: "inline-block" }}
                        />
                      </div>
                      {/* optionally show numeric rating */}
                      {/* <span className="text-gray-500 text-sm">({contact.rating})</span> */}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Box - Now Editable */}
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Image
                  src="/assets/svg/reviewImg.svg"
                  width={57}
                  height={57}
                  alt="prof"
                  className=" rounded-full"
                />
                <Typography className="font-bold">
                  {contact.doctorName}
                </Typography>
              </div>
              <div>
                <Typography>12/oct</Typography>
              </div>
            </div>
            <Typography
              as="h5"
              className="font-normal w-[65%] max-md:w-full text-desc-color mt-2"
            >
              Dr. Patel is a true professional who genuinely cares about his
              patients. I highly recommend Dr. Patel to anyone seeking
              exceptional cardiac care.
            </Typography>
          </div>
        </div>
        <div>
          <ReviewStepper />
        </div>
        {/* Buttons */}
        <div className="flex justify-between max-md:flex-col gap-4 pt-4">
          <Typography className="text-red font-bold underline">
            Flag Review
          </Typography>
          <div className="flex gap-4">
            <Button
              className="bg-gray-200 hover:bg-gray-300 w-[180px] flex items-center justify-center rounded-lg py-3"
              // onClick={() => router.back()}
            >
              Approve Review
            </Button>
            <Button className="bg-primary-color text-white hover:opacity-90 w-[180px] flex items-center justify-center rounded-lg py-3">
              Flag Review
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <InternalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(description) => {
            console.log("New Message =>", description);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ReviewsDetailsPage;
