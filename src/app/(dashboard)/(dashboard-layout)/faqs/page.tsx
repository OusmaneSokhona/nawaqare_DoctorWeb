"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import EditFaqModal from "@/components/ui/modals/faqs-model/EditFaq";
import { Button } from "@/components/shared/button";
import { useRouter } from "next/navigation";

const FAQS = () => {
  const [faqs, setFaqs] = useState([
    // ---------------- Video Call ----------------
    {
      id: "1",
      title: "Video call not working?",
      desc: "Please check your internet connection and ensure camera and microphone permissions are enabled in your browser settings.",
      status: "Active",
      category: "Video Call",
    },
    {
      id: "2",
      title: "Can I switch from video to audio during consultation?",
      desc: "Yes, you can turn off your camera anytime and continue the session using audio only.",
      status: "Active",
      category: "Video Call",
    },
    {
      id: "3",
      title: "What if the doctor doesn’t join the call?",
      desc: "If the doctor fails to join within 10 minutes of the scheduled time, you may reschedule or request a refund.",
      status: "Active",
      category: "Video Call",
    },

    // ---------------- Prescriptions ----------------
    {
      id: "4",
      title: "How do prescriptions work?",
      desc: "Prescriptions are issued digitally after consultation and can be downloaded from your account dashboard.",
      status: "Active",
      category: "Prescriptions",
    },
    {
      id: "5",
      title: "Can I use the prescription at any pharmacy?",
      desc: "Yes, our digital prescriptions are valid at licensed pharmacies unless otherwise stated by the doctor.",
      status: "Active",
      category: "Prescriptions",
    },
    {
      id: "6",
      title: "How long is a prescription valid?",
      desc: "Prescription validity depends on the medication and local regulations. Please consult the issued document for expiry details.",
      status: "Active",
      category: "Prescriptions",
    },

    // ---------------- Payments ----------------
    {
      id: "7",
      title: "How do payments work?",
      desc: "Payments are processed securely through our encrypted payment gateway using supported cards and online methods.",
      status: "Active",
      category: "Payments",
    },
    {
      id: "8",
      title: "Can I get a refund?",
      desc: "Refunds are available for cancelled appointments based on our cancellation policy.",
      status: "Active",
      category: "Payments",
    },
    {
      id: "9",
      title: "Why was my payment declined?",
      desc: "Payments may be declined due to insufficient balance, incorrect card details, or bank restrictions.",
      status: "Active",
      category: "Payments",
    },

    // ---------------- Legal & Compliance ----------------
    {
      id: "10",
      title: "Is my medical data secure?",
      desc: "Yes, all personal and medical data is encrypted and stored according to healthcare data protection regulations.",
      status: "Active",
      category: "Legal & Compliance",
    },
    {
      id: "11",
      title: "Do you comply with healthcare regulations?",
      desc: "Yes, our platform complies with applicable healthcare and data protection laws.",
      status: "Active",
      category: "Legal & Compliance",
    },

    // ---------------- Account & Security ----------------
    {
      id: "12",
      title: "How do I reset my password?",
      desc: "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email.",
      status: "Active",
      category: "Account & Security",
    },
    {
      id: "13",
      title: "How can I update my profile information?",
      desc: "You can update your personal details from the Account Settings section in your dashboard.",
      status: "Active",
      category: "Account & Security",
    },
    {
      id: "14",
      title: "How do I delete my account?",
      desc: "To permanently delete your account, please contact support or use the delete option available in account settings.",
      status: "Active",
      category: "Account & Security",
    },
  ]);

  const TABS = [
    "All",
    "Video Call",
    "Prescriptions",
    "Payments",
    "Legal & Compliance",
    "Account & Security",
  ];

  const [activeTab, setActiveTab] = useState("All");

  const quickData = [
    {
      icon: "material-symbols:video-call-rounded",
      title: "Video call issues",
    },
    {
      icon: "mingcute:prescription-fill",
      title: "Prescriptions & signing",
    },
    {
      icon: "streamline:waiting-appointments-calendar-solid",
      title: "Appointments & agenda",
    },
    {
      icon: "material-symbols:payments",
      title: "Payments & payouts",
    },
    {
      icon: "solar:document-bold",
      title: " Medical documents & reports",
    },
    {
      icon: "material-symbols:lock",
      title: "Security & access",
    },
    {
      icon: "weui:setting-filled",
      title: " Account & settings",
    },
  ];

  const stats = [
    { icon: "ic-baseline-phone", stat: "Phone", title: "03 5432 1234" },
    { icon: "ic-baseline-email", stat: "Email", title: "Abc@gmail.com" },
    // { icon: "material-symbols:draft", stat: "5", title: "Most Viewed FAQ" },
    // { icon: "material-symbols:update", stat: "40%", title: "Helpful" },
  ];

  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [openfaq, setOpenfaq] = useState<number | null>(null);
  const [isOpenEditFaq, setIsOpenEditFaq] = useState<boolean>(false);
  const [editingFaq, setEditingFaq] = useState<number | null>(null);
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // NEW: Three dots dropdown state per row
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const onClose = () => {
    setIsOpenEditFaq(false);
    setEditingFaq(null);
  };

  // const handleSaveFaq = (question: string, answer: string, status: string, id:string) => {
  //   if (modalMode === "add") {
  //     setFaqs((prev) => [...prev, { title: question, desc: answer, status,id }]);
  //   } else if (modalMode === "edit" && editingFaq !== null) {
  //     setFaqs((prev) =>
  //       prev.map((faq, i) =>
  //         i === editingFaq ? { title: question, desc: answer, status,id } : faq
  //       )
  //     );
  //   }
  //   onClose();
  // };

  // const handleSaveFaq = (question: string, answer: string, status: string) => {
  //   if (modalMode === "add") {
  //     setFaqs((prev) => [
  //       ...prev,
  //       {
  //         id: String(Date.now()), // Generate unique id
  //         title: question,
  //         desc: answer,
  //         status,
  //       },
  //     ]);
  //   } else if (modalMode === "edit" && editingFaq !== null) {
  //     setFaqs((prev) =>
  //       prev.map((faq, i) =>
  //         i === editingFaq
  //           ? {
  //               ...faq,
  //               title: question,
  //               desc: answer,
  //               status,
  //             }
  //           : faq,
  //       ),
  //     );
  //   }

  //   onClose();
  // };

  const statusOptions = ["All", "Active", "InActive"];
  const filteredFaqs = faqs.filter((faq) => {
    const statusMatch = statusFilter ? faq.status === statusFilter : true;

    const categoryMatch = activeTab === "All" || faq.category === activeTab;

    return statusMatch && categoryMatch;
  });

  const handleStatusSelect = (status: string) => {
    setStatusFilter(status === "All" ? "" : status);
    setIsDropdownOpen(false);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex max-md:flex-col max-md:items-start max-md:gap-3 justify-between items-center">
        {/* <div>
          <Typography size="h3" as="h3">
            Help Center
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Find answers, guides, and support to help you use the platform with
            ease.
          </Typography>
        </div> */}

        {/* <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className=" rounded-lg bg-border-color flex items-center justify-center cursor-pointer"
            >
              <Typography>{statusFilter || "Status"}</Typography>
              <Icon icon="mdi:chevron-down" width="16" height="16" className="ml-2" />
            </Button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleStatusSelect(option)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Typography>{option}</Typography>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            className="flex items-center justify-center w-[180px] bg-primary-dark rounded-lg text-white cursor-pointer"
            onClick={() => {
              setModalMode("add");
              setIsOpenEditFaq(true);
            }}
          >
            <Icon icon="tdesign:plus" width="24" height="24" />
            <Typography className="text-white">Add FAQ’s</Typography>
          </Button>
        </div> */}
      </div>

      {/* Stats */}
      {/* <div className="pt-5 flex flex-wrap gap-5 items-center">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-md w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
          >
            <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
              <Icon
                icon={activity.icon}
                width="24"
                height="24"
                className="text-white"
              />
            </div>
            <Typography size="h4" as="h4">
              {activity.stat}
            </Typography>
            <Typography>{activity.title}</Typography>
          </div>
        ))}
      </div> */}
      <div className="bg-white rounded-xl p-6 mt-4">
        <Typography size="h5" className="text-[#2c2c2c] font-semibold">
          Consultation payment
        </Typography>
        <Typography className="text-desc-color font-medium pt-1">
          Appointment id:Adp-1234567
        </Typography>
        <div className="flex max-md:flex-col gap-5 mt-6">
          <div
            className="basis-[50%]  transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl
        cursor-pointer border space-y-1 rounded-xl px-5 py-5"
          >
            <div className="bg-primary-color flex items-center justify-center w-[40px] h-[40px] rounded-full">
              <Icon
                className="text-white"
                icon="ic:baseline-phone"
                width={24}
                height={24}
              />
            </div>
            <Typography size="lg" className="font-semibold text-[#2c2c2c]">
              Phone
            </Typography>
            <Typography size="md" className="font-semibold text-[#2c2c2c]">
              03 5432 1234
            </Typography>
            <Typography size="md" className="font-semibold text-[#2c2c2c]">
              Reply in : 5mint
            </Typography>
          </div>
          <div
            className="basis-[50%]  transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl
        cursor-pointer border space-y-1 rounded-xl px-5 py-5"
          >
            <div className="bg-primary-color flex items-center justify-center w-[40px] h-[40px] rounded-full">
              <Icon
                className="text-white"
                icon="ic:baseline-email"
                width={24}
                height={24}
              />
            </div>
            <Typography size="lg" className="font-semibold text-[#2c2c2c]">
              Email
            </Typography>
            <Typography size="md" className="font-semibold text-[#2c2c2c]">
              Abc@gmail.com
            </Typography>
            <Typography size="md" className="font-semibold text-[#2c2c2c] pb-3">
              Reply in : 5mint
            </Typography>
            <div className="bg-primary-color flex items-center justify-center rounded-xl py-3">
              <Typography className="text-white font-medium">
                Contact Support
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-wrap gap-5 mt-5 bg-white rounded-xl p-6">
          {quickData.map((d,i)=>(
            <div key={i} className="flex flex-col items-center gap-3  justify-center border rounded-xl w-[360px] h-[180px] max-md:w-full max-md:h-auto">
               <Icon
                icon={d.icon}
                width="24"
                height="24"
                className="text-primary-color"
              />
              <Typography size="h5" className="text-[#2c2c2c] font-medium">{d.title}</Typography>
              <Typography className="text-primary-color font-semibold underline">View Detail</Typography>
            </div>
          ))}
        </div> */}
      <div className="mt-5 bg-white rounded-xl p-6">
        <Typography size="h5" className="text-[#2c2c2c] font-semibold">
          Quick Help
        </Typography>
        <div
          className="grid grid-cols-4 gap-6 mt-6 
                max-xl:grid-cols-3
                max-lg:grid-cols-2
                max-md:grid-cols-1"
        >
          {quickData.map((d, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-3
                 border rounded-xl h-[180px] transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl
        cursor-pointer"
            >
              <Icon
                icon={d.icon}
                width="24"
                height="24"
                className="text-primary-color"
              />

              <Typography size="h5" className="text-[#2c2c2c] font-medium">
                {d.title}
              </Typography>

              <Typography className="text-primary-color font-semibold underline">
                View Detail
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-5 rounded-xl bg-white p-8 max-md:p-3 mt-7">
        <Typography size={"h5"} as={"h5"}>
          FAQS
        </Typography>
        {/* FAQ Header & Category Tabs */}
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 border-b pb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${
          activeTab === tab
            ? "bg-primary-color text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredFaqs.map((d, i) => (
          <div key={i} className="rounded-xl shadow-sm border px-5 py-4">
            {/* Top Row */}
            <div className="flex justify-between items-center">
              {/* Title */}
              <div
                onClick={() => setOpenfaq(openfaq === i ? null : i)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Typography size="md" as="h4" className="font-medium">
                  {d.title}
                </Typography>

                {/* <Icon
                  icon="uim:angle-down"
                  width="24"
                  className={`transition-transform ${
                    openfaq === i ? "rotate-180 text-secondary-color" : "text-secondary-color"
                  }`}
                /> */}
              </div>
              <Icon
                onClick={() => setOpenfaq(openfaq === i ? null : i)}
                icon="uim:angle-down"
                width="24"
                className={`transition-transform ${
                  openfaq === i ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Answer */}
            {openfaq === i && (
              <Typography className="pt-3 font-medium text-desc-color">
                {d.desc}
              </Typography>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* <EditFaqModal
        onClose={onClose}
        isOpen={isOpenEditFaq}
        title={modalMode === "add" ? "Add FAQ" : "Edit FAQ"}
        onSave={handleSaveFaq}
        initialQuestion={editingFaq !== null ? faqs[editingFaq].title : ""}
        initialAnswer={editingFaq !== null ? faqs[editingFaq].desc : ""}
        initialStatus={editingFaq !== null ? faqs[editingFaq].status : "Active"}
      /> */}
    </div>
  );
};

export default FAQS;
