"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import Iconify from "@/components/shared/iconify";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { content } from "@/data";
import { axiosClient } from "@/api/base";

interface ApiNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface DisplayNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  unread: boolean;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

// Build mock fallback from existing data
const MOCK: DisplayNotification[] = (content?.allNotificationsData ?? []).map(
  (n: any) => ({
    id: n.id ?? String(Math.random()),
    title: n.title ?? "",
    description: n.description ?? "",
    date: n.date ?? "",
    time: n.time ?? "",
    unread: n.unread ?? false,
  })
);

const AllNotifications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "unread">("All");
  const [allNotifications, setAllNotifications] = useState<DisplayNotification[]>(MOCK);
  const [visibleNotifications, setVisibleNotifications] = useState<DisplayNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axiosClient
      .get("/api/v1/notifications")
      .then((res) => {
        const data: ApiNotification[] = res.data?.data ?? res.data ?? [];
        if (Array.isArray(data) && data.length > 0) {
          const mapped: DisplayNotification[] = data.map((n) => ({
            id: n.id,
            title: n.title,
            description: n.message,
            date: formatDate(n.created_at),
            time: formatTime(n.created_at),
            unread: !n.is_read,
          }));
          setAllNotifications(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredNotifications = useMemo(() => {
    return allNotifications.filter((notification) => {
      const matchesSearch = notification.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (activeTab === "unread") {
        return notification.unread && matchesSearch;
      }
      return matchesSearch;
    });
  }, [searchQuery, activeTab, allNotifications]);

  const loadMoreNotifications = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const currentLength = visibleNotifications.length;
      const more = filteredNotifications.slice(currentLength, currentLength + 10);
      setVisibleNotifications((prev) => [...prev, ...more]);
      setLoading(false);
    }, 300);
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

  const markAllRead = () => {
    axiosClient.patch("/api/v1/notifications/read-all").catch(() => {});
    setAllNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  const columns = [
    { id: "title", label: "All Notifications" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
  ];

  const unreadCount = allNotifications.filter((n) => n.unread).length;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <Typography size="h4" className="font-bold text-primary-dark">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 bg-primary-color text-white text-xs rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </Typography>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-primary-color hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>
      <Container styling="w-full overflow-hidden pb-10">
        {/* Search and Tabs */}
        <div className="p-5 md:px-8 flex flex-col sm:flex-row sm:justify-between border-b items-center gap-5">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:border-primary-color"
          />
          <div className="flex gap-4 text-md font-normal w-full sm:w-auto">
            {(["All", "unread"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTab(filter)}
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
            }: DisplayNotification) => (
              <tr
                key={id}
                className={`border-b border-light-gray ${unread ? "bg-primary-light/10" : ""} hover:bg-white transition cursor-pointer`}
                onClick={() => {
                  // Mark as read on click
                  if (unread) {
                    axiosClient.patch(`/api/v1/notifications/${id}/read`).catch(() => {});
                    setAllNotifications((prev) =>
                      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
                    );
                  }
                }}
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
                      <Typography size="md" className="text-gray mt-1 font-normal">
                        {description}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-start">
                  <Typography size="sm" className="text-primary-text">{date}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-4 text-start">
                  <Typography size="sm" className="text-primary-text">{time}</Typography>
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
          {visibleNotifications.length === 0 && !loading && (
            <div className="py-12 text-center text-gray-400">
              <Iconify icon="mdi:bell-off-outline" width="40" height="40" className="mx-auto mb-2" />
              <Typography>No notifications found</Typography>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllNotifications;
