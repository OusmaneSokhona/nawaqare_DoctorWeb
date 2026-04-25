"use client";

import { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

interface ExamOrder {
  id: string;
  test: string;
  type: string;
  priority: "Routine" | "Urgent" | "STAT";
  date: string;
  status: "Requested" | "Sent to Patient" | "Completed" | "Results Available" | "Reviewed";
}

const ExamOrdersPage = ({ params }: { params: { id: string } }) => {
  const consultationId = params.id;
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"labs" | "imaging">("labs");
  const [formData, setFormData] = useState({
    type: "Blood test",
    description: "",
    priority: "Routine" as const,
    notes: "",
  });

  const mockOrders: ExamOrder[] = [
    {
      id: "1",
      test: "Complete Blood Count (CBC)",
      type: "Blood test",
      priority: "Routine",
      date: "2025-04-20",
      status: "Reviewed",
    },
    {
      id: "2",
      test: "Chest X-Ray",
      type: "Imaging",
      priority: "Urgent",
      date: "2025-04-18",
      status: "Results Available",
    },
    {
      id: "3",
      test: "Lipid Panel",
      type: "Blood test",
      priority: "Routine",
      date: "2025-04-15",
      status: "Completed",
    },
    {
      id: "4",
      test: "Urinalysis",
      type: "Urine test",
      priority: "Routine",
      date: "2025-04-22",
      status: "Sent to Patient",
    },
    {
      id: "5",
      test: "MRI Brain",
      type: "Imaging",
      priority: "STAT",
      date: "2025-04-23",
      status: "Requested",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Requested":
        return "bg-[#E0F3FF] text-[#2f80ed]";
      case "Sent to Patient":
        return "bg-[#FFF3E0] text-[#f2994a]";
      case "Completed":
        return "bg-[#F5F5F5] text-[#828282]";
      case "Results Available":
        return "bg-[#E8F5E9] text-[#27ae60]";
      case "Reviewed":
        return "bg-[#F3E5F5] text-[#9c27b0]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setFormData({
      type: "Blood test",
      description: "",
      priority: "Routine",
      notes: "",
    });
  };

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === "labs")
      return ["Blood test", "Urine test", "Biopsy", "Other"].includes(order.type);
    return ["Imaging"].includes(order.type);
  });

  return (
    <div className="mt-5">
      <div className="flex max-md:flex-col max-md:gap-4 justify-between items-start mb-8">
        <div>
          <Typography size="h5" as="h5" className="font-bold">
            Exam Orders
          </Typography>
          <Typography className="text-[#828282] text-sm">
            Medical examination requests (lab tests & imaging)
          </Typography>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#2f80ed] text-white px-6 py-2.5 rounded-[12px] hover:opacity-90 transition-opacity"
        >
          <Icon icon="mingcute:plus-fill" width="20" height="20" />
          New Order
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-[#e8e8e8]">
          <Typography size="h6" as="h6" className="font-bold mb-4">
            Create New Exam Order
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Test Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
                >
                  <option>Blood test</option>
                  <option>Urine test</option>
                  <option>Imaging</option>
                  <option>Biopsy</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
                >
                  <option>Routine</option>
                  <option>Urgent</option>
                  <option>STAT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description & Instructions
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter test details and any special instructions..."
                rows={3}
                className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes for Patient</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Pre-test instructions, fasting requirements, etc..."
                rows={2}
                className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-[#2f80ed] text-white px-6 py-2 rounded-[8px] hover:opacity-90 transition-opacity font-medium"
              >
                Submit Order
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-[#f5f5f5] text-[#333] px-6 py-2 rounded-[8px] hover:bg-[#e8e8e8] transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex gap-8 px-6 pt-5 pb-4 border-b border-[#e8e8e8]">
          <button
            onClick={() => setActiveTab("labs")}
            className={`pb-2 font-medium text-sm relative ${
              activeTab === "labs"
                ? "text-[#2f80ed] after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-[#2f80ed]"
                : "text-[#666]"
            }`}
          >
            Lab Tests
          </button>
          <button
            onClick={() => setActiveTab("imaging")}
            className={`pb-2 font-medium text-sm relative ${
              activeTab === "imaging"
                ? "text-[#2f80ed] after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-[#2f80ed]"
                : "text-[#666]"
            }`}
          >
            Imaging
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9f9f9] border-b border-[#e8e8e8]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333]">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333]">Test</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333]">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333]">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333]">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr key={order.id} className="border-b border-[#e8e8e8] hover:bg-[#fafafa]">
                  <td className="px-6 py-4 text-sm text-[#666]">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#333]">{order.test}</td>
                  <td className="px-6 py-4 text-sm text-[#666]">{order.type}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.priority === "STAT"
                          ? "bg-[#FFEBEE] text-[#eb4824]"
                          : order.priority === "Urgent"
                            ? "bg-[#FFF3E0] text-[#f2994a]"
                            : "bg-[#E8F5E9] text-[#27ae60]"
                      }`}
                    >
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666]">{order.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      {(order.status === "Completed" || order.status === "Results Available") && (
                        <button className="text-[#2f80ed] hover:underline text-xs font-medium">
                          View Results
                        </button>
                      )}
                      {order.status !== "Reviewed" && (
                        <button className="text-[#27ae60] hover:underline text-xs font-medium">
                          Mark Reviewed
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="px-6 py-8 text-center text-[#828282]">
              <Icon icon="mingcute:file-empty-line" width="48" height="48" className="mx-auto mb-2 opacity-50" />
              <Typography className="text-sm">No {activeTab} orders yet</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamOrdersPage;
