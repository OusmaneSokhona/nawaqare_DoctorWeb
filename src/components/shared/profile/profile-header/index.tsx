// // "use client";

// // import { Typography } from "@/components/shared/typography";

// //   export type Tab =
// //   | "profile"
// //   | "edit-info"
// //   | "security"
// //   | "privacy"
// //   | "service";

// // interface Props {
// //   activeTab: Tab;
// //   setActiveTab: (tab: Tab) => void;
// // }

// // const tabs = [
// //   { key: "profile", label: "Personal Information" },
// //   { key: "edit-info", label: "Professional Info" },
// //   { key: "security", label: "Documents & Revalidation" },
// // ];

// // export default function ProfileHeader({
// //   activeTab,
// //   setActiveTab,
// // }: Props) {
// //   return (
// //     <div className="mb-6">
// //       {/* HEADING */}
// //       <Typography size="h4" className="font-semibold">
// //         Good Morning, Musfiq
// //       </Typography>
// //       <Typography className="text-sm text-gray-500 mt-1">
// //         Manage Your Account Information And Security Settings
// //       </Typography>

// //       {/* TOP TABS */}
// //       <div className="flex gap-6 mt-4 border-b border-gray-200">
// //         {tabs.map((tab) => (
// //           <button
// //             key={tab.key}
// //             onClick={() => setActiveTab(tab.key as Tab)}
// //             className={`pb-3 text-sm font-medium transition
// //               ${
// //                 activeTab === tab.key
// //                   ? "text-primary-color border-b-2 border-primary-color"
// //                   : "text-gray-500 hover:text-primary-color"
// //               }`}
// //           >
// //             {tab.label}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { Typography } from "@/components/shared/typography";

// const tabs = [
//   { label: "Personal Information", href: "/profile" },
//   { label: "Professional Info", href: "/profile/personal-info" },
//   { label: "Documents & Revalidation", href: "/profile/document-info" },
// ];

// export default function ProfileHeader() {
//   const pathname = usePathname();
//   const router = useRouter();

//   return (
//     <div className="mb-6">
//       <Typography size="h4" className="font-semibold">
//         Good Morning, Musfiq
//       </Typography>

//       <div className="flex gap-6 mt-4 border-b">
//         {tabs.map((tab) => (
//           <button
//             key={tab.href}
//             onClick={() => router.push(tab.href)}
//             className={`pb-3 text-sm font-medium ${
//               pathname === tab.href
//                 ? "text-primary-color border-b-2 border-primary-color"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { usePathname, useRouter } from "next/navigation";
import { Typography } from "@/components/shared/typography";

const tabs = [
  { label: "Personal Information", href: "/profile" },
  { label: "Professional Info", href: "/profile/personal-info" },
  { label: "Documents & Revalidation", href: "/profile/document-info" },
];

export default function ProfileHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mb-6">
      {/* TITLE */}
      <Typography size="h4" className="font-semibold">
        Good Morning, Musfiq
      </Typography>

      {/* TABS */}
      <div
        className="
          mt-4
          border-b
          flex
          gap-6
          overflow-x-auto
          scrollbar-hide
          whitespace-nowrap
          -mx-4 px-4
          sm:mx-0 sm:px-0
        "
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <button
              key={tab.href}
              onClick={() => router.push(tab.href)}
              className={`
                pb-3
                text-sm
                font-medium
                flex-shrink-0
                transition
                ${
                  isActive
                    ? "text-primary-color border-b-2 border-primary-color"
                    : "text-gray-500 hover:text-primary-color"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
