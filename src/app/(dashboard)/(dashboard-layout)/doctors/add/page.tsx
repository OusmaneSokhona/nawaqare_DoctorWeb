"use client";

import { useFormik } from "formik";
import React, { useState } from "react";

import { Button } from "@/components/shared/button";
import Container from "@/components/shared/container";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import { Typography } from "@/components/shared/typography";
import { profileForm } from "@/formik/forms/dashboard";
import { profileInitialValues } from "@/formik/initial-values/dashboard";
import { profileFormSchema } from "@/formik/validations/dashboard";
import { getError } from "@/utils/form-helpers";
import { Icon } from "@iconify/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useParams, useRouter } from "next/navigation";
import { allDoctors } from "@/data";
import { AllDoctorsType } from "@/types/dashboard";
import { toast } from "react-toastify";

const AddDcotor = () => {
  const router = useRouter();
  const {
    formFields: { first_name, last_name, email },
  } = profileForm;

  const [imageState, setImageState] = useState<string>(
    "/assets/svg/addDoctor.svg",
  );
  const [imageUpState, setImageUpState] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // use optional chaining (?.) to avoid null errors
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageState(reader.result as string); // cast result to string
      reader.readAsDataURL(file);
      setImageUpState(file);
    }
  };

  const options = ["English", "Urdu", "Arabic", "French", "German"];
  const optionsSer = ["English", "Urdu", "Arabic", "French", "German"];
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedSer, setSelectedSer] = useState<string[]>([]);
  const [openSer, setOpenSer] = useState(false);

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  const toggleSer = (item: string) =>
    setSelectedSer((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  const handleSave = () => {
    toast.success("Doctor edited successfully!");
    router.push("/doctors");
  };

  const {
    values,
    touched,
    isValid,
    errors,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: profileInitialValues,
    onSubmit: () => {
      resetForm();
    },
    validationSchema: profileFormSchema,
  });
  return (
    <div className=" px-7 py-5 max-sm:px-4 max-sm:py-4 mx-auto flex flex-col gap-5">
      <div className="mx-auto relative flex items-center gap-4 h-[200px] w-[250px]">
        <label
          htmlFor="image-upload-input"
          className="h-[200px] w-[250px] bg-[#f8f8f8] rounded-xl flex items-center justify-center gap-1.5 text-[#185aae] font-medium cursor-pointer"
        >
          <div className="h-[200px] w-[250px] rounded-xl bg-[#f8f8f8] flex justify-center">
            <img
              src={imageState}
              alt="profile"
              className="h-[200px] w-[250px] object-cover rounded-xl hover:opacity-70"
            />
          </div>

          <div className="flex justify-center font-bold items-center gap-1 bg-background-color2 absolute bottom-1 right-1 h-10 w-10 rounded-lg ">
            <Icon icon="akar-icons:person-add" width="20" height="20" />
          </div>
        </label>

        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
      <div className="px-5 sm:px-6 md:px-10 py-5 md:py-10 pb-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-5 w-full">
            {/* First Name / Last Name */}
            <div className="flex items-center gap-5 w-full max-sm:flex-col">
              <div className="flex flex-col gap-2 w-[50%] max-sm:w-full">
                <label htmlFor="fname" className="font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14 shadow-sm"
                  placeholder="Suleman"
                />
              </div>
              <div className="flex flex-col gap-2 w-[50%] max-sm:w-full">
                <label htmlFor="lname" className="font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14 shadow-sm"
                  placeholder="Aslam"
                />
              </div>
            </div>
            <div className="flex items-center gap-5 w-full max-sm:flex-col">
              <div className="relative w-[50%] max-sm:w-full flex flex-col gap-2">
                <label htmlFor="consultation" className="font-semibold">
                  Consultation Type
                </label>
                <select
                  id="consultation"
                  name="consultation"
                  className="appearance-none border border-border-color rounded-xl py-2 pl-3 pr-10 h-14 shadow-sm bg-white placeholder:text-desc-color w-full"
                  defaultValue="Both"
                >
                  <option value="Video">Video</option>
                  <option value="Audio">Audio</option>
                  <option value="Both">Both</option>
                </select>
                <span className="absolute right-3 top-[70%] -translate-y-1/2 pointer-events-none text-secondary-color">
                  <Icon icon="ep:arrow-down-bold" width="20" height="20" />
                </span>
              </div>

              <div className="flex flex-col gap-2 w-[50%] max-sm:w-full">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14 shadow-sm"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
            <div className="flex items-center gap-5 w-full max-sm:flex-col">
              <div className="flex flex-col gap-2 w-[50%] max-sm:w-full">
                <label htmlFor="qualification" className="font-semibold">
                  Qualification
                </label>
                <input
                  type="qualification"
                  id="qualification"
                  name="email"
                  className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14 shadow-sm"
                  placeholder="MBBS"
                />
              </div>
              <div className="relative w-[50%] max-sm:w-full flex flex-col gap-2">
                <label htmlFor="speciality" className="font-semibold">
                  Speciality
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  className="appearance-none border border-border-color rounded-xl py-2 pl-3 pr-10 h-14 shadow-sm bg-white placeholder:text-desc-color w-full"
                  defaultValue="Primary Care"
                >
                  <option value="primary">Primary Care</option>
                  <option value="chronic">Chronic Care</option>
                  <option value="stress">Stress and Mental health</option>
                </select>
                <span className="absolute right-3 top-[70%] -translate-y-1/2 pointer-events-none text-secondary-color">
                  <Icon icon="ep:arrow-down-bold" width="20" height="20" />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5 w-full max-sm:flex-col">
              <div className="flex flex-col gap-2 w-[50%] max-sm:w-full">
                <label htmlFor="expertise" className="font-semibold">
                  Expertise
                </label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14 shadow-sm"
                  placeholder="Stress and Mental Health,"
                />
              </div>
              <div className="flex flex-col gap-2 w-[50%] max-sm:w-full">
                <label htmlFor="experience" className="font-semibold">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14 shadow-sm"
                  placeholder="10 to 12 years"
                />
              </div>
            </div>
            <div className="flex items-center gap-5 w-full max-sm:flex-col">
              <div className="flex flex-col gap-2 w-[50%] max-sm:w-full">
                <label htmlFor="phone" className="font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14 shadow-sm"
                  placeholder="+92000000000"
                />
              </div>
              <div className="relative w-[50%] max-sm:w-full">
                <label className="block font-semibold mb-2">Language</label>

                {/* Select box */}
                <div
                  onClick={() => setOpen(!open)}
                  className="border rounded-xl h-14 flex items-center justify-between px-3 cursor-pointer bg-white"
                >
                  <div className="flex gap-2 flex-wrap">
                    {selected.length ? (
                      selected.map((s) => (
                        <span
                          key={s}
                          className="bg-[#d7dcec] text-secondary-color px-2 py-1 rounded flex items-center gap-1"
                        >
                          {s}
                          <Icon
                            icon="material-symbols:close-rounded"
                            width="14"
                            height="14"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(s);
                            }}
                            className="cursor-pointer"
                          />
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">Select languages</span>
                    )}
                  </div>
                  <Icon
                    icon="ep:arrow-down-bold"
                    width="20"
                    height="20"
                    className="text-secondary-color"
                  />
                </div>

                {/* Dropdown */}
                {open && (
                  <ul className="absolute w-full mt-1 border rounded-lg bg-white shadow max-h-40 overflow-y-auto z-10">
                    {options.map((o) => (
                      <li
                        key={o}
                        onClick={() => toggle(o)}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                          selected.includes(o)
                            ? "bg-green-50 text-green-600"
                            : ""
                        }`}
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="relative w-full">
              <label className="block font-semibold mb-2">Services</label>

              {/* Select box */}
              <div
                onClick={() => setOpenSer(!openSer)}
                className="border rounded-xl h-14 flex items-center justify-between px-3 cursor-pointer bg-white"
              >
                <div className="flex gap-2 flex-wrap">
                  {selectedSer.length ? (
                    selectedSer.map((s) => (
                      <span
                        key={s}
                        className="bg-[#d7ecdc] text-secondary-color px-2 py-1 rounded flex items-center gap-1"
                      >
                        {s}
                        <Icon
                          icon="material-symbols:close-rounded"
                          width="14"
                          height="14"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSer(s);
                          }}
                          className="cursor-pointer"
                        />
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">Select services</span>
                  )}
                </div>
                <Icon
                  icon="ep:arrow-down-bold"
                  width="20"
                  height="20"
                  className="text-secondary-color"
                />
              </div>

              {/* Dropdown */}
              {openSer && (
                <ul className="absolute w-full mt-1 border rounded-lg bg-white shadow max-h-40 overflow-y-auto z-10">
                  {optionsSer.map((o) => (
                    <li
                      key={o}
                      onClick={() => toggleSer(o)}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        selectedSer.includes(o)
                          ? "bg-green-50 text-green-600"
                          : ""
                      }`}
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-full flex flex-col gap-2">
              <label htmlFor="memerbership" className="font-semibold">
                Memerbership
              </label>
              <select
                id="memerbership"
                name="memerbership"
                className="appearance-none border border-border-color rounded-xl py-2 pl-3 pr-10 h-14 shadow-sm bg-white placeholder:text-desc-color w-full"
                defaultValue="Standard"
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                {/* <option value="stress">Stress and Mental health</option> */}
              </select>
              <span className="absolute right-3 top-[70%] -translate-y-1/2 pointer-events-none text-secondary-color">
                <Icon icon="ep:arrow-down-bold" width="20" height="20" />
              </span>
            </div>
            <div className="relative w-full flex flex-col gap-2">
              <label htmlFor="about" className="font-semibold">
                About
              </label>
              <textarea
                name="about"
                id="about"
                rows={5}
                placeholder="About Yourself..."
                className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 shadow-sm resize-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="certificate" className="font-semibold">
                Upload Certificate(Optional)
              </label>

              <input
                type="file"
                id="certificate"
                name="certificate"
                accept=".pdf,.jpg,.png,.jpeg"
                className="block w-full text-sm text-desc-color 
                bg-white h-14
               file:mr-4 file:py-2.5 file:px-4 
               file:rounded-lg file:border-0 
               file:text-sm file:font-semibold 
               file:bg-[#d7dcec] file:text-secondary-color 
               hover:file:bg-[#d7e5ec]
               border rounded-xl px-3 py-2 shadow-sm cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-8 pt-4">
            {/* <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={!(isValid && dirty)}
            >
              Save
            </Button> */}
            <Typography className="underline underline-offset-2 font-bold text-xl text-secondary-color">
              Cancel
            </Typography>
            <Button
              //   disabled={!(isValid && dirty)}
              type="submit"
              // variant="primary"
              className="text-white rounded-xl bg-primary-color"
              onClick={handleSave}
            >
              Add & Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDcotor;
