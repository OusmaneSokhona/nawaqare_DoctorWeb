// 'use client'
// import { useSearchParams } from 'next/navigation';
// import React from 'react'

// const FaqDetails = () => {
//     const searchParams = useSearchParams();
//       const id = searchParams.get("id");
//   return (
//     <div>
//         FaqDetails — ID: {id}

//     </div>
//   )
// }

// export default FaqDetails
"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";

const getStatusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-secondary-color text-white";
    case " Inactive":
      return "bg-red text-white";
    default:
      return "bg-gray-200";
  }
};

const FaqDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("--------id", id);
  const [faq, setFaq] = useState<any>(null);
  const [open, setOpen] = useState(false);

  // Temporary sample data (replace with API call if needed)
  const allFaqs = [
    {
      id: "1",
      title: "How much for stress management , RMR consultation?",
      desc: "Paracetamol, Peppramint, Flagyl, Toot Siyah",
      updatedBy: "Alexa",
      updatedDate: "12 Sep 2025",
    },
    {
      id: "2",
      title: "What is RMR , Rapid Mind Reset and how does it help?",
      desc: "Paracetamol, Peppramint, Flagyl, Toot Siyah",
      updatedBy: "Alexa",
      updatedDate: "12 Sep 2025",
    },
    {
      id: "3",
      title: "How much are everyday urgent care visits without insurance?",
      desc: "Paracetamol, Peppramint, Flagyl, Toot Siyah",
      updatedBy: "Alexa",
      updatedDate: "12 Sep 2025",
    },
  ];

  useEffect(() => {
    if (id) {
      const found = allFaqs.find((f) => f.id === id);
      setFaq(found || null);
    }
  }, [id]);

  if (!faq) {
    return <p className="text-center mt-10">FAQ not found...</p>;
  }

  return (
    <div>
      <div>
        <div>
          <Typography size="h4">FAQ Detail </Typography>
          <Typography className="text-md text-desc-color">
            Read-only view of a public FAQ entry.
          </Typography>
        </div>
        <div>
          <Typography
            className={`px-4 py-2 rounded-full text-lg font-medium text-white ${getStatusClass(faq.Status)}`}
          >
            {faq.Status}
          </Typography>
        </div>
      </div>

      <div className="mt-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* FAQ Box */}
          <div className="border rounded-lg p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <Typography className="font-semibold text-lg">
                {faq.title}
              </Typography>

              <Icon
                icon="uim:angle-down"
                width="24"
                className={`transition-transform duration-300 ${
                  open ? "rotate-180 text-primary-color" : "text-primary-color"
                }`}
              />
            </div>

            {/* Answer */}
            {open && (
              <p className="mt-3 font-bold text-gray-700 leading-relaxed">
                {faq.desc}
              </p>
            )}

            {/* Updated Info */}
            <p className="text-md text-gray-400 mt-2">
              Last updated by {faq.updatedBy}, {faq.updatedDate}
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700">
              Close
            </button>
            <button className="px-6 py-2 rounded-lg bg-primary-color text-white">
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqDetails;
