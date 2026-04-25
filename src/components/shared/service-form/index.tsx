"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@/components/shared/typography";

/* =====================
   TYPES
===================== */
type ServiceFormMode = "add" | "edit";

type ServiceFormProps = {
  mode: ServiceFormMode;
  initialValues?: {
    serviceName: string;
    durationMinutes: string;
    travelRadius: string;
    fee: number;
    additionalFee?: number;
    durationKm: string;
    mode: string;
    status: string;
    category: string;
    instructions?: string;
    description?: string;
  };
  onSubmit: (values: any) => void;
};

/* =====================
   VALIDATION
===================== */
const ServiceSchema = Yup.object().shape({
  serviceName: Yup.string().required("Service name is required"),
  durationMinutes: Yup.string().required("Duration is required"),
  travelRadius: Yup.string().required("Travel radius is required"),
  fee: Yup.number().required("Fee is required"),
  additionalFee: Yup.number(),
  durationKm: Yup.string().required("Duration is required"),
  mode: Yup.string().required("Mode is required"),
  status: Yup.string().required("Status is required"),
  category: Yup.string().required("Category is required"),
  instructions: Yup.string(),
  description: Yup.string(),
});

/* =====================
   DEFAULT VALUES (ADD)
===================== */
const defaultValues = {
  serviceName: "",
  durationMinutes: "",
  travelRadius: "",
  fee: 0,
  additionalFee: 0,
  durationKm: "",
  mode: "Home Visit",
  status: "Active",
  category: "Home Visit",
  instructions: "",
  description: "",
};

/* =====================
   COMPONENT
===================== */
export default function ServiceForm({
  mode,
  initialValues,
  onSubmit,
}: ServiceFormProps) {
  const isEdit = mode === "edit";

  return (
    <div className="p-2">
      <Typography size="h5" className="font-semibold mb-6">
        {isEdit ? "Edit Service" : "Add Service"}
      </Typography>

      <Formik
        initialValues={initialValues ?? defaultValues}
        validationSchema={ServiceSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-5">
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Service Name", "serviceName"],
                ["Duration (minutes)", "durationMinutes"],
                ["Travel radius (km)", "travelRadius"],
                ["Fee", "fee", "number"],
                ["Additional Travel Fee", "additionalFee", "number"],
                ["Duration", "durationKm"],
              ].map(([label, name, type]) => (
                <div key={name}>
                  <label className="text-sm font-semibold text-black">
                    {label}
                  </label>
                  <Field
                    name={name}
                    type={type || "text"}
                    className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                  />
                  <ErrorMessage
                    name={name}
                    component="p"
                    className="text-xs text-red"
                  />
                </div>
              ))}

              {/* MODE */}
              <div>
                <label className="text-sm text-gray-600">Mode</label>
                <Field
                  as="select"
                  name="mode"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option>Remote Consultation</option>
                  <option>In-person Consultation</option>
                  <option>Home Visit</option>
                </Field>
              </div>

              {/* STATUS */}
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <Field
                  as="select"
                  name="status"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Field>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm text-gray-600">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option>Home Visit</option>
                  <option>Remote Consultation</option>
                  <option>In-person Consultation</option>
                </Field>
                <p className="text-xs text-red mt-1">
                  Requires verification (if sensitive category)
                </p>
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div>
              <label className="text-sm text-gray-600">
                Patient instructions
              </label>
              <Field
                as="textarea"
                rows={3}
                name="instructions"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <Field
                as="textarea"
                rows={3}
                name="description"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
              />
            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-3">
              <button
                type="button"
                className="text-primary-color text-sm font-medium"
              >
                Configure availability
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg bg-gray-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary-color text-white text-sm"
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
