"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import ModalWrapper from "@/components/shared/modal";
import { getTeamMembers, inviteTeamMember } from "@/api/service/team";

interface TeamMember {
  id: string;
  name: string;
  role: "Doctor" | "Assistant" | "Secretary" | "Nurse";
  status: "Active" | "Pending Invitation" | "Suspended";
  email: string;
  avatar: string;
  permissions: {
    patientRecords: boolean;
    clinicalNotes: boolean;
    prescriptions: boolean;
    bookings: boolean;
    billing: boolean;
    signDocuments: boolean;
  };
}

interface ModalState {
  isOpen: boolean;
  email: string;
  role: "Doctor" | "Assistant" | "Secretary" | "Nurse";
}

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "Doctor",
    status: "Active",
    email: "sarah.johnson@clinic.com",
    avatar: "SJ",
    permissions: {
      patientRecords: true,
      clinicalNotes: true,
      prescriptions: true,
      bookings: true,
      billing: true,
      signDocuments: true,
    },
  },
  {
    id: "2",
    name: "Emma Wilson",
    role: "Assistant",
    status: "Active",
    email: "emma.wilson@clinic.com",
    avatar: "EW",
    permissions: {
      patientRecords: true,
      clinicalNotes: false,
      prescriptions: false,
      bookings: true,
      billing: false,
      signDocuments: false,
    },
  },
  {
    id: "3",
    name: "Marie Dupont",
    role: "Secretary",
    status: "Pending Invitation",
    email: "marie.dupont@clinic.com",
    avatar: "MD",
    permissions: {
      patientRecords: false,
      clinicalNotes: false,
      prescriptions: false,
      bookings: true,
      billing: true,
      signDocuments: false,
    },
  },
  {
    id: "4",
    name: "Lisa Chen",
    role: "Nurse",
    status: "Active",
    email: "lisa.chen@clinic.com",
    avatar: "LC",
    permissions: {
      patientRecords: true,
      clinicalNotes: false,
      prescriptions: false,
      bookings: true,
      billing: false,
      signDocuments: false,
    },
  },
];

