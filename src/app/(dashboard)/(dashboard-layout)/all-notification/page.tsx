"use client";

import React, { useEffect, useRef, useState } from "react";

import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import Iconify from "@/components/shared/iconify";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { content } from "@/data";
import { useAppSelector } from "@/redux/hooks";
import { Notification } from "@/types/dashboard";

const AllNotifications: React.FC = () => {
  const searchQuery = useAppSelector((state) => state.app.filterName);
  const [activeTab, setActiveTab] = useState<"All" | "unread">("All");
  const [visibleNotifications, setVisibleNotifications] = useState<
    Notification[]
  >([]);
  const [loading, setLoading] = useState(false);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);

  const filteredNotifications = React.useMemo(() => {
    return content?.allNotificationsData.filter((notification) => {
      const matchesSearch = notification.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (activeTab === "unread") {
        return notification.unread && matchesSearch;
      }
      return matchesSearch;
    });
  }, [searchQuery, activeTab]);

  const loadMoreNotifications = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = visibleNotifications.length;
      const moreNotifications = filteredNotifications.slice(
        currentLength,
        currentLength + 10,
      );
      setVisibleNotifications((prev) => [...prev, ...moreNotifications]);
      setLoading(false);
    }, 500);
  };

  const handleScroll = () => {
    if (
      notificationsContainerRef.current &&
      notificationsContainerRef.current.scrollTop +
        notificationsContainerRef.current.clientHeight >=
        notificationsContainerRef.current.scrollHeight - 50
    ) {
      loadMoreNotifications();
    }
  };

  useEffect(() => {
    setVisibleNotifications(filteredNotifications.slice(0, 10));
  }, [filteredNotifications]);

  const columns = [
    { id: "title", label: "All Notifications" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
  ];

  return (
    <div className="w-full">
      <Typography size="h4" className="mb-2 font-bold text-primary-dark">
        Notifications
      </Typography>
      <Container styling="w-full overflow-hidden pb-10">
        {/* Search and Tabs */}
        <div className="p-5 md:px-8 flex flex-col sm:flex-row sm:justify-between border-b items-center gap-5">
          <SearchInput placeholder="Search ..." />
          <div className="flex gap-4 text-md font-normal w-full sm:w-auto">
            {["All", "unread"]?.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTab(filter as "All" | "unread")}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg ${
                  activeTab === filter
                    ? "border-primary-dark border text-primary-dark"
                    : "border-light-gray border text-dark-gray"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Table */}
        <div
          ref={notificationsContainerRef}
          className="max-h-[600px] overflow-y-auto"
          onScroll={handleScroll}
        >
          <DataTable
            ColumnsData={columns}
            tableRows={visibleNotifications}
            roundedHeader={true}
            TableBodyRow={({
              id,
              title,
              description,
              date,
              time,
              unread,
            }: Notification) => (
              <tr
                key={id}
                className={`border-b border-light-gray ${unread ? "bg-primary-light/10" : ""} hover:bg-white transition`}
              >
                <td className="px-4 lg:px-6 py-4 text-start break-words">
                  <div className="flex items-start gap-2">
                    <Iconify
                      className={`text-primary-dark relative top-[5px] ${unread ? "block" : "invisible"}`}
                      icon="prime:circle-fill"
                      width="10"
                      height="10"
                    />
                    <div className="flex flex-col gap-1">
                      <Typography
                        size="md"
                        className={`font-semibold ${unread ? "text-primary-dark" : "text-primary-text"}`}
                      >
                        {title}
                      </Typography>
                      <Typography
                        size="md"
                        className="text-gray mt-1 font-normal"
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                </td>

                <td className="px-4 lg:px-6 py-4 text-start">
                  <Typography size="sm" className="text-primary-text">
                    {date}
                  </Typography>
                </td>
                <td className="px-4 lg:px-6 py-4 text-start">
                  <Typography size="sm" className="text-primary-text">
                    {time}
                  </Typography>
                </td>
              </tr>
            )}
          />
          {loading && (
            <div className="py-4 text-center">
              <Iconify
                icon="eos-icons:loading"
                className="text-primary-dark animate-spin"
                width="24"
                height="24"
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllNotifications;
