"use client";

import ProfileHeader from "@/components/shared/profile/profile-header";
import ProfileSidebar from "@/components/shared/profile/profile-sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-1 sm:px-4 py-5">
      <ProfileHeader />

      <div className="flex items-stretch max-md:flex-col gap-5">
        <ProfileSidebar />

        <div className="flex-1 bg-white rounded-2xl px-4 sm:px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
