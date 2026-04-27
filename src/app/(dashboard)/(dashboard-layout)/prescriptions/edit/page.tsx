import PrescriptionForm from "@/components/shared/prescription/prescription-form";
import React from "react";

const myData = {
  templateName: "Hypertension Basic Set",
  lastModified: "15/10/2025",
  version: "v2",
  specialty: "Cardiology",
  // You can add more fields here that PrescriptionForm expects
};

export default function EditPrescription() {
  return (
    <div className="">
      <PrescriptionForm isEdit={true} initialData={myData} />
    </div>
  );
}
