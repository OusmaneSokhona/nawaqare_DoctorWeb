"use client";

import ServiceForm from "@/components/shared/service-form";

const Add = () => {
  return (
    <ServiceForm
      mode="add"
      onSubmit={(values) => {
        console.log("ADD", values);
      }}
    />
  );
};

export default Add;
