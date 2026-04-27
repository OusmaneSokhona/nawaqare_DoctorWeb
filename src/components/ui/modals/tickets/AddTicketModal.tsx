"use client";

import React, { useState } from "react";

import { Button } from "@/components/shared/button";
import FileUploader from "@/components/shared/file-uploader";
import Iconify from "@/components/shared/iconify";
import InputDropdown from "@/components/shared/input-fields/input-dropdown";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import TextAreaField from "@/components/shared/input-fields/textarea-field";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";

interface AddTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({ onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "",
    priority: "",
    message: "",
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof typeof formData, boolean>>
  >({});

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = "";
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else if (name === "email" && !isValidEmail(value)) {
      error = "Invalid email format.";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    const fields: (keyof typeof formData)[] = [
      "name",
      "email",
      "subject",
      "department",
      "priority",
    ];

    fields.forEach((field) => {
      const value = formData[field];
      if (!value) {
        newErrors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      } else if (field === "email" && !isValidEmail(value)) {
        newErrors[field] = "Invalid email format.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        department: "",
        priority: "",
        message: "",
      });
    }
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setUploadedImages((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onBlurHandler = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = formData[field];
    let error = "";

    if (!value) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    } else if (field === "email" && !isValidEmail(value)) {
      error = "Invalid email format.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    isValidEmail(formData.email) &&
    formData.subject.trim() &&
    formData.department &&
    formData.priority &&
    Object.values(errors).every((err) => !err);

  return (
    <ModalWrapper
      title="Create New Ticket"
      titleStyling="text-center text-primary-dark"
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-5 pt-5">
        <div className="space-y-5 overflow-y-auto max-h-[40vh] xs:max-h-[45vh] sm:max-h-[55vh] 2xl:max-h-[60vh]">
          <InputTextField
            label="Name"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => onBlurHandler("name")}
            error={errors.name || ""}
            touched={touched.name}
            className="w-full"
          />

          <InputTextField
            label="Email Address"
            placeholder="Enter Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => onBlurHandler("email")}
            error={errors.email || ""}
            touched={touched.email}
            className="w-full"
          />

          <InputTextField
            label="Subject"
            placeholder="Enter Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={() => onBlurHandler("subject")}
            error={errors.subject || ""}
            touched={touched.subject}
            className="w-full"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            <InputDropdown
              label="Department"
              placeholder="Select Department"
              name="department"
              textColor="!text-dark-gray font-bold !m-0"
              selectedTextColor="#312d2d"
              className="!rounded-[8px] w-full"
              height="h-[3.65rem]"
              value={formData.department}
              onSelect={(selected) =>
                handleChange({
                  target: { name: "department", value: selected },
                })
              }
              onBlur={() => onBlurHandler("department")}
              error={
                touched.department && errors.department ? errors.department : ""
              }
              touched={touched.department}
              options={[
                { label: "Accountant", value: "Accountant" },
                { label: "Admin", value: "Admin" },
                { label: "Drug Inspector", value: "DrugInspector" },
                { label: "Delivery Man", value: "DeliveryMan" },
              ]}
              isSearchable={false}
              hideSelectedOptions={false}
            />

            <InputDropdown
              label="Priority"
              placeholder="Select priority"
              name="priority"
              textColor="!text-dark-gray font-bold !m-0"
              selectedTextColor="#312d2d"
              className="!rounded-[8px] w-full"
              height="h-[3.65rem]"
              value={formData.priority}
              onSelect={(selected) =>
                handleChange({ target: { name: "priority", value: selected } })
              }
              onBlur={() => onBlurHandler("priority")}
              error={touched.priority && errors.priority ? errors.priority : ""}
              touched={touched.priority}
              options={[
                { label: "Urgent", value: "urgent" },
                { label: "Not Important", value: "not_important" },
              ]}
              isSearchable={false}
              hideSelectedOptions={false}
            />
          </div>

          <TextAreaField
            name="message"
            value={formData.message}
            onChange={handleChange}
            label="Message"
            placeholder="Type here..."
            rows={1}
            error={errors.message}
            touched={touched.message}
          />

          <div className="border-y border-light-gray py-4 space-y-5">
            <FileUploader
              label="Choose file"
              onFileSelect={handleFileUpload}
              accept="image/*"
            />

            {uploadedImages.length > 0 && (
              <div className="space-y-5 border-t border-light-gray pt-5">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-full flex items-center gap-5">
                      <Typography
                        as="p"
                        size="sm"
                        className="w-[50%] text-dark-gray"
                      >
                        {file.name}
                      </Typography>
                      <Typography as="p" size="sm" className="text-dark-gray">
                        {(file.size / 1024).toFixed(1)} KB
                      </Typography>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Iconify
                        icon="iconoir:delete-circle"
                        className="text-red w-5 h-5"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddTicketModal;
