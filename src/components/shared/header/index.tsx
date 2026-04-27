"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { content } from "@/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setEditDayDrawerOpen,
  setIsDrawerOpen,
} from "@/redux/slices/app-slice";
import HeaderProfileDropDown from "../header-profile-dropdown";
import Iconify from "../iconify";
import NotificationDropdown from "../notification-dropdown";
import SearchInput from "../search-bar";
import { Typography } from "../typography";
import { Icon } from "@iconify/react";
import { useIsMobile } from "@/hooks/useIsMobile";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isDrawerOpen } = useAppSelector((state) => state.app);
  const pathname = usePathname() || "";
  const isMobile = useIsMobile();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDrawer = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  const profileDropdownOptions = content?.dropdownItems;
  const notifications = content?.notificationsData;

  // Map routes to headings
  const headingMap: Record<string, string> = {
    // "/reviews": "Reviews",
    "/faqs": "Help Center",
    "/consent": "Consent",
    "/specialty": "Speciality/Conditions",
    "/profile": "My Profile",
    "/doctors/add": "Add Doctor",
    "/reception/calender": "Calendar",
    "/reception/view-patient": "View as Patient",
    "/reception/absence": "Absences & Exceptions",
  };

  const dynamicHeadingMap: { prefix: string; label: string }[] = [
    { prefix: "/patients/details", label: "Patient Details" },
    { prefix: "/reviews/details", label: "Review Details" },
    { prefix: "/contact-us/details/", label: "Inquiry Detail" },
    { prefix: "/payment-history/details/", label: "Payment Detail" },
    { prefix: "/doctors/details", label: "Doctor Details" },
    { prefix: "/doctors/edit/", label: "Edit Doctor Details" },
    { prefix: "/bookings/details", label: "Booking Details" },
    { prefix: "/pharmacies/details", label: "Pharmacy Detail" },
    { prefix: "/prescriptions/details", label: "Prescription Detail" },
    { prefix: "/payment-history/details", label: "Payment  Detail" },
    { prefix: "/contact-us/details", label: "Inquiry Detail" },
    { prefix: "/partners/details", label: "Partner Details" },
    { prefix: "/consultation/details", label: " Pack Detail" },
    { prefix: "/prescriptions/template-details", label: "Template Detail" },
  ];

  let currentHeading = headingMap[pathname] || null;
  if (!currentHeading) {
    const dynamicMatch = dynamicHeadingMap.find(({ prefix }) =>
      pathname.startsWith(prefix),
    );
    currentHeading = dynamicMatch ? dynamicMatch.label : null;
  }

  const showArrow = [
    "/profile",
    "/doctors/add",
    "/patients/details/",
    "/doctors/details/",
    "/doctors/edit/",
    "/bookings/details/",
    "/payment-history/details/",
    "/contact-us/details/",
    "/reviews/details/",
    "/pharmacies/details",
    "/prescriptions/details",
    "/payment-history/details",
    "/contact-us/details",
    "/reviews/details",
    "/patients/details",
    "/doctors/details",
    "/partners/details",
    "/consultation/details",
    "/prescriptions/template-details",
    "/reception/calender",
    "/reception/view-patient",
    "/reception/absence",
  ];

  const shouldShowArrow = (path: string) => {
    return showArrow.some((route) =>
      route.endsWith("/") ? path.startsWith(route) : path === route,
    );
  };

  // Check routes
  const isPatientDetails =
    pathname.startsWith("/patient/details") ||
    pathname.startsWith("/patients/details");
  const isDoctorDetails =
    pathname.startsWith("/doctor/details") ||
    pathname.startsWith("/doctors/details");
  const isPharmacyDetails =
    pathname.startsWith("/pharmacies/details") ||
    pathname.startsWith("/pharmacies/details");
  const isBookingDetails =
    pathname.startsWith("/bookings/details") ||
    pathname.startsWith("/pharmacies/details");
  const isCalender =
    pathname.startsWith("/reception/calender") ||
    pathname.startsWith("/reception/calender");

  const handleExportPDF = () => console.log("Export PDF clicked");
  const handleSuspend = () => console.log("Suspend clicked");
  const handleReject = () => console.log("Reject clicked");
  const handleAccept = () => console.log("Accept clicked");

  return (
    <div className="bg-[#FBF6FC] px-7 py-4 max-sm:px-4 max-sm:py-4 max-lg:space-y-5">
      <div>
        <button
          className="xl:hidden flex items-center justify-center cursor-pointer p-2 bg-white rounded-full shadow-md"
          onClick={toggleDrawer}
        >
          <Iconify
            icon="hugeicons:menu-02"
            width="32"
            height="32"
            color="#1a5f44"
          />
        </button>
      </div>

      <div className="flex justify-between items-center max-sm:flex-col max-sm:items-stretch max-sm:gap-5">
        <div className="max-sm:order-2 max-sm:w-full">
          {currentHeading ? (
            <Typography
              as="h4"
              size="h4"
              className="font-bold flex items-center gap-3"
            >
              {shouldShowArrow(pathname) && (
                <Icon
                  icon="mingcute:arrow-left-fill"
                  width="24"
                  height="20"
                  className="text-primary-color cursor-pointer"
                  onClick={() => router.back()}
                />
              )}
              {currentHeading}
            </Typography>
          ) : (
            <SearchInput
              width={isMobile ? "250" : "498"}
              placeholder="Search patient name, phone, DOB"
            />
          )}
        </div>

        <div className="flex justify-between gap-4 max-sm:w-full md:justify-end items-center md:gap-6 max-sm:order-1">
          <div className="flex items-center max-sm:justify-end gap-2 md:gap-4 w-full">
            {/* ------------------- Conditional Buttons ------------------- */}
            {isPatientDetails ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportPDF}
                  className="w-[130px] h-[44px] rounded-lg border border-border-color text-[#828282] bg-[#A7A7A733] text-sm font-semibold"
                >
                  Advance Export
                </button>
                {/* <button
                  onClick={handleExportPDF}
                  className="w-[130px] h-[44px] rounded-lg  text-[#F2994A] bg-[#F2994A33] text-sm font-semibold"
                >
                  Send Notification
                </button> */}
                <button
                  onClick={handleSuspend}
                  className="w-[130px] h-[44px] rounded-lg text-sm font-semibold bg-[#2F80ED] text-white hover:bg-red-700"
                >
                  Add Follow-up
                </button>
              </div>
            ) : isDoctorDetails ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReject}
                  className="w-[130px] h-[44px] rounded-lg border border-border-color text-[#828282] bg-[#A7A7A733] text-sm font-semibold"
                >
                  Reject
                </button>
                <button
                  onClick={handleAccept}
                  className="w-[130px] h-[44px] rounded-lg text-sm font-semibold bg-secondary-color text-white hover:opacity-90"
                >
                  Accept
                </button>
              </div>
            ) : isPharmacyDetails ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportPDF}
                  className="w-[130px] h-[44px] rounded-lg border border-border-color text-[#828282] bg-[#A7A7A733] text-sm font-semibold"
                >
                  Export PDF
                </button>
                <button
                  onClick={handleSuspend}
                  className="w-[130px] h-[44px] rounded-lg text-sm font-semibold bg-red text-white hover:bg-red-700"
                >
                  Suspend Account
                </button>
              </div>
            ) : isBookingDetails ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportPDF}
                  className="w-[130px] h-[44px] rounded-lg border border-border-color text-[#828282] bg-[#A7A7A733] text-sm font-semibold"
                >
                  Reschedule
                </button>
                <button
                  onClick={handleSuspend}
                  className="w-[130px] h-[44px] rounded-lg text-sm font-semibold bg-primary-color text-white hover:bg-red-700"
                >
                  Join Consultation
                </button>
              </div>
            ) : isCalender ? (
              <div className="flex items-center gap-3">
                <button
                  // onClick={handleExportPDF}
                  onClick={() => dispatch(setEditDayDrawerOpen(true))}
                  className="w-[130px] h-[44px] rounded-lg border border-border-color text-[#828282] bg-[#A7A7A733] text-sm font-semibold"
                >
                  Edit Day
                </button>
                <button
                  onClick={() => router.push("/reception/view-patient")}
                  className="w-[130px] h-[44px] rounded-lg text-sm font-semibold bg-primary-color text-white hover:bg-red-700"
                >
                  View as Patient
                </button>
              </div>
            ) : (
              <>
                <div className="cursor-pointer">
                  <NotificationDropdown notifications={notifications} />
                </div>
                <div>
                  <Icon
                    icon="charm:info"
                    width={32}
                    height={32}
                    className="text-[#828282]"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="cursor-pointer">
                    <HeaderProfileDropDown
                      dropdownItems={profileDropdownOptions}
                      placeholder={"/assets/svg/header-profile-image.svg"}
                      isOpen={isProfileOpen}
                      setIsOpen={setIsProfileOpen}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
