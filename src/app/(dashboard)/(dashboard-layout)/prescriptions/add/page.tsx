import PrescriptionForm from "@/components/shared/prescription/prescription-form";
import React from "react";

export default function AddPrescription() {
  return (
    <div className="">
      <PrescriptionForm
        isEdit={false}
        // initialData is not passed when creating new template
      />
    </div>
  );
}
