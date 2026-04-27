"use client";

import React, { useMemo, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

/* =========================
  HELPERS
========================= */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const formatDate = (d = new Date()) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = d.toLocaleString("en-US", { month: "short" });
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const fileError = (file?: File | null) => {
  if (!file) return "";
  if (!ACCEPTED_TYPES.includes(file.type)) return "Invalid format";
  if (file.size > MAX_FILE_SIZE) return "Max 5MB allowed";
  return "";
};

const getFileMeta = (file?: File | null) => {
  if (!file) return null;
  return { name: file.name, date: formatDate() };
};

/* =========================
  FORM TYPES
========================= */
type FormValues = {
  // Identity Documents
  nationalId: File | null; // required
  passportFront: File | null; // optional (in screenshot it is uploaded)

  // Credentials
  medicalLicense: File | null; // required
  diplomaCertificate: File | null; // required

  // Legal
  liabilityInsurance: File | null; // optional (approved example)
  cnpdGdprForm: File | null; // optional (rejected example)

  // Payment
  bankVerification: File | null; // optional
  paymentAuthorization: File | null; // optional
};

/* =========================
  VALIDATION (YUP)
========================= */
const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
  nationalId: Yup.mixed<File>()
    .required("National Identity Document is required")
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : false,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : false,
    ),

  passportFront: Yup.mixed<File>()
    .nullable()
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : true,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : true,
    ),

  medicalLicense: Yup.mixed<File>()
    .required("Medical License is required")
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : false,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : false,
    ),

  diplomaCertificate: Yup.mixed<File>()
    .required("Diploma / Certification is required")
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : false,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : false,
    ),

  liabilityInsurance: Yup.mixed<File>()
    .nullable()
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : true,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : true,
    ),

  cnpdGdprForm: Yup.mixed<File>()
    .nullable()
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : true,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : true,
    ),

  bankVerification: Yup.mixed<File>()
    .nullable()
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : true,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : true,
    ),

  paymentAuthorization: Yup.mixed<File>()
    .nullable()
    .defined()
    .test("fileType", "Invalid format", (file) =>
      file ? ACCEPTED_TYPES.includes(file.type) : true,
    )
    .test("fileSize", "Max 5MB allowed", (file) =>
      file ? file.size <= MAX_FILE_SIZE : true,
    ),
});

/* =========================
  INITIAL VALUES
========================= */
const initialValues: FormValues = {
  nationalId: null,
  passportFront: null,
  medicalLicense: null,
  diplomaCertificate: null,
  liabilityInsurance: null,
  cnpdGdprForm: null,
  bankVerification: null,
  paymentAuthorization: null,
};

/* =========================
  UI PIECES
========================= */
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div className="text-xs text-red flex items-center gap-1 mt-2">
      <Icon icon="mdi:close-circle" width={14} />
      {msg}
    </div>
  );
}

function StatusLine({
  kind,
  text,
  rightAction,
}: {
  kind?: "ok" | "warn" | "bad";
  text?: string;
  rightAction?: React.ReactNode;
}) {
  if (!text) return null;

  const cls =
    kind === "ok"
      ? "text-green-600"
      : kind === "warn"
        ? "text-orange-500"
        : "text-red";

  const icon =
    kind === "ok"
      ? "mdi:check-circle"
      : kind === "warn"
        ? "mdi:alert-circle"
        : "mdi:close-circle";

  return (
    <div className="flex items-center justify-between mt-2">
      <div className={`text-xs flex items-center gap-1 ${cls}`}>
        <Icon icon={icon} width={14} />
        {text}
      </div>
      {rightAction}
    </div>
  );
}

