// import { Typography } from "@/components/shared/typography";
// import React from "react";

// const Reviews = () => {
//   return (
//     <div>
//       <div>
//         <Typography size="h3" as="h3">
//           Reviews
//         </Typography>
//         <Typography className="text-desc-color">Feedback from your recent consultations</Typography>
//       </div>
//     </div>
//   );
// };

// export default Reviews;
"use client";
import React, { useState } from "react";
import { Typography } from "@/components/shared/typography";
import PatientStatics from "@/components/shared/stats/patient-statics";
import PatientReviews from "@/components/shared/stats/patient-reviews";

const DoctorReviews = () => (
  <div className="pt-6">
    <Typography>Doctor Reviews Content</Typography>
  </div>
);

// const PatientReviews = () => (
//   <div className="pt-6">
//     <Typography>Patient Reviews Content</Typography>
//   </div>
// );

const Reviews = () => {
  const [activeTab, setActiveTab] = useState<"patient" | "statistics">(
    "patient",
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Typography size="h3" as="h3">
          Reviews
        </Typography>
        <Typography className="text-desc-color">
          Feedback from your recent consultations
        </Typography>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b">
        <button
          onClick={() => setActiveTab("patient")}
          className={`pb-3 font-medium transition-all ${
            activeTab === "patient"
              ? "text-primary-color border-b-2 border-primary-color"
              : "text-desc-color"
          }`}
        >
          Patient Reviews(2)
        </button>

        <button
          onClick={() => setActiveTab("statistics")}
          className={`pb-3 font-medium transition-all ${
            activeTab === "statistics"
              ? "text-primary-color border-b-2 border-primary-color"
              : "text-desc-color"
          }`}
        >
          Statistics
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "patient" && <PatientReviews />}
      {activeTab === "statistics" && <PatientStatics />}
    </div>
  );
};

export default Reviews;
