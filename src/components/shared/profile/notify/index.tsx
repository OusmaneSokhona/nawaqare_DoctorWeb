// 'use client'
// import React, { useState } from "react";
// import { Button } from "../../button";
// import { Typography } from "../../typography";

// type NotificationKey = "emailAlerts" | "systemNotifications" | "weeklyReports";

// const PrivacyPreferences = () => {
//   const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
//     emailAlerts: true,
//     systemNotifications: false,
//     weeklyReports: true,
//   });

//   const [visibility, setVisibility] = useState({
//     profileVisibility: "Visible to other admins",
//     postVisibility: "Public",
//   });

//   const [theme, setTheme] = useState("Light");
//   const [dataRetention, setDataRetention] = useState("30 Days");

//   const toggleNotification = (key: NotificationKey) => {
//     setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div className="w-full">
//       <Typography size='h4' as='h4' className=" mb-4 text-primary-color2 font-bold">Privacy & Preferences</Typography>

//       {/* Notifications */}
//       <section className="mb-6">
//         <Typography size='h6' as='h6' className=" mb-4 text-primary-color2 font-bold">Notifications</Typography>

//         {[
//           {
//             label: "Email alerts to see appointments",
//             key: "emailAlerts",
//           },
//           {
//             label: "System notifications for new journey tasks",
//             key: "systemNotifications",
//           },
//           {
//             label: "Weekly performance summaries",
//             key: "weeklyReports",
//           },
//         ].map((item) => (
//           <div key={item.key} className="flex justify-between space-y-2 items-center mb-4">
//             <Typography size='h6'  className=" mb-3 text-primary-color2 font-semibold">{item.label}</Typography>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={notifications[item.key as NotificationKey]}
//                 onChange={() => toggleNotification(item.key as NotificationKey)}
//               />
//               <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#3DC0BA] transition"></div>
//               <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
//             </label>
//           </div>
//         ))}
//       </section>

//       {/* Visibility */}
//       <section className="mb-6">
//         <Typography size='h6' as='h6' className=" mb-4 text-primary-color2 font-bold">Visibility</Typography>

//         <div className="mb-4 pt-1 space-y-2">
//           <span className="block font-semibold">Profile Visibility</span>
//           <div className="flex flex-col gap-3 pl-2">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="profileVisibility"
//                 value="Visible to other admins"
//                 checked={visibility.profileVisibility === "Visible to other admins"}
//                 onChange={(e) =>
//                   setVisibility({ ...visibility, profileVisibility: e.target.value })
//                 }
//                 className="accent-primary-color"
//               />
//               <span>Visible to other admins</span>
//             </label>

//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="profileVisibility"
//                 value="Private"
//                 checked={visibility.profileVisibility === "Private"}
//                 onChange={(e) =>
//                   setVisibility({ ...visibility, profileVisibility: e.target.value })
//                 }
//                 className="accent-primary-color"
//               />
//               <span>Private</span>
//             </label>
//           </div>
//         </div>
//       </section>

//       {/* Display Preferences */}
//       <section className="mb-6">
//         <Typography size='h6' as='h6' className=" mb-4 text-primary-color2 font-bold">Display Preferences</Typography>

//         <label className="block">
//           <span className="block mb-1 font-semibold">Theme</span>
//           <select
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//             className="w-full px-3 py-4 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option>Light</option>
//             <option>Dark</option>
//             <option>System Default</option>
//           </select>
//         </label>
//       </section>

//       {/* Data Retention */}
//       <section className="mb-8">
//         <Typography size='h6' as='h6' className=" mb-4 text-primary-color2 font-bold">Data Retention</Typography>

//         <label className="block">
//           <span className="block mb-1 font-semibold">Retain logs for</span>
//           <select
//             value={dataRetention}
//             onChange={(e) => setDataRetention(e.target.value)}
//             className="w-full px-3 py-4 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option>30 Days</option>
//             <option>60 Days</option>
//             <option>90 Days</option>
//             <option>Indefinitely</option>
//           </select>
//         </label>
//       </section>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-3">
//         <button className="px-6 py-2 text-gray-700 text-xl underline text-secondary-color font-bold">
//           Cancel
//         </button>
//         <Button className="px-6 py-2 bg-primary-color text-white font-bold rounded-xl hover:bg-blue-700 transition">
//           Update
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPreferences;
