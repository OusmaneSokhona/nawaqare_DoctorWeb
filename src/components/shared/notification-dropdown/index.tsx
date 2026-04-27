"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";

import { NotificationDropdownProps } from "@/types";
import { Button } from "../button";
import Container from "../container";
import Iconify from "../iconify";
import { Typography } from "../typography";

const NotificationDropdown: FC<NotificationDropdownProps> = ({
  className,
  notifications,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Bell Icon */}
      <div
        className="relative cursor-pointer hover:opacity-80"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Image
          src={"/assets/svg/header-bell-icon.svg"}
          height={24}
          width={24}
          alt="missing bell icon"
          className="text-[#999999]"
        />
        <span className="absolute bottom-5 left-4 text-white font-medium bg-tertiary-color rounded-full flex-shrink-0 w-5 h-5 flex items-center justify-center text-[10px] min-w-[1.225rem]">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      </div>

      {isOpen && (
        <Container styling="absolute !w-[280px] md:!w-[388px] mt-4 -right-16 z-50 ">
          <div className="py-5 flex justify-between items-center">
            <Typography
              as="h6"
              size="xl"
              className="font-bold text-primary-text pl-10"
            >
              Notification
            </Typography>
            <div className="pr-5">
              <Iconify
                icon="mdi:cross-circle-outline"
                width="24"
                height="24"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
          {/* Tabs */}
          <div className="flex border-y py-2 px-7 justify-center font-md font-normal gap-10">
            {/* <button
              className={`px-14.5 py-2.5 w-1/2 rounded-xl ${activeTab === 'all' ? 'text-white bg-primary-gradient animated-button font-medium' : 'text-primary-text bg-white'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button> */}
            <button
              className={`px-14.5 py-2.5 w-1/2 rounded-xl ${
                activeTab === "all"
                  ? "text-white bg-primary-dark font-medium"
                  : "text-primary-text bg-secondary-light"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>

            {/* <button
              className={`w-1/2 px-4 py-2 rounded-xl ${
                activeTab === 'unread'
                  ? 'text-white bg-primary-gradient animated-button font-medium'
                  : 'text-primary-text bg-white'
              }  flex items-center justify-center gap-2`}
              onClick={() => setActiveTab('unread')}
            >
              Unread
              <span className="text-white bg-red rounded-full px-2 py-1 text-xs">{unreadCount}</span>
            </button> */}
            <button
              className={`w-1/2 px-4 py-2 rounded-xl ${
                activeTab === "unread"
                  ? "text-white bg-primary-dark font-medium"
                  : "text-primary-text bg-secondary-light"
              } flex items-center justify-center gap-2`}
              onClick={() => setActiveTab("unread")}
            >
              Unread
              <span className="text-white bg-red rounded-full px-2 py-1 text-xs">
                {unreadCount}
              </span>
            </button>
          </div>
          {/* Notifications List */}
          <div className=" bg-white max-h-[250px] overflow-y-auto custom-scrollbar shadow-lg">
            {filteredNotifications.length > 0 ? (
              filteredNotifications?.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 flex border-y justify-between items-start ${notification.unread ? "bg-primary-color" : "bg-white pl-7"}`}
                >
                  <div className="flex justify-center items-start gap-2">
                    <div className="">
                      {notification.unread && (
                        <Iconify
                          className="text-primary-color1"
                          icon="prime:circle-fill"
                          width="15"
                          height="15"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Typography
                        size="md"
                        className="font-semibold text-primary-color1"
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        size="sm"
                        className="text-primary-color1 font-semibold"
                      >
                        {notification.description}
                      </Typography>
                      <div className="flex items-center gap-1">
                        <Typography
                          size="sm" 
                          className="font-normal text-primary-color1"
                        >
                          {notification.date}
                        </Typography>
                        <Typography
                          size="sm"
                          className="font-normal text-primary-color1"
                        >
                          {notification.time}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Typography size="sm" className="text-gray text-center">
                No notifications available.
              </Typography>
            )}
          </div>
          {/* View All Button */}
          <div className="w-full p-3 flex justify-center bg-white rounded-b-2xl ">
            <Button
              // variant="primary"
              onClick={() => {
                setIsOpen(false);
                router.push("/all-notification");
              }}
              className="mx-auto w-[100%] rounded-xl bg-primary-color text-white"
            >
              View All Notifications
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default NotificationDropdown;
