"use client";

import React, { useState } from "react";

import { Button } from "@/components/shared/button";
import InputNumberField from "@/components/shared/input-fields/input-number-field";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import TextAreaField from "@/components/shared/input-fields/textarea-field";
import ModalWrapper from "@/components/shared/modal";

interface PrintMedicineLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrintMedicineLabelModal: React.FC<PrintMedicineLabelModalProps> = ({
  onClose,
  isOpen,
}) => {
  const [formData, setFormData] = useState({
    medicine_name: "",
    formulation: "",
    medicine_quantity: "",
    dosage: "",
    note: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof typeof formData, boolean>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Set touched and validate field
    setTouched((prev) => ({ ...prev, [name]: true }));
    const formattedName = name
      .replace(/_/g, " ")
      .replace(/^./, (str) => str.toUpperCase());
    setErrors((prev) => ({
      ...prev,
      [name]: value ? "" : `${formattedName} is required.`,
    }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    const fields: (keyof typeof formData)[] = [
      "medicine_name",
      "formulation",
      "medicine_quantity",
      "dosage",
    ];

    fields.forEach((field) => {
      if (!formData[field]) {
        const formattedField = field
          .replace(/_/g, " ") // Replace underscores with spaces
          .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter

        newErrors[field] = `${formattedField} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setFormData({
        medicine_name: "",
        formulation: "",
        medicine_quantity: "",
        dosage: "",
        note: "",
      });
      setErrors({});
      onClose();
    }
  };

  const onBlurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (!formData[name as keyof typeof formData]) {
      const formattedName = name
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/^./, (str) => str.toUpperCase());
      setErrors((prev) => ({
        ...prev,
        [name]: `${formattedName} is required.`,
      }));
    }
  };

  return (
    <ModalWrapper
      title={"Print Medicine Label"}
      titleStyling={"text-center text-primary-dark"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-5 pt-5">
        <div className="space-y-5 overflow-y-auto max-h-[40vh] xs:max-h-[45vh] sm:max-h-[55vh] 2xl:max-h-[60vh]">
          <InputTextField
            label="Medicine Name"
            placeholder="Enter Medicine Name"
            name="medicine_name"
            value={formData.medicine_name}
            onChange={handleChange}
            className="w-full"
            error={errors.medicine_name}
            touched={touched.medicine_name}
            onBlur={onBlurHandler}
          />
          <InputTextField
            label="Formulation"
            placeholder="500 mg"
            className="w-full"
            name="formulation"
            value={formData.formulation}
            onChange={handleChange}
            error={errors.formulation}
            touched={touched.formulation}
            onBlur={onBlurHandler}
          />
          <InputNumberField
            label="Medicine Quantity"
            name="medicine_quantity"
            value={formData.medicine_quantity}
            onChange={handleChange}
            placeholder="01"
            className="w-full"
            min={0}
            max={1000}
            error={errors.medicine_quantity}
            touched={touched.medicine_quantity}
            onBlur={onBlurHandler}
          />
          <InputTextField
            label="Dosage"
            placeholder="1 Cap 3 times a day"
            className="w-full"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            error={errors.dosage}
            touched={touched.dosage}
            onBlur={onBlurHandler}
          />
          <TextAreaField
            name="note"
            value={formData.note}
            onChange={handleChange}
            label="Note"
            placeholder="Type here..."
            rows={5}
            error={errors.note}
            touched={touched.note}
            onBlur={onBlurHandler}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
          <Button
            variant="outlined"
            size="medium"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="medium"
            className="w-full"
          >
            Withdraw
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default PrintMedicineLabelModal;
