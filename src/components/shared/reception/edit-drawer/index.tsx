"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEditDayDrawerOpen } from "@/redux/slices/app-slice";
import { ArrowLeft, X } from "lucide-react";

const EditDayDrawer = () => {
  const dispatch = useAppDispatch();
  const { isEditDayDrawerOpen } = useAppSelector((s) => s.app);

  if (!isEditDayDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => dispatch(setEditDayDrawerOpen(false))}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-[380px] max-md:w-[90%] bg-[#F0FAFF]
                      z-50 shadow-xl p-5 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-start gap-7 mb-4">
          <div className="bg-[#3b82f6] p-1.5 -m-5 rounded-full flex items-center justify-center">
            <ArrowLeft
              onClick={() => dispatch(setEditDayDrawerOpen(false))}
              className="text-white w-5 h-5"
            />
          </div>
          <h2 className="text-lg font-semibold">Edit Day</h2>
          {/* <button
            onClick={() => dispatch(setEditDayDrawerOpen(false))}
          >
            <X />
          </button> */}
        </div>

        {/* ---- FORM (same UI as image) ---- */}
        <div className="space-y-4">
          <Input label="Start time" />
          <Input label="End time" />
          <Input label="Breaks" />
          <Input label="Buffers" />

          <Section title="Consultation Mode">
            <Checkbox label="In-Person" />
            <Checkbox label="Remote" />
            <Checkbox label="Home Visit" />
            <Checkbox label="All" />
          </Section>

          <Section title="Services">
            <Checkbox label="Consultation" />
            <Checkbox label="Follow-Up" />
            <Checkbox label="Physiotherapy" />
          </Section>

          <button className="w-full bg-primary-color text-white py-3 rounded-lg">
            Apply
          </button>

          <button className="w-full bg-gray-200 py-3 rounded-lg">
            Duplicate Configuration
          </button>

          <p className="text-xs text-gray-500 text-center">
            Auto Saved: Last saved 14:25
          </p>
        </div>
      </div>
    </>
  );
};

export default EditDayDrawer;

/* ---------- Small Reusable Components ---------- */

const Input = ({ label }: { label: string }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type="text"
      placeholder="12:00 PM"
      className="w-full mt-1 px-3 py-2 rounded-md border"
    />
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-sm font-medium mb-2">{title}</p>
    <div className="space-y-2">{children}</div>
  </div>
);

const Checkbox = ({ label }: { label: string }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" />
    {label}
  </label>
);
