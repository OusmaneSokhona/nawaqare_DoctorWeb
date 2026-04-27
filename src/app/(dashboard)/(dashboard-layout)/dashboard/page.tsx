"use client";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DoctorDashboard from "./upcoming/index";
import { useRouter } from "next/navigation";
import { quickActions } from "@/data";
import { getDoctorDashboardStats } from "@/api/service/dashboard";
import { DashboardStats } from "@/api/api-types";

const Home = () => {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorDashboardStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const quickStats = [
    {
      icon: "streamline:waiting-appointments-calendar-remix",
      label: "Today’s appointments",
      value: loading ? "—" : String(stats?.today_appointments ?? 0),
    },
    {
      icon: "fluent:chat-12-regular",
      label: "Total patients",
      value: loading ? "—" : String(stats?.total_patients ?? 0),
    },
    {
      icon: "mdi:clock-outline",
      label: "Pending bookings",
      value: loading ? "—" : String(stats?.pending_bookings ?? 0),
    },
    {
      icon: "mdi:check-circle-outline",
      label: "Completed consultations",
      value: loading ? "—" : String(stats?.completed_consultations ?? 0),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div
          className="bg-background-color4 lg:col-span-2 max-md:basis-full max-h-[fit-content] rounded-lg shadow-sm p-5 transition-all duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-lg"
        >
          <div className="flex justify-between max-sm:flex-col max-sm:gap-5">
            <div className="">
              <div className=" flex gap-3">
                <div className="relative inline-block">
                  <Image
                    src="/assets/svg/sehrImg2.svg"
                    width={86}
                    height={84}
                    alt="img"
                    className="rounded-full w-[100px] h-[100px]"
                  />

                  {/* Green status dot */}
                  <div className="absolute right-2 top-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div>
                  <Typography
                    size="h4"
                    as={"h4"}
                    className="text-[#2C2C2C] font-bold"
                  >
                    Hello,
                  </Typography>
                  <Typography
                    size="h4"
                    as={"h4"}
                    className="text-[#2C2C2C] font-bold"
                  >
                    Dr. Sarah
                  </Typography>
                </div>
              </div>
              <div className="mt-2">
                <Typography className="text-[#4F4F4F] text-[18px] font-semibold">
                  Monday, 20 Oct at 10:30 AM
                </Typography>
                <Typography className="text-desc-color text-[18px] font-bold">
                  Mr. Alex
                </Typography>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <div className="relative flex  mt-1">
                {/* Ripple layer */}
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-wave"></span>

                {/* Main dot */}
                <div className="relative w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <div className="border border-gray-400 h-5"></div>
              <div>
                <Typography className="text-desc-color ">
                  Last sync: 4 min ago
                </Typography>
              </div>
              <Icon
                icon="material-symbols-light:lock-outline"
                width="20"
                height="20"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div
            className="bg-background-color4 transition-all duration-300 ease-out
            hover:-translate-y-2 hover:shadow-lg rounded-lg p-5"
          >
            <Typography size="h5" className="text-[#2C2C2C]">
              Quick Statistics
            </Typography>

            {quickStats.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-4"
              >
                <div className="flex gap-2 items-center">
                  <Icon
                    className="text-primary-color"
                    icon={item.icon}
                    width={24}
                    height={24}
                  />
                  <Typography className="text-text-color  font-semibold">
                    {item.label}
                  </Typography>
                </div>

                <Typography className="text-text-color  font-semibold">
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <Typography size="h5" className="text-[#2C2C2C]">
              Ongoing Agenda
            </Typography>
            <div
              className="bg-background-color4  transition-all duration-300 ease-out
               hover:-translate-y-2 hover:shadow-lg p-5 mt-5 rounded-lg"
            >
              <div className="flex justify-between max-md:flex-col gap-3">
                <div className=" flex gap-3 items-center">
                  <Image
                    src="/assets/svg/sehrImg2.svg"
                    width={86}
                    height={84}
                    alt="img"
                    className="rounded-full w-[100px] h-[100px]"
                  />
                  <div className=" space-y-1">
                    <Typography
                      size="h5"
                      className="text-[#2C2C2C] font-bold text-xl"
                    >
                      Mr. Alex
                    </Typography>
                    <Typography className="text-text-color font-medium">
                      44 years . Male . Lahore
                    </Typography>
                    <div className="flex max-md:flex-col gap-4 max-md:gap-2">
                      <div className="flex gap-1 items-center">
                        <Icon
                          className="text-primary-color"
                          icon="mdi:clock-outline"
                          width={20}
                          height={20}
                        />
                        <Typography className="text-[#2C2C2C] font-medium">
                          11;30 Am
                        </Typography>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Icon
                          className="text-primary-color"
                          icon="mingcute:phone-call-line"
                          width={20}
                          height={20}
                        />
                        <Typography className="text-[#2C2C2C] font-medium">
                          Remote Consultation
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="text-primary-color"
                      icon="mdi:clock-outline"
                      width={20}
                      height={20}
                    />
                    <Typography className="text-[#2C2C2C] font-medium ">
                      Start in 10 mint
                    </Typography>
                  </div>
                  <div className="bg-primary-color cursor-pointer rounded-full flex items-center justify-center px-3 py-1.5">
                    <Typography className="text-white font-medium">
                      Join Consultation
                    </Typography>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between maxmd:flex-col gap-2">
                <div className="flex max-md:flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-primary-color"
                      icon="uil:calender"
                      width={22}
                      height={22}
                    />
                    <Typography className="text-[#2C2C2C] font-medium">
                      # 53 Wating
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-primary-color"
                      icon="mdi:clock-outline"
                      width={22}
                      height={22}
                    />
                    <Typography className="text-[#2C2C2C] font-medium">
                      High Blood pressure
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-primary-color"
                      icon="mingcute:phone-call-line"
                      width={22}
                      height={22}
                    />
                    <Typography className="text-[#2C2C2C] font-medium">
                      Allergy
                    </Typography>
                  </div>
                </div>
                <Typography
                  onClick={() => router.push("/bookings")}
                  className="text-primary-color cursor-pointer underline font-semibold text-md"
                >
                  View Detail
                </Typography>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 mt-4">
            <Typography size="h5">Quick Actions</Typography>
            <div className="flex justify-between flex-wrap items-center gap-2 bg-background-color4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg rounded-lg px-5 py-12 mt-5">
              {quickActions.map((action, i) => (
                <div
                  key={i}
                  onClick={() => router.push(action?.link)}
                  className="cursor-pointer"
                >
                  <div
                    style={{
                      backgroundColor: action.bg,
                    }}
                    className="p-2.5 flex items-center justify-center rounded-xl"
                  >
                    <Icon
                      className="text-white"
                      icon={action.icon}
                      width={40}
                      height={40}
                    />
                  </div>
                  <Typography className="!text-[2px] sm:text-[5px] xl:text-[6px] 2xl:text-[10px] text-center text-[#2C2C2C] font-memdium 2xl:font-extrabold mt-1">
                    {action.title}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DoctorDashboard />
      </div>
    </div>
  );
};

export default Home;
