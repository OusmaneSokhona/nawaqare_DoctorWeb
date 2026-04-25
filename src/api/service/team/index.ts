import { axiosClient } from "@/api/base";
import { TeamMember, Permissions, InviteData } from "@/api/api-types";

const API_BASE = "https://api.nawaqare.sn";
const API_VERSION = "v1";

// Get team members
export const getTeamMembers = async (structureId: string): Promise<TeamMember[]> => {
  try {
    const response = await axiosClient.get(
      `/api/v1/structures/${structureId}/team-members`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
};

// Invite team member
export const inviteTeamMember = async (data: InviteData): Promise<void> => {
  try {
    await axiosClient.post(`/api/v1/team-members/invite`, data);
  } catch (error) {
    console.error("Error inviting team member:", error);
    throw error;
  }
};

// Update member permissions
export const updateMemberPermissions = async (
  memberId: string,
  permissions: Permissions,
): Promise<TeamMember> => {
  try {
    const response = await axiosClient.patch(
      `/api/v1/team-members/${memberId}/permissions`,
      { permissions },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating member permissions:", error);
    throw error;
  }
};

// Suspend member
export const suspendMember = async (memberId: string): Promise<void> => {
  try {
    await axiosClient.patch(`/api/v1/team-members/${memberId}/suspend`);
  } catch (error) {
    console.error("Error suspending member:", error);
    throw error;
  }
};

// Remove team member
export const removeTeamMember = async (memberId: string): Promise<void> => {
  try {
    await axiosClient.delete(`/api/v1/team-members/${memberId}`);
  } catch (error) {
    console.error("Error removing team member:", error);
    throw error;
  }
};