const ROLE_COLORS: Record<string, string> = {
  Doctor: "bg-[#2f80ed] text-white",
  Assistant: "bg-[#f2994a] text-white",
  Secretary: "bg-[#828282] text-white",
  Nurse: "bg-[#27ae60] text-white",
};

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-[#27ae60]",
  "Pending Invitation": "bg-[#f2994a]",
  Suspended: "bg-[#eb4824]",
};

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [apiLoading, setApiLoading] = useState(true);
  const [activeStructure, setActiveStructure] = useState("Clinique Pasteur");
  const [addMemberModal, setAddMemberModal] = useState<ModalState>({
    isOpen: false,
    email: "",
    role: "Doctor",
  });

  useEffect(() => {
    getTeamMembers()
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped: TeamMember[] = data.map((m: any) => ({
            id: m.id,
            name: m.name || m.user?.profile ? `${m.user?.profile?.first_name} ${m.user?.profile?.last_name}` : "Member",
            role: m.role || "Assistant",
            status: m.status || "Active",
            email: m.email || m.user?.email || "—",
            avatar: ((m.name || "M").slice(0, 2).toUpperCase()),
            permissions: m.permissions || {
              patientRecords: false, clinicalNotes: false, prescriptions: false,
              bookings: false, billing: false, signDocuments: false,
            },
          }));
          setTeamMembers(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setApiLoading(false));
  }, []);

  const handleAddMember = async () => {
    if (!addMemberModal.email.trim()) return;
    try {
      await inviteTeamMember({ email: addMemberModal.email, role: addMemberModal.role });
    } catch {}

    const newMember: TeamMember = {
      id: String(teamMembers.length + 1),
      name: addMemberModal.email.split("@")[0],
      role: addMemberModal.role,
      status: "Pending Invitation",
      email: addMemberModal.email,
      avatar: addMemberModal.email
        .split("@")[0]
        .split(".")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      permissions: getDefaultPermissions(addMemberModal.role),
    };

    setTeamMembers([...teamMembers, newMember]);
    setAddMemberModal({ isOpen: false, email: "", role: "Doctor" });
  };

  const getDefaultPermissions = (
    role: "Doctor" | "Assistant" | "Secretary" | "Nurse"
  ) => {
    const permissions = {
      Doctor: {
        patientRecords: true,
        clinicalNotes: true,
        prescriptions: true,
        bookings: true,
        billing: true,
        signDocuments: true,
      },
      Assistant: {
        patientRecords: true,
        clinicalNotes: false,
        prescriptions: false,
        bookings: true,
        billing: false,
        signDocuments: false,
      },
      Secretary: {
        patientRecords: false,
        clinicalNotes: false,
        prescriptions: false,
        bookings: true,
        billing: true,
        signDocuments: false,
      },
      Nurse: {
        patientRecords: true,
        clinicalNotes: false,
        prescriptions: false,
        bookings: true,
        billing: false,
        signDocuments: false,
      },
    };
    return permissions[role];
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const handleSuspendMember = (id: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id
          ? { ...member, status: "Suspended" as const }
          : member
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#eceaf7] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center flex-col gap-4 sm:flex-row">
          <div>
            <Typography
              as="h1"
              size="h4"
              className="font-bold text-primary-dark mb-2"
            >
              My Team
            </Typography>
            <Typography size="sm" className="text-dark-gray">
              Manage your medical team and their access permissions
            </Typography>
          </div>
          <Button
            variant="primary"
            size="medium"
            onClick={() => setAddMemberModal({ ...addMemberModal, isOpen: true })}
            className="flex items-center gap-2"
          >
            <Icon icon="material-symbols:person-add-rounded" width={20} height={20} />
            Add Member
          </Button>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-light-gray">
          <Typography size="sm" className="text-dark-gray mb-2">
            Currently active in:
          </Typography>
          <div className="relative inline-block">
            <select
              value={activeStructure}
              onChange={(e) => setActiveStructure(e.target.value)}
              className="appearance-none bg-light-gray px-4 py-2 pr-10 rounded-lg border border-light-gray text-primary-dark font-medium cursor-pointer focus:outline-none focus:border-primary-color"
            >
              <option>Clinique Pasteur</option>
              <option>Hôpital Central</option>
              <option>Cabinet Privé</option>
            </select>
            <Icon
              icon="material-symbols:expand-more-rounded"
              width={20}
              height={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-dark-gray"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-light-gray hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full ${ROLE_COLORS[member.role]} flex items-center justify-center font-bold text-sm`}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <Typography size="md" className="font-bold text-primary-dark">
                      {member.name}
                    </Typography>
                    <Typography size="sm" className="text-dark-gray">
                      {member.email}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div
                    className={`w-3 h-3 rounded-full ${STATUS_COLORS[member.status]}`}
                    title={member.status}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${ROLE_COLORS[member.role]}`}
                >
                  {member.role}
                </span>
                <Typography size="sm" className="text-dark-gray mt-2 block">
                  Status:{" "}
                  <span className="font-medium text-primary-dark">
                    {member.status}
                  </span>
                </Typography>
              </div>

              <div className="mb-4 p-3 bg-[#eceaf7] rounded-lg">
                <Typography size="sm" className="font-bold text-primary-dark mb-2">
                  Permissions:
                </Typography>
                <div className="grid grid-cols-2 gap-2">
                  {member.permissions.patientRecords && (
                    <div className="flex items-center gap-2 text-xs text-dark-gray">
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={16}
                        height={16}
                        color="#27ae60"
                      />
                      <span>Patient Records</span>
                    </div>
                  )}
                  {member.permissions.clinicalNotes && (
                    <div className="flex items-center gap-2 text-xs text-dark-gray">
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={16}
                        height={16}
                        color="#27ae60"
                      />
                      <span>Notes</span>
                    </div>
                  )}
                  {member.permissions.prescriptions && (
                    <div className="flex items-center gap-2 text-xs text-dark-gray">
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={16}
                        height={16}
                        color="#27ae60"
                      />
                      <span>Prescriptions</span>
                    </div>
                  )}
                  {member.permissions.bookings && (
                    <div className="flex items-center gap-2 text-xs text-dark-gray">
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={16}
                        height={16}
                        color="#27ae60"
                      />
                      <span>Bookings</span>
                    </div>
                  )}
                  {member.permissions.billing && (
                    <div className="flex items-center gap-2 text-xs text-dark-gray">
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={16}
                        height={16}
                        color="#27ae60"
                      />
                      <span>Billing</span>
                    </div>
                  )}
                  {member.permissions.signDocuments && (
                    <div className="flex items-center gap-2 text-xs text-dark-gray">
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={16}
                        height={16}
                        color="#27ae60"
                      />
                      <span>Sign Docs</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="small"
                  className="flex-1 text-xs"
                  onClick={() => {}}
                >
                  Edit
                </Button>
                {member.status !== "Suspended" && (
                  <Button
                    variant="outlined"
                    size="small"
                    className="flex-1 text-xs"
                    onClick={() => handleSuspendMember(member.id)}
                  >
                    Suspend
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="small"
                  className="flex-1 text-xs"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-light-gray">
          <div className="p-6 border-b border-light-gray">
            <Typography
              as="h2"
              size="h5"
              className="font-bold text-primary-dark"
            >
              Roles & Permissions Matrix
            </Typography>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#eceaf7] border-b border-light-gray">
                  <th className="px-6 py-3 text-left">
                    <Typography size="sm" className="font-bold text-primary-dark">
                      Permission
                    </Typography>
                  </th>
                  <th className="px-6 py-3 text-center">
                    <Typography size="sm" className="font-bold text-primary-dark">
                      Doctor
                    </Typography>
                  </th>
                  <th className="px-6 py-3 text-center">
                    <Typography size="sm" className="font-bold text-primary-dark">
                      Assistant
                    </Typography>
                  </th>
                  <th className="px-6 py-3 text-center">
                    <Typography size="sm" className="font-bold text-primary-dark">
                      Secretary
                    </Typography>
                  </th>
                  <th className="px-6 py-3 text-center">
                    <Typography size="sm" className="font-bold text-primary-dark">
                      Nurse
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "View patient records",
                    Doctor: true,
                    Assistant: true,
                    Secretary: false,
                    Nurse: true,
                  },
                  {
                    name: "Write clinical notes",
                    Doctor: true,
                    Assistant: false,
                    Secretary: false,
                    Nurse: false,
                  },
                  {
                    name: "Issue prescriptions",
                    Doctor: true,
                    Assistant: false,
                    Secretary: false,
                    Nurse: false,
                  },
                  {
                    name: "Manage bookings",
                    Doctor: true,
                    Assistant: true,
                    Secretary: true,
                    Nurse: true,
                  },
                  {
                    name: "Access billing",
                    Doctor: true,
                    Assistant: false,
                    Secretary: true,
                    Nurse: false,
                  },
                  {
                    name: "Sign documents",
                    Doctor: true,
                    Assistant: false,
                    Secretary: false,
                    Nurse: false,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-light-gray hover:bg-[#f9f9f9]"
                  >
                    <td className="px-6 py-4">
                      <Typography size="sm" className="text-primary-dark">
                        {row.name}
                      </Typography>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.Doctor && (
                        <Icon
                          icon="material-symbols:check-circle-rounded"
                          width={20}
                          height={20}
                          color="#27ae60"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.Assistant && (
                        <Icon
                          icon="material-symbols:check-circle-rounded"
                          width={20}
                          height={20}
                          color="#27ae60"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.Secretary && (
                        <Icon
                          icon="material-symbols:check-circle-rounded"
                          width={20}
                          height={20}
                          color="#27ae60"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.Nurse && (
                        <Icon
                          icon="material-symbols:check-circle-rounded"
                          width={20}
                          height={20}
                          color="#27ae60"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalWrapper
        title="Add Team Member"
        onClose={() =>
          setAddMemberModal({ ...addMemberModal, isOpen: false })
        }
        isOpen={addMemberModal.isOpen}
      >
        <div className="space-y-4 py-4">
          <div>
            <Typography size="sm" className="text-dark-gray font-medium mb-2">
              Email Address
            </Typography>
            <input
              type="email"
              value={addMemberModal.email}
              onChange={(e) =>
                setAddMemberModal({ ...addMemberModal, email: e.target.value })
              }
              placeholder="member@clinic.com"
              className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-primary-color"
            />
          </div>

          <div>
            <Typography size="sm" className="text-dark-gray font-medium mb-2">
              Role
            </Typography>
            <select
              value={addMemberModal.role}
              onChange={(e) =>
                setAddMemberModal({
                  ...addMemberModal,
                  role: e.target.value as any,
                })
              }
              className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-primary-color"
            >
              <option value="Doctor">Doctor</option>
              <option value="Assistant">Assistant</option>
              <option value="Secretary">Secretary</option>
              <option value="Nurse">Nurse</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outlined"
              size="medium"
              className="flex-1"
              onClick={() =>
                setAddMemberModal({ ...addMemberModal, isOpen: false })
              }
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="medium"
              className="flex-1"
              onClick={handleAddMember}
              disabled={!addMemberModal.email.trim()}
            >
              Send Invitation
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default TeamPage;
