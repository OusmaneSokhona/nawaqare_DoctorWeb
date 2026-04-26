"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import SOAPNotes, { SOAPData } from "@/components/shared/soap-notes";
import Container from "@/components/shared/container";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface ConsultationDetailPageProps {
  params: {
    id: string;
  };
}

const mockConsultation = {
  id: "CON-001",
  status: "In Progress",
  date: "2026-04-25",
  patientName: "Sarah Johnson",
  patientAge: 34,
  bookingReason: "Follow-up for diabetes management",
  consultationType: "Video",
  medications: [
    {
      id: "1",
      name: "Metformin",
      dosage: "1000mg",
      frequency: "Twice daily",
      duration: "30 days",
    },
    {
      id: "2",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "Ongoing",
    },
  ],
};

const ConsultationDetailPage: React.FC<ConsultationDetailPageProps> = ({ params }) => {
  const id = params.id || "CON-001";
  const [activeTab, setActiveTab] = useState<"clinical" | "prescription" | "summary">("clinical");
  const [medications, setMedications] = useState<Medication[]>(mockConsultation.medications);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
  });
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [soapData, setSoapData] = useState<SOAPData | null>(null);

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      const medication: Medication = {
        id: Math.random().toString(),
        ...newMedication,
      };
      setMedications([...medications, medication]);
      setNewMedication({ name: "", dosage: "", frequency: "", duration: "" });
      setShowAddMedication(false);
    }
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleCloseConsultation = () => {
    setShowCloseModal(false);
  };

  const handleSoapData = (data: SOAPData) => {
    setSoapData(data);
  };

  return (
    <Container>
      <div className="w-full space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Typography as="h2" size="h4" className="text-black font-bold mb-2">
                Consultation #{id}
              </Typography>
              <div className="flex items-center gap-4">
                <span className="bg-blue-100 text-primary-color px-3 py-1 rounded-full text-sm font-semibold">
                  {mockConsultation.status}
                </span>
                <Typography size="sm" className="text-desc-color">
                  {new Date(mockConsultation.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-6">
            <div>
              <Typography size="sm" className="text-desc-color font-semibold mb-1">
                Patient Name
              </Typography>
              <Typography size="sm" className="text-black font-semibold">
                {mockConsultation.patientName}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-desc-color font-semibold mb-1">
                Age
              </Typography>
              <Typography size="sm" className="text-black font-semibold">
                {mockConsultation.patientAge} years
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-desc-color font-semibold mb-1">
                Booking Reason
              </Typography>
              <Typography size="sm" className="text-black font-semibold">
                {mockConsultation.bookingReason}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-desc-color font-semibold mb-1">
                Consultation Type
              </Typography>
              <Typography size="sm" className="text-black font-semibold">
                {mockConsultation.consultationType}
              </Typography>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex gap-6 mb-6 border-b">
            <button
              onClick={() => setActiveTab("clinical")}
              className={`pb-4 font-semibold text-sm transition-colors relative ${
                activeTab === "clinical"
                  ? "text-primary-color after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-primary-color"
                  : "text-desc-color"
              }`}
            >
              Clinical Notes
            </button>
            <button
              onClick={() => setActiveTab("prescription")}
              className={`pb-4 font-semibold text-sm transition-colors relative ${
                activeTab === "prescription"
                  ? "text-primary-color after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-primary-color"
                  : "text-desc-color"
              }`}
            >
              Prescription
            </button>
            <button
              onClick={() => setActiveTab("summary")}
              className={`pb-4 font-semibold text-sm transition-colors relative ${
                activeTab === "summary"
                  ? "text-primary-color after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-primary-color"
                  : "text-desc-color"
              }`}
            >
              Summary
            </button>
          </div>

          {activeTab === "clinical" && (
            <div>
              <SOAPNotes consultationId={id} onSave={handleSoapData} />
            </div>
          )}

          {activeTab === "prescription" && (
            <div className="space-y-6">
              <div className="space-y-4">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-1">
                      <Typography size="sm" className="text-black font-semibold mb-1">
                        {med.name}
                      </Typography>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <Typography size="sm" className="text-desc-color">
                            Dosage
                          </Typography>
                          <Typography size="sm" className="text-black font-semibold">
                            {med.dosage}
                          </Typography>
                        </div>
                        <div>
                          <Typography size="sm" className="text-desc-color">
                            Frequency
                          </Typography>
                          <Typography size="sm" className="text-black font-semibold">
                            {med.frequency}
                          </Typography>
                        </div>
                        <div>
                          <Typography size="sm" className="text-desc-color">
                            Duration
                          </Typography>
                          <Typography size="sm" className="text-black font-semibold">
                            {med.duration}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMedication(med.id)}
                      className="text-red hover:text-red opacity-70 hover:opacity-100 ml-4"
                    >
                      <Icon icon="ic:baseline-delete" width={20} height={20} />
                    </button>
                  </div>
                ))}
              </div>

              {!showAddMedication && (
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => setShowAddMedication(true)}
                  className="flex items-center justify-center gap-2"
                >
                  <Icon icon="ic:baseline-plus" width={18} height={18} />
                  Add Medication
                </Button>
              )}

              {showAddMedication && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
                  <Typography size="sm" className="font-semibold text-black">
                    Add New Medication
                  </Typography>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Medication name"
                      value={newMedication.name}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g., 1000mg)"
                      value={newMedication.dosage}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, dosage: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Frequency"
                      value={newMedication.frequency}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, frequency: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={newMedication.duration}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, duration: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color text-sm"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={() => {
                        setShowAddMedication(false);
                        setNewMedication({ name: "", dosage: "", frequency: "", duration: "" });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" size="medium" onClick={handleAddMedication}>
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "summary" && (
            <div className="space-y-6">
              {soapData ? (
                <>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-3">
                      <Typography size="sm" className="text-black font-semibold mb-1">
                        Subjective
                      </Typography>
                      <Typography size="sm" className="text-desc-color">
                        {soapData.subjective || "No subjective notes recorded"}
                      </Typography>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4 py-3">
                      <Typography size="sm" className="text-black font-semibold mb-1">
                        Objective
                      </Typography>
                      <Typography size="sm" className="text-desc-color">
                        {soapData.objective || "No objective notes recorded"}
                      </Typography>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4 py-3">
                      <Typography size="sm" className="text-black font-semibold mb-1">
                        Assessment
                      </Typography>
                      <Typography size="sm" className="text-desc-color mb-2">
                        {soapData.diagnosisCode && (
                          <span className="bg-blue-100 border border-primary-color rounded px-2 py-1 inline-block mr-2">
                            {soapData.diagnosisCode} - {soapData.diagnosisLabel}
                          </span>
                        )}
                      </Typography>
                      <Typography size="sm" className="text-desc-color">
                        {soapData.assessment || "No assessment notes recorded"}
                      </Typography>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-3">
                      <Typography size="sm" className="text-black font-semibold mb-1">
                        Plan
                      </Typography>
                      <Typography size="sm" className="text-desc-color">
                        {soapData.plan || "No plan recorded"}
                      </Typography>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Typography size="sm" className="text-desc-color">
                        <span className="font-semibold">Follow-up:</span> In {soapData.followUpDays}{" "}
                        days
                      </Typography>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Typography size="sm" className="font-semibold text-black mb-2">
                      Prescriptions
                    </Typography>
                    <ul className="space-y-1">
                      {medications.map((med) => (
                        <li key={med.id} className="text-sm text-desc-color">
                          <span className="font-semibold">{med.name}</span> - {med.dosage},{" "}
                          {med.frequency}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Icon icon="ic:baseline-info" width={32} height={32} className="text-desc-color mx-auto mb-2" />
                  <Typography size="sm" className="text-desc-color">
                    Clinical notes not yet saved
                  </Typography>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sub-page navigation */}
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <Typography as="h3" size="h5" className="text-black font-semibold mb-4">
            Clinical Actions
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href={`/consultation/${id}/examens`}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[#ebedf5] hover:border-[#2f80ed] hover:bg-blue-50 transition-all group">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-[#2f80ed]">
                <Icon icon="material-symbols:lab-research-outline" width={20} className="text-[#2f80ed] group-hover:text-white" />
              </div>
              <Typography size="sm" className="font-semibold text-center text-[#2C2C2C]">Exam Orders</Typography>
              <Typography size="sm" className="text-desc-color text-center text-xs">Lab & Imaging</Typography>
            </Link>
            <Link href={`/consultation/${id}/reference`}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[#ebedf5] hover:border-[#27ae60] hover:bg-green-50 transition-all group">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-[#27ae60]">
                <Icon icon="material-symbols:forward-to-inbox-outline" width={20} className="text-[#27ae60] group-hover:text-white" />
              </div>
              <Typography size="sm" className="font-semibold text-center text-[#2C2C2C]">Reference</Typography>
              <Typography size="sm" className="text-desc-color text-center text-xs">Send to Specialist</Typography>
            </Link>
            <Link href={`/consultation/${id}/certificat`}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[#ebedf5] hover:border-[#f2994a] hover:bg-orange-50 transition-all group">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-[#f2994a]">
                <Icon icon="material-symbols:description-outline" width={20} className="text-[#f2994a] group-hover:text-white" />
              </div>
              <Typography size="sm" className="font-semibold text-center text-[#2C2C2C]">Certificate</Typography>
              <Typography size="sm" className="text-desc-color text-center text-xs">Sick Leave & Docs</Typography>
            </Link>
            <Link href={`/consultation/${id}/followup`}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[#ebedf5] hover:border-[#9b59b6] hover:bg-purple-50 transition-all group">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-[#9b59b6]">
                <Icon icon="material-symbols:event-repeat-outline" width={20} className="text-[#9b59b6] group-hover:text-white" />
              </div>
              <Typography size="sm" className="font-semibold text-center text-[#2C2C2C]">Follow-up</Typography>
              <Typography size="sm" className="text-desc-color text-center text-xs">Plan & Reminders</Typography>
            </Link>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="danger"
            size="medium"
            onClick={() => setShowCloseModal(true)}
            className="flex items-center gap-2 border-2 border-red !bg-transparent !text-red"
          >
            <Icon icon="ic:baseline-close" width={18} height={18} />
            Close Consultation
          </Button>
        </div>

        {showCloseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
              <Typography as="h3" size="h5" className="text-black font-bold mb-4">
                Close Consultation
              </Typography>
              <Typography size="sm" className="text-desc-color mb-6">
                Are you sure you want to close this consultation? This action cannot be undone.
              </Typography>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => setShowCloseModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="medium"
                  onClick={handleCloseConsultation}
                >
                  Close Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ConsultationDetailPage;
                                                             