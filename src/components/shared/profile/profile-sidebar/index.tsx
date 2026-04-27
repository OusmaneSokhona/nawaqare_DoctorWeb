"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

export default function ProfileSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Update Password", href: "/profile/update-password" },
    { label: "My Services", href: "/profile/my-service" },
    { label: "Privacy & Security", href: "/profile/privacy-security" },
    { label: "Change Language", href: "/profile/language" },
    { label: "Billing & Subscription", href: "/profile/billing" },
  ];

  return (
    <div className="flex-shrink-0 max-h-fit bg-[#dae0f8] w-full md:w-[240px] rounded-2xl py-6 px-4">
      {/* PROFILE CARD */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/assets/svg/header-profile-image.svg"
          width={100}
          height={100}
          alt="profile"
          className="rounded-full object-cover"
        />

        <div className="flex items-center gap-2 mt-3">
          <Typography size="h6" className="font-semibold">
            Dr. Ali Shah
          </Typography>
          <Icon
            icon="mdi:check-decagram"
            className="text-green-500"
            width={18}
          />
        </div>

        <Typography className="text-xs text-gray-500 mt-1">
          Last update: 12/Sep/2025
        </Typography>

        {/* PROGRESS */}
        <div className="w-full mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Profile Completion</span>
            <span>40%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded">
            <div className="bg-primary-color h-1.5 rounded w-[40%]" />
          </div>
        </div>

        <button className="mt-4 bg-primary-color text-white text-xs px-4 py-2 rounded-lg">
          Replace photo
        </button>
      </div>

      {/* MENU */}
      <div className="mt-6 border-t pt-4 space-y-1 text-sm">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`block w-full text-left px-3 py-2 rounded-lg transition ${
              pathname.startsWith(item.href)
                ? "bg-primary-color text-white"
                : "hover:bg-primary-color hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* DANGER ZONE */}
      <div className="mt-4 border-t pt-3 space-y-1 text-sm">
        <button className="block w-full text-left px-3 py-2 text-red hover:bg-red-50 rounded-lg">
          Log Out
        </button>

        <button className="block w-full text-left px-3 py-2 text-red hover:bg-red-100 rounded-lg">
          Delete Account
        </button>
      </div>
    </div>
  );
}
