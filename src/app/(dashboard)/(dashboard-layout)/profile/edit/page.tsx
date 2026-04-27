"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import React, { useEffect, useState } from "react";
import { getMe, updateProfile } from "@/api/service/auth";

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: () => void;
}) => (
  <div
    onClick={onChange}
    className={`w-9 h-5 rounded-full relative transition cursor-pointer ${
      checked ? "bg-blue-500" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
        checked ? "right-0.5" : "left-0.5"
      }`}
    />
  </div>
);

export default function EditPersonalInformation() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      dob: "",
      id_number: "",
      id_type: "Numeric",
      id_expiry: "",
      email: "",
      phone: "",
      phone_whatsapp: "",
      city: "",
      area: "",
      address: "",
      gender: "Male",
      nationality: "",
      about: "",
      languages: [] as string[],
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
    }),
    onSubmit: async (values) => {
      if (!userId) return;
      setSaving(true);
      try {
        await updateProfile(userId, {
          first_name: values.first_name,
          last_name: values.last_name,
          city: values.city,
          area: values.area,
          address: values.address,
          gender: values.gender,
          nationality: values.nationality,
          about: values.about,
          phone_whatsapp: values.phone_whatsapp,
          languages: values.languages,
        });
        setSuccess(true);
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } catch (e) {
        console.error(e);
      } finally {
        setSaving(false);
      }
    },
  });

  useEffect(() => {
    getMe()
      .then((user) => {
        setUserId(user.id);
        const p = user.profile;
        formik.setValues({
          first_name: p?.first_name ?? "",
          last_name: p?.last_name ?? "",
          dob: p?.date_of_birth ?? "",
          id_number: p?.id_number ?? "",
          id_type: p?.id_type ?? "Numeric",
          id_expiry: p?.id_expiry ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          phone_whatsapp: p?.phone_whatsapp ?? "",
          city: p?.city ?? "",
          area: p?.area ?? "",
          address: p?.address ?? "",
          gender: p?.gender ?? "Male",
          nationality: p?.nationality ?? "",
          about: p?.about ?? "",
          languages: p?.languages ?? [],
        });
      })
      .catch(() => {});
  }, []);

  const inputClass =
    "w-full border-2 border-border-color rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-primary-color";
  const labelClass = "block text-[12px] font-bold text-gray-700 mb-1";

  const AVAILABLE_LANGUAGES = ["Français", "English", "Wolof", "Arabic", "Portuguese"];

  const toggleLanguage = (lang: string) => {
    const current = formik.values.languages;
    const next = current.includes(lang)
      ? current.filter((l) => l !== lang)
      : [...current, lang];
    formik.setFieldValue("languages", next);
  };

  return (
    <div className="pb-10">
      <Typography size="h4" className="font-bold mb-8 text-gray-800">
        Edit Personal Information
      </Typography>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
          <Icon icon="mdi:check-circle" width={18} />
          Profile updated successfully!
        </div>
      )}

      {/* Profile Avatar */}
      <div className="mb-8 relative w-20 h-20 bg-[#F4F7FE] rounded-full flex items-center justify-center">
        <Icon icon="solar:user-bold" width="40" className="text-[#BCC6D8]" />
        <div className="absolute bottom-0 right-0 bg-white rounded-md shadow-md border border-gray-100 p-1 cursor-pointer">
          <Icon
            icon="solar:camera-add-bold"
            width="16"
            className="text-primary-color"
          />
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Identity */}
        <Typography size="h5" className="font-bold text-gray-800">
          Identity
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>First Name</label>
            <input {...formik.getFieldProps("first_name")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input {...formik.getFieldProps("last_name")} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input type="date" {...formik.getFieldProps("dob")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>ID Number</label>
            <input {...formik.getFieldProps("id_number")} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>ID Type</label>
            <select {...formik.getFieldProps("id_type")} className={`${inputClass} appearance-none`}>
              <option value="Numeric">Numeric</option>
              <option value="Passport">Passport</option>
              <option value="Driver License">Driver License</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Expiry Date</label>
            <input type="date" {...formik.getFieldProps("id_expiry")} className={inputClass} />
          </div>
        </div>

        {/* Contact */}
        <Typography size="h5" className="font-bold text-gray-800 pt-4">
          Contact
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Email</label>
            <input {...formik.getFieldProps("email")} className={`${inputClass} bg-gray-50`} disabled />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input {...formik.getFieldProps("phone")} className={`${inputClass} bg-gray-50`} disabled />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input {...formik.getFieldProps("phone_whatsapp")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input {...formik.getFieldProps("city")} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Area</label>
            <input {...formik.getFieldProps("area")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input {...formik.getFieldProps("address")} className={inputClass} />
          </div>
        </div>

        {/* Demographics */}
        <Typography size="h5" className="font-bold text-gray-800 pt-4">
          Demographics
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Gender</label>
            <select {...formik.getFieldProps("gender")} className={`${inputClass} appearance-none`}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Nationality</label>
            <input {...formik.getFieldProps("nationality")} className={inputClass} />
          </div>
        </div>

        {/* About Me */}
        <div>
          <label className={labelClass}>About Me</label>
          <textarea
            {...formik.getFieldProps("about")}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Language */}
        <Typography size="h5" className="font-bold text-gray-800 pt-4">
          Language Spoken
        </Typography>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <span
              key={lang}
              className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition ${
                formik.values.languages.includes(lang)
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={() => toggleLanguage(lang)}
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            className="px-12 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold text-sm"
            onClick={() => router.back()}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="px-12 py-3 rounded-xl bg-primary-color text-white font-bold text-sm hover:opacity-90 transition-colors"
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