function UploadCard({
  label,
  required,
  helper,
  file,
  onPick,
  onRemove,
  errorText,
  // optional extra “status” (like Approved / Rejected…)
  statusBadge,
  statusKind,
  rightLinkText,
  onRightLink,
}: {
  label: string;
  required?: boolean;
  helper?: string; // e.g. "(Required)" or "(Optional)"
  file: File | null;
  onPick: (f: File) => void;
  onRemove: () => void;
  errorText?: string;

  statusBadge?: string; // "Approved" / "Rejected: ..."
  statusKind?: "ok" | "bad" | "warn";

  rightLinkText?: string;
  onRightLink?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const meta = getFileMeta(file);

  return (
    <div className="">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-gray-900">
            {label}{" "}
            {required ? (
              <span className="text-gray-500 font-normal text-xs">
                (Required)
              </span>
            ) : helper ? (
              <span className="text-gray-500 font-normal text-xs">
                {helper}
              </span>
            ) : null}
          </div>
        </div>

        {/* optional right link (like Re-upload) */}
        {rightLinkText ? (
          <button
            type="button"
            onClick={onRightLink}
            className="text-xs text-primary-color hover:underline whitespace-nowrap"
          >
            {rightLinkText}
          </button>
        ) : null}
      </div>

      {/* UPLOAD AREA */}
      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-3 w-full border border-dashed border-gray-300 rounded-lg py-6 flex flex-col items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition"
        >
          <Icon
            icon="mdi:upload"
            width={22}
            className="mb-2 text-primary-color"
          />
          <span>Upload</span>
        </button>
      ) : (
        <div className="mt-3 flex items-center justify-between border border-gray-200 rounded-lg px-3 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <Icon
              icon="mdi:file-document-outline"
              className="text-primary-color"
              width={20}
            />
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {meta?.name || "Uploaded file"}
              </div>
              <div className="text-xs text-gray-400">{meta?.date}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* replace */}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-primary-color"
              title="Replace"
            >
              <Icon icon="mdi:file-replace-outline" width={18} />
            </button>

            {/* remove */}
            <button
              type="button"
              onClick={onRemove}
              className="text-red"
              title="Remove"
            >
              <Icon icon="mdi:minus-circle-outline" width={18} />
            </button>
          </div>
        </div>
      )}

      {/* hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const picked = e.currentTarget.files?.[0];
          e.currentTarget.value = "";
          if (picked) onPick(picked);
        }}
      />

      {/* error OR status */}
      {errorText ? (
        <FieldError msg={errorText} />
      ) : (
        <StatusLine kind={statusKind} text={statusBadge} />
      )}

      {/* footer helper text like screenshot */}
      <div className="text-[10px] text-gray-400 mt-3">
        Accepted files: PDF, JPEG - max 5MB.
      </div>
    </div>
  );
}

