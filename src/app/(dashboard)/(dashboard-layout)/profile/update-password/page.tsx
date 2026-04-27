"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";

/* =====================
   VALIDATION
===================== */
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});

/* =====================
   COMPONENT
===================== */
export default function UpdatePassword() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("PASSWORD UPDATE:", values);
    },
  });

  const error = (name: keyof typeof formik.values) =>
    formik.touched[name] && formik.errors[name];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="
        
        
        w-full
        
        space-y-5
      "
    >
      <h2 className="text-lg font-semibold">Update Password</h2>

      {/* OLD PASSWORD */}
      <div>
        <label className="text-sm mb-1 block">Old Password</label>
        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              pr-10
              text-sm
            "
          />
          <Icon
            icon={showOld ? "mdi:eye-off" : "mdi:eye"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowOld(!showOld)}
          />
        </div>
        {error("oldPassword") && (
          <p className="text-xs text-red-500 mt-1">
            {formik.errors.oldPassword}
          </p>
        )}
      </div>

      {/* NEW PASSWORD */}
      <div>
        <label className="text-sm mb-1 block">New Password</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg px-3 py-2 pr-10 text-sm"
          />
          <Icon
            icon={showNew ? "mdi:eye-off" : "mdi:eye"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowNew(!showNew)}
          />
        </div>
        {error("newPassword") && (
          <p className="text-xs text-red-500 mt-1">
            {formik.errors.newPassword}
          </p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="text-sm mb-1 block">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg px-3 py-2 pr-10 text-sm"
          />
          <Icon
            icon={showConfirm ? "mdi:eye-off" : "mdi:eye"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          />
        </div>
        {error("confirmPassword") && (
          <p className="text-xs text-red-500 mt-1">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2 bg-gray-200 rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-2 bg-primary-color text-white rounded-lg text-sm"
        >
          Update
        </button>
      </div>
    </form>
  );
}
