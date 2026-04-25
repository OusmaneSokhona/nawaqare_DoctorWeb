"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import CarePlan from "@/components/shared/video-calll/careTab";
import DocumentsPlan from "@/components/shared/video-calll/video-documents";
import { useRouter } from "next/navigation";
import { moreActions } from "@/data";
import ViewReportsPage from "@/components/shared/video-calll/ViewReportsPage";
import PrescriptionVideoCall from "@/components/shared/video-calll/Prescription";
import History from "@/components/shared/video-calll/History";
import Consent from "@/components/shared/video-calll/Consent";

/* ================= CLINICAL NOTE ================= */
const ClinicalNote = ({ onChatClick }: { onChatClick: () => void }) => {
  const soapNotes = [
    {
      title: "Subjective",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
    {
      title: "Objective",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
    {
      title: "Assessment",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
    {
      title: "Plan",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
  ];

  return (
    <div className="mt-4">
      <Typography
        size="h3"
        className="text-lg font-semibold text-gray-800 mb-6"
      >
        Soap Notes
      </Typography>

      <div className="space-y-4">
        {soapNotes.map((item, index) => (
          <div key={index}>
            <Typography size="lg" className="font-bold text-[#2c2c2c]">
              {item.title}
            </Typography>

            <textarea
              defaultValue={item.description}
              className="w-full mt-1 border rounded-lg px-4 py-5 text-sm font-medium text-desc-color resize-none focus:outline-none focus:ring-1 focus:ring-primary-color min-h-[120px]"
              placeholder="Enter details..."
            />
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mt-6">
        <button className="text-primary-color font-medium">
          Sign & forward
        </button>
      </div>

      <div className="flex justify-end mt-4 gap-3">
        <button className="bg-gray-100 px-4 py-2 rounded-lg">
          Finalize note
        </button>
        <button className="bg-primary-color text-white px-4 py-2 rounded-lg">
          Save draft
        </button>
      </div>

      {/* ICONS */}
      {/* <div className="flex gap-2 flex-wrap mt-6">
        {[
          { icon: "mdi:microphone" },
          { icon: "mdi:video", bg: "bg-red" },
          { icon: "mdi:message-outline", onClick: onChatClick },
          { icon: "mdi:share-variant" },
          { icon: "mdi:dots-horizontal" },
        ].map((item, i) => (
          <div
            key={i}
            onClick={item.onClick}
            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${
              item.bg ?? "bg-[#2C2C2C]"
            }`}
          >
            <Icon icon={item.icon} width="18" className="text-white" />
          </div>
        ))}
      </div> */}
    </div>
  );
};

/* ================= MAIN PAGE ================= */
export default function MedicalObservationPage() {
  const [activeTab, setActiveTab] = useState<"clinical" | "care" | "documents">(
    "clinical",
  );
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F6F7FB]">
      {/* LEFT VIDEO */}
      <div
        className="
          w-full md:w-[65%]
          bg-black relative
          flex flex-col justify-end
          h-[280px] sm:h-[380px] md:h-auto
        "
      >
        <Image
          src="/assets/svg/videoImg3.svg"
          alt="Doctor"
          fill
          priority
          className="object-contain object-left md:object-cover"
        />

        <Image
          src="/assets/svg/video-doc.svg"
          alt="Doctor"
          width={"200"}
          height={"150"}
          className="absolute top-5 left-5 max-sm:w-[17%]"
        />

        <div className="relative z-10 bg-[#1E1E1E] text-white p-4 sm:p-5">
          <h3 className="font-semibold text-lg">Mr. Alex Martin</h3>
          <p className="text-sm text-gray-300">20 min</p>
          <p className="text-sm text-gray-400">Follow up consultation</p>

          <div className="flex items-center gap-3 mt-4">
            {/* End Button */}
            <button className="bg-red px-4 py-1 rounded-lg text-sm">End</button>

            {/* ICONS NEXT TO END BUTTON */}
            <div className="flex gap-2">
              {[
                { icon: "mdi:microphone" },
                { icon: "mynaui:video-off", bg: "bg-red" },
                {
                  icon: "mdi:message-outline",
                  onClick: () => router.push("/video-chat"),
                },
                { icon: "mdi:share-variant" },
                {
                  icon: "mdi:dots-horizontal",
                  onClick: () => setActive(true),
                  // onClick: () => router.push("/settings"),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={item?.onClick}
                  className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${
                    item.bg ?? "bg-[#2C2C2C]"
                  }`}
                >
                  <Icon icon={item.icon} width="18" className="text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {active ? (
        <div className="flex-1 bg-white p-4 sm:p-6 overflow-y-auto space-y-5">
          {!activeAction && (
            <>
              <Typography size={"h5"} as={"h5"}>
                More Action
              </Typography>

              <div className="space-y-2">
                {moreActions.map((action, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (action.link) {
                        router.push(action?.link);
                      } else {
                        setActiveAction(action?.key ?? "");
                      }
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon
                      icon={action.icon}
                      width="18"
                      height="18"
                      className="text-primary-color"
                    />
                    <Typography className="text-desc-color">
                      {action.title}
                    </Typography>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeAction && (
            <div>
              <button
                onClick={() => setActiveAction(null)}
                className="mb-4 text-primary-color font-medium"
              >
                ← Back
              </button>

              {activeAction === "clinical" && (
                <ClinicalNote onChatClick={() => router.push("/chat")} />
              )}

              {activeAction === "prescription" && <PrescriptionVideoCall />}

              {activeAction === "reports" && <ViewReportsPage />}

              {activeAction === "history" && <History />}

              {activeAction === "consent" && <Consent />}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 bg-white p-4 sm:p-6 overflow-y-auto">
          <h2 className="font-semibold text-lg text-[#2C2C2C]">
            Medical Observation & Care Plan
          </h2>

          <div className="flex gap-6 border-b mt-4 text-sm overflow-x-auto">
            {[
              { key: "clinical", label: "Clinical Note" },
              { key: "care", label: "Care Plan" },
              { key: "documents", label: "Documents" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-2 text-lg font-medium whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-primary-color border-b-2 border-primary-color"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "clinical" && (
            <ClinicalNote onChatClick={() => router.push("/chat")} />
          )}
          {activeTab === "care" && <CarePlan />}
          {activeTab === "documents" && <DocumentsPlan />}
        </div>
      )}
      {/* RIGHT PANEL */}

      {/*  */}
    </div>
  );
}