/* =========================
  PAGE
========================= */
export default function EditPersonalInformation() {
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false, // cleaner UX
    onSubmit: (values) => {
      // Here you can build FormData and send to API
      const payload = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [k, v ? v.name : null]),
      );
      console.log("SUBMITTED:", payload);
    },
  });

  const setFile = (name: keyof FormValues, f: File) => {
    // local quick validation (before Yup)
    const err = fileError(f);
    formik.setFieldValue(name, f);
    formik.setFieldTouched(name, true, false);
    if (err) formik.setFieldError(name, err);
    else formik.setFieldError(name, undefined as any);
  };

  const clearFile = (name: keyof FormValues) => {
    formik.setFieldValue(name, null);
    formik.setFieldTouched(name, true, false);
    formik.setFieldError(name, undefined as any);
  };

  const requiredKeys: (keyof FormValues)[] = [
    "nationalId",
    "medicalLicense",
    "diplomaCertificate",
  ];

  const progress = useMemo(() => {
    const uploaded = requiredKeys.filter((k) => !!formik.values[k]).length;
    return {
      uploaded,
      total: requiredKeys.length,
      pct: (uploaded / requiredKeys.length) * 100,
    };
  }, [formik.values]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" rounded-2xl p-4 sm:p-6 max-w-5xl space-y-6 border border-gray-200"
    >
      <Typography size="h5" className="font-semibold">
        Edit Personal Information
      </Typography>

      {/* IDENTITY DOCUMENTS */}
      <section className="space-y-3">
        <Typography className="font-semibold">Identity Documents</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UploadCard
            label="National Identity Document"
            required
            file={formik.values.nationalId}
            onPick={(f) => setFile("nationalId", f)}
            onRemove={() => clearFile("nationalId")}
            errorText={
              (formik.touched.nationalId &&
                (formik.errors.nationalId as any)) ||
              undefined
            }
            // screenshot style “Upload 40%” – optional
            statusBadge={
              formik.values.nationalId
                ? "Uploaded"
                : formik.touched.nationalId
                  ? "Not uploaded"
                  : undefined
            }
            statusKind={
              formik.values.nationalId
                ? "ok"
                : formik.touched.nationalId
                  ? "bad"
                  : undefined
            }
          />

          {/* PASSPORT/ID FRONT (example uploaded behavior) */}
          <UploadCard
            label="Passport or ID Front"
            helper=""
            file={formik.values.passportFront}
            onPick={(f) => setFile("passportFront", f)}
            onRemove={() => clearFile("passportFront")}
            errorText={
              (formik.touched.passportFront &&
                (formik.errors.passportFront as any)) ||
              undefined
            }
            statusBadge={formik.values.passportFront ? "Uploaded" : undefined}
            statusKind={formik.values.passportFront ? "ok" : undefined}
          />
        </div>

        {/* small progress bar like screenshot */}
        <div className="pt-1">
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Upload</span>
            <span>{Math.round(progress.pct)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-primary-color rounded"
              style={{ width: `${Math.min(100, Math.max(0, progress.pct))}%` }}
            />
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="space-y-3">
        <Typography className="font-semibold">Credentials</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UploadCard
            label="Medical License"
            required
            file={formik.values.medicalLicense}
            onPick={(f) => setFile("medicalLicense", f)}
            onRemove={() => clearFile("medicalLicense")}
            errorText={
              (formik.touched.medicalLicense &&
                (formik.errors.medicalLicense as any)) ||
              undefined
            }
            statusBadge={
              formik.values.medicalLicense
                ? "Uploaded"
                : formik.touched.medicalLicense
                  ? "Invalid format"
                  : undefined
            }
            statusKind={
              formik.values.medicalLicense
                ? "ok"
                : formik.touched.medicalLicense
                  ? "bad"
                  : undefined
            }
          />

          <UploadCard
            label="Diploma / Certification"
            required
            file={formik.values.diplomaCertificate}
            onPick={(f) => setFile("diplomaCertificate", f)}
            onRemove={() => clearFile("diplomaCertificate")}
            errorText={
              (formik.touched.diplomaCertificate &&
                (formik.errors.diplomaCertificate as any)) ||
              undefined
            }
            statusBadge={
              formik.values.diplomaCertificate
                ? "Uploaded"
                : formik.touched.diplomaCertificate
                  ? "Not uploaded"
                  : undefined
            }
            statusKind={
              formik.values.diplomaCertificate
                ? "ok"
                : formik.touched.diplomaCertificate
                  ? "bad"
                  : undefined
            }
          />
        </div>
      </section>

      {/* LEGAL */}
      <section className="space-y-3">
        <Typography className="font-semibold">Legal</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UploadCard
            label="Liability Insurance Proof"
            helper=""
            file={formik.values.liabilityInsurance}
            onPick={(f) => setFile("liabilityInsurance", f)}
            onRemove={() => clearFile("liabilityInsurance")}
            errorText={
              (formik.touched.liabilityInsurance &&
                (formik.errors.liabilityInsurance as any)) ||
              undefined
            }
            statusBadge={
              formik.values.liabilityInsurance ? "Approved" : undefined
            }
            statusKind={formik.values.liabilityInsurance ? "ok" : undefined}
          />

          <UploadCard
            label="CNPD / GDPR Form"
            helper="(If Applicable)"
            file={formik.values.cnpdGdprForm}
            onPick={(f) => setFile("cnpdGdprForm", f)}
            onRemove={() => clearFile("cnpdGdprForm")}
            errorText={
              (formik.touched.cnpdGdprForm &&
                (formik.errors.cnpdGdprForm as any)) ||
              undefined
            }
            // screenshot feel: show "Rejected..." and a re-upload link
            statusBadge={
              formik.values.cnpdGdprForm
                ? "Uploaded"
                : "Rejected: Not Correct Format"
            }
            statusKind={formik.values.cnpdGdprForm ? "ok" : "bad"}
            rightLinkText="Re-upload"
            onRightLink={() => {
              // force pick again by just clearing and letting user upload
              clearFile("cnpdGdprForm");
            }}
          />
        </div>
      </section>

      {/* PAYMENT */}
      <section className="space-y-3">
        <Typography className="font-semibold">Payment</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UploadCard
            label="Bank Verification Letter"
            helper="(Optional)"
            file={formik.values.bankVerification}
            onPick={(f) => setFile("bankVerification", f)}
            onRemove={() => clearFile("bankVerification")}
            errorText={
              (formik.touched.bankVerification &&
                (formik.errors.bankVerification as any)) ||
              undefined
            }
          />

          <UploadCard
            label="Payment Authorization"
            helper="(Optional)"
            file={formik.values.paymentAuthorization}
            onPick={(f) => setFile("paymentAuthorization", f)}
            onRemove={() => clearFile("paymentAuthorization")}
            errorText={
              (formik.touched.paymentAuthorization &&
                (formik.errors.paymentAuthorization as any)) ||
              undefined
            }
          />
        </div>
      </section>

      {/* REQUIRED DOCS PROGRESS */}
      <div className="pt-2">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Required documents uploaded</span>
          <span>
            {progress.uploaded}/{progress.total}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-primary-color rounded"
            style={{ width: `${Math.round(progress.pct)}%` }}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="px-6 py-2 rounded-lg bg-gray-200 text-sm w-full sm:w-auto"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary-color text-white text-sm w-full sm:w-auto"
        >
          Save
        </button>
      </div>
    </form>
  );
}
