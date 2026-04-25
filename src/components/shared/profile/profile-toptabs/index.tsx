"use client";

type Tab = "profile" | "edit-info" | "security";

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs = [
  { key: "profile", label: "Personal Info" },
  { key: "edit-info", label: "Professional Info" },
  { key: "security", label: "Documents & Revalidation" },
];

export default function ProfileTopTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex gap-6 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key as Tab)}
          className={`pb-3 text-sm font-medium transition
            ${
              activeTab === tab.key
                ? "text-primary-color border-b-2 border-primary-color"
                : "text-gray-500 hover:text-primary-color"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
