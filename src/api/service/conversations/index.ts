import { axiosClient } from "@/api/base";

export interface Conversation {
  id: string;
  patient_uuid: string;
  doctor_id: string;
  context_label?: string;
  status: string;
  created_at: string;
  updated_at: string;
  patient?: {
    id: string;
    user?: {
      first_name: string;
      last_name: string;
      profile_picture?: string;
    };
  };
  last_message?: {
    content: string;
    created_at: string;
    sender_id: string;
  };
}

export interface ConversationMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  category?: string;
  created_at: string;
}

// Get all conversations for the current user (doctor)
export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await axiosClient.get("/api/v1/conversations");
    return response.data?.data ?? response.data ?? [];
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

// Get messages for a conversation
export const getConversationMessages = async (
  conversationId: string
): Promise<ConversationMessage[]> => {
  try {
    const response = await axiosClient.get(
      `/api/v1/conversations/${conversationId}/messages`
    );
    return response.data?.data ?? response.data ?? [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Send a message
export const sendConversationMessage = async (
  conversationId: string,
  content: string,
  category?: string
): Promise<ConversationMessage> => {
  try {
    const response = await axiosClient.post(
      `/api/v1/conversations/${conversationId}/messages`,
      { content, category }
    );
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Create a new conversation
export const createConversation = async (
  patient_uuid: string,
  doctor_id: string,
  context_label?: string
): Promise<Conversation> => {
  try {
    const response = await axiosClient.post("/api/v1/conversations", {
      patient_uuid,
      doctor_id,
      context_label,
    });
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};
