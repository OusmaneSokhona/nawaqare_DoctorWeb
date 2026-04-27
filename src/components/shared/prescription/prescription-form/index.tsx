import React from "react";
import { Icon } from "@iconify/react";

interface PrescriptionFormProps {
  isEdit: boolean;
  initialData?: {
    templateName?: string;
    lastModified?: string;
    version?: string;
    specialty?: string;
    // baqi fields jo chahiye woh bhi yahan add kar sakte ho
    mainIndication?: string;
    shortDescription?: string;
    // ... etc
  };
}

export default function PrescriptionForm({
  isEdit = false,
  initialData = {},
}: PrescriptionFormProps) {
  const {
    templateName = "",
    lastModified = "",
    version = "",
    specialty = "Cardiology",
  } = initialData;

  const title = isEdit ? `Edit ${templateName || "Template"}` : "Add Template";

  const subtitle =
    isEdit && lastModified
      ? `Last modified: ${lastModified} | Current version: ${version}`
      : "";

  return (
    <div className="text-[#333]">
      <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-md">
        {/* HEADER */}
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </header>

        {/* SECTION: GENERAL INFORMATION */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 tracking-wide">
            GENERAL INFORMATION
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-1 uppercase">
                Template Name
              </label>
              <input
                type="text"
                defaultValue="Hypertension Basic Set"
                className="  border border-gray-200 p-2.5 rounded focus:ring-1 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-1 uppercase">
                Medical specialty
              </label>
              <div className="relative">
                <select className="w-full  border border-gray-200 p-2.5 rounded appearance-none outline-none">
                  <option>Cardiology</option>
                </select>
                <Icon
                  icon="mdi:chevron-down"
                  className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-1 uppercase">
                Main indication(s)
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="Essential arterial hypertension"
                  className="w-full  border border-gray-200 p-2.5 rounded pr-10 outline-none"
                />
                <Icon
                  icon="mdi:magnify"
                  className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-1 uppercase">
                Short description
              </label>
              <input
                type="text"
                defaultValue="Initial treatment for uncomplicated hypertension in adults"
                className=" border border-gray-200 p-2.5 rounded outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-2 uppercase">
                Recommended prescription type
              </label>
              <div className="flex gap-4">
                {["Standard", "Secured", "Chronic (ALD)"].map((type, idx) => (
                  <label
                    key={type}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rxType"
                      defaultChecked={idx === 0}
                      className="w-4 h-4 border-gray-300 accent-gray-700"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-2 uppercase">
                Status
              </label>
              <div className="flex gap-4">
                {["Active", "Draft", "Archived"].map((status, idx) => (
                  <label
                    key={status}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      defaultChecked={idx === 0}
                      className="w-4 h-4 border-gray-300 accent-gray-700"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: MEDICATIONS */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4 pb-2">
            <h2 className="text-lg font-bold text-gray-800 tracking-wide uppercase">
              Medications
            </h2>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-sm text-black">Medication 1</span>
              <div className="flex gap-4">
                <button className="flex items-center text-primary-color text-xs font-bold hover:text-blue-700">
                  <Icon icon="mdi:plus" className="mr-1 text-primary-color" />{" "}
                  ADD MEDICATION
                </button>
                <button className="flex items-center text-red text-xs font-bold hover:text-red-700">
                  REMOVE
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1 uppercase">
                  Medication name (INN)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="Amlodipine"
                    className="w-full  border border-gray-200 p-2.5 rounded outline-none"
                  />
                  <Icon
                    icon="mdi:magnify"
                    className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1 uppercase">
                  Form
                </label>
                <div className="relative">
                  <select className="w-full  border border-gray-200 p-2.5 rounded appearance-none outline-none">
                    <option>Tablet</option>
                  </select>
                  <Icon
                    icon="mdi:chevron-down"
                    className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1 uppercase">
                  Strength
                </label>
                <div className="relative">
                  <select className="w-full  border border-gray-200 p-2.5 rounded appearance-none outline-none">
                    <option>5mg</option>
                  </select>
                  <Icon
                    icon="mdi:chevron-down"
                    className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1 uppercase">
                  Route of administration
                </label>
                <div className="relative">
                  <select className="w-full  border border-gray-200 p-2.5 rounded appearance-none outline-none">
                    <option>Oral</option>
                  </select>
                  <Icon
                    icon="mdi:chevron-down"
                    className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                  />
                </div>
              </div>
            </div>

            {/* DOSAGE SUB-SECTION */}
            <div className="mt-6">
              <h3 className="text-xs font-bold text-black mb-4 tracking-widest uppercase">
                Dosage
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-black mb-1 uppercase">
                    Dose
                  </label>
                  <div className="relative">
                    <select className="w-full  border border-gray-200 p-2.5 rounded appearance-none outline-none">
                      <option>1 tablet(s)</option>
                    </select>
                    <Icon
                      icon="mdi:chevron-down"
                      className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-black mb-1 uppercase">
                    Frequency
                  </label>
                  <div className="relative">
                    <select className="w-full  border border-gray-200 p-2.5 rounded appearance-none outline-none">
                      <option>1 time(s) per day</option>
                    </select>
                    <Icon
                      icon="mdi:chevron-down"
                      className="absolute right-3 top-3 text-gray-400 w-5 h-5"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <label className="text-xs font-bold text-black mb-2 block uppercase">
                    Time of intake
                  </label>
                  <div className="flex gap-4">
                    {["Morning", "Noon", "Evening", "Night"].map((t) => (
                      <label key={t} className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded accent-blue-600"
                        />
                        <span className="text-gray-600 text-xs">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-black mb-2 block uppercase">
                    Relation to meals
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Before meals (30 min)",
                      "During meals",
                      "After meals",
                      "Indifferent",
                    ].map((m, idx) => (
                      <label key={m} className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="meals"
                          defaultChecked={idx === 3}
                          className="w-4 h-4 border-gray-300 accent-gray-700"
                        />
                        <span className="text-gray-600 text-xs">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1 uppercase">
                  Additional instructions
                </label>
                <textarea
                  //   rows="3"
                  defaultValue="Take at a fixed time"
                  className="w-full  border border-gray-200 p-2.5 rounded outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: DURATION & QUANTITY */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-black mb-4 tracking-tight uppercase">
            DURATION & QUANTITY
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-black mb-1">
                Treatment duration
              </label>
              <div className="relative">
                <select className="w-full  border border-gray-200 p-2 rounded appearance-none outline-none text-sm">
                  <option>30 days</option>
                </select>
                <Icon
                  icon="mdi:chevron-down"
                  className="absolute right-3 top-2.5 text-gray-400 w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-black mb-1">
                Quantity
              </label>
              <input
                type="text"
                defaultValue="30 tablets"
                className="border border-gray-200 p-2 rounded outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-black mb-1">
              Standard packaging
            </label>
            <div className="relative">
              <select className="w-full border border-gray-200 p-2 rounded appearance-none outline-none text-sm">
                <option>Box of 30</option>
              </select>
              <Icon
                icon="mdi:chevron-down"
                className="absolute right-3 top-2.5 text-gray-400 w-5 h-5"
              />
            </div>
          </div>
        </section>

        {/* SECTION: REFILLS */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-black mb-4 tracking-tight uppercase">
            REFILLS
          </h2>
          <div className="mb-4">
            <label className="text-[11px] font-bold text-black mb-1">
              Refill frequency
            </label>
            <div className="relative">
              <select className="w-full text-black border border-gray-200 p-2 rounded appearance-none outline-none text-sm">
                <option>Every 30 days</option>
              </select>
              <Icon
                icon="mdi:chevron-down"
                className="absolute right-3 top-2.5 text-gray-400 w-5 h-5"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-[11px] font-bold text-black mb-2 block">
              Refill conditions
            </label>
            <div className="flex gap-4 flex-wrap">
              {[
                "Medical consultation required",
                "Lab tests required",
                "Automatic refill",
              ].map((cond) => (
                <label
                  key={cond}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 border-gray-300 rounded"
                  />
                  <span className="text-gray-600 text-xs">{cond}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-[10px] font-bold text-black mb-2 uppercase">
              SUBSTITUTION
            </h3>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="sub"
                  defaultChecked
                  className="w-3.5 h-3.5 accent-gray-700"
                />
                <span className="text-black text-xs">Substitution allowed</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="sub"
                  className="w-3.5 h-3.5 accent-gray-700"
                />
                <span className="text-blac text-xs">Non-substitutable</span>
              </label>
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-black mb-1">
                If non-substitutable, justification:
              </label>
              <textarea
                //   rows="3"
                defaultValue="Take at a fixed time"
                className="w-full border border-gray-200 p-3 rounded outline-none resize-none text-sm"
              />
            </div>
          </div>
        </section>

        {/* SECTION: PATIENT INSTRUCTIONS */}
        <section>
          <h2 className="text-md font-bold text-gray-700 mb-4 tracking-tight uppercase">
            PATIENT INSTRUCTIONS
          </h2>
          <div className="mb-3 flex flex-col">
            <label className="text-xs font-bold text-black mb-1 uppercase">
              Patient Instructions
            </label>
            <textarea
              // rows="3"
              defaultValue="Take 1 tablet every morning at a fixed time. Do not stop without medical advice."
              className="w-full border border-gray-200 p-3 rounded outline-none resize-none text-sm"
            />
          </div>

          <label className="flex items-center space-x-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 border-gray-300 rounded"
            />
            <span className="text-gray-500 text-xs">
              These instructions will be automatically translated if needed
            </span>
          </label>

          <div className="mb-4">
            <label className="text-[11px] font-bold text-black mb-2 block uppercase">
              Refill conditions
            </label>
            <div className="space-y-1.5">
              {[
                "Complete the full treatment",
                "Take with a glass of water",
                "Avoid alcohol",
                "Avoid sun exposure",
                "Store at room temperature",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 border-gray-300 rounded"
                  />
                  <span className="text-gray-600 text-xs">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-black mb-1 uppercase">
              Side effects
            </label>
            <textarea
              // rows="3"
              defaultValue="Possible ankle edema, mild dizziness at the start of treatment."
              className="w-full border border-gray-200 p-3 rounded outline-none resize-none text-sm"
            />
          </div>
        </section>

        {/* SECTION: CLINICAL NOTES */}
        <section className="mb-10 mt-5">
          <h2 className="text-[13px] font-bold text-black mb-4 uppercase tracking-tight">
            CLINICAL NOTES
          </h2>
          <div className="mb-4">
            <label className="text-[10px] font-bold text-black mb-1 block uppercase">
              Clinical Notes
            </label>
            <textarea
              defaultValue="initial hypertension treatment."
              className="w-full border border-gray-200 p-3 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-400 min-h-[80px] resize-none"
            />
          </div>

          <div className="mb-2">
            <label className="text-[10px] font-bold text-black mb-2 block uppercase">
              Recommended monitoring
            </label>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              {[
                "Home blood pressure monitoring",
                "Follow-up consultation (4 weeks)",
                "Lab tests",
                "ECG",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-1.5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 border-gray-300 rounded"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-gray-400 italic leading-tight">
            Adjustment criteria:
            <br />
            [If BP 140/90 after 4 weeks]
            <br />
            [consider dose increase or]
            <br />
            [adding treatment]
          </p>
        </section>

        {/* SECTION: PHARMACY NOTES */}
        <section className="mb-10  pt-3">
          <h2 className="text-[13px] font-bold text-black mb-4 uppercase tracking-tight">
            PHARMACY NOTES
          </h2>
          <div className="mb-4">
            <label className="text-[10px] font-bold text-black mb-1 block uppercase">
              Pharmacy Notes
            </label>
            <textarea
              defaultValue="Check absence of contraindications. Advise home BP monitoring. Inform about possible side effects: edema"
              className="w-full border border-gray-200 p-3 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-400 min-h-[80px] resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-black mb-2 block uppercase">
              Checks to perform
            </label>
            <div className="flex flex-col space-y-1.5 text-xs text-gray-600">
              {[
                "Check drug interactions",
                "Check patient allergies",
                "Check renal function",
                "Check hepatic function",
              ].map((check) => (
                <label
                  key={check}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 border-gray-300 rounded"
                  />
                  <span>{check}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: PRECAUTIONS & CONTRAINDICATIONS */}
        <section className="mb-10 pt-3">
          <h2 className="text-[13px] font-bold text-gray-800 mb-6 uppercase tracking-tight">
            PRECAUTIONS & CONTRAINDICATIONS
          </h2>

          {["Absolute contraindication", "Relative contraindications"].map(
            (title) => (
              <div key={title} className="mb-6">
                <label className="text-[10px] font-bold text-black mb-1 block uppercase">
                  {title}
                </label>
                <textarea
                  defaultValue="Amlodipine allergy, severe hepatic impairment, hypotension"
                  className="w-full border border-gray-200 p-3 rounded-md bg-[#fcfcfc] text-sm outline-none resize-none"
                />
              </div>
            ),
          )}

          <div className="grid grid-cols-1 gap-4 mt-4">
            {["Pregnancy", "Breastfeeding", "Children", "Elderly"].map(
              (group) => (
                <div
                  key={group}
                  className="flex flex-col border-b border-gray-50 pb-3 last:border-0"
                >
                  <span className="text-[11px] font-bold text-gray-700 mb-2">
                    {group}:
                  </span>
                  <div className="flex gap-4 text-xs">
                    {["Compatible", "Caution", "Avoid"].map((status) => (
                      <label
                        key={status}
                        className="flex items-center space-x-1.5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={group}
                          defaultChecked={status === "Avoid"}
                          className="w-3.5 h-3.5 accent-gray-800"
                        />
                        <span className="text-gray-600">{status}</span>
                      </label>
                    ))}
                  </div>
                  {group === "Children" && (
                    <p className="text-[10px] text-black mt-1 italic">
                      Note: (Not recommended &lt; 6 years)
                    </p>
                  )}
                  {group === "Elderly" && (
                    <p className="text-[10px] text-black mt-1 italic">
                      Note: (Start with 5mg dose)
                    </p>
                  )}
                </div>
              ),
            )}
          </div>
        </section>

        {/* SECTION: ADVANCED SETTINGS & FOOTER */}
        <section className="mb-4 pt-3">
          <h2 className="text-[13px] font-bold text-black mb-4 uppercase tracking-tight">
            ADVANCED SETTINGS
          </h2>
          <div className="mb-6">
            <label className="text-[10px] font-bold text-black mb-2 block uppercase">
              Template visibility
            </label>
            <div className="space-y-2 text-xs text-gray-600">
              {[
                "Personal (you only)",
                "Team (your organization)",
                "Public (all doctors)",
              ].map((opt, idx) => (
                <label
                  key={opt}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="visibility"
                    defaultChecked={idx === 0}
                    className="w-3.5 h-3.5 accent-blue-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="text-[10px] font-bold text-black mb-1 block uppercase">
              Tags / Keywords
            </label>
            <div className="flex flex-wrap gap-2 text-xs text-blue-600 font-medium">
              <span>[hypertension] [HTM] [cardiology]</span>
            </div>
            <button className="text-primary-color underline text-[11px] mt-1 hover:underline flex items-center">
              <Icon
                icon="mdi:plus"
                className="mr-0.5 text-primary-color underline"
              />{" "}
              Add tag
            </button>
          </div>
        </section>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-between items-center pt-2">
          <button className="text-primary-color text-xs font-bold underline">
            Save
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50 transition">
              Preview
            </button>
            <button className="px-6 py-2 bg-gray-200 rounded-md text-xs font-bold text-gray-700 hover:bg-gray-300 transition">
              Cancel
            </button>
            <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-md text-xs font-bold hover:bg-blue-700 transition">
              {isEdit ? "Update Template" : "Create & Save Template"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
