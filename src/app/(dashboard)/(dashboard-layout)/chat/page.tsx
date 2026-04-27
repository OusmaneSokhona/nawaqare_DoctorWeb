"use client";

import ChatList, { ChatUser } from "@/components/shared/chats/chat-list";
import ChatWindow from "@/components/shared/chats/chat-window";
import { useState, useEffect } from "react";
import {
  getConversationMessages,
  sendConversationMessage,
} from "@/api/service/conversations";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (!selectedUser?.conversationId) {
      // If no real conversationId, use local mock messages
      setMessages([
        { id: 1, text: "Hello 👋", sender: "other" },
        { id: 2, text: "Today appointment at 5pm", sender: "other" },
      ]);
      return;
    }

    setLoading(true);
    getConversationMessages(selectedUser.conversationId)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: Message[] = data.map((m) => ({
            id: typeof m.id === "number" ? m.id : Date.now(),
            text: m.content,
            sender: "other" as const, // We don't have currentUserId here easily, default to "other"
          }));
          setMessages(mapped);
        } else {
          setMessages([]);
        }
      })
      .catch(() => {
        setMessages([
          { id: 1, text: "Hello 👋", sender: "other" },
          { id: 2, text: "Today appointment at 5pm", sender: "other" },
        ]);
      })
      .finally(() => setLoading(false));
  }, [selectedUser]);

  const sendMessage = (userId: number | string, text: string) => {
    // Optimistically add message
    const newMsg: Message = { id: Date.now(), text, sender: "me" };
    setMessages((prev) => [...prev, newMsg]);

    // If we have a real conversation, send via API
    if (selectedUser?.conversationId) {
      sendConversationMessage(selectedUser.conversationId, text).catch(
        () => {}
      );
    } else {
      // Mock auto-reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Sure 👍 I will get back to you shortly.",
            sender: "other",
          },
        ]);
      }, 800);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Chat List */}
      <div
        className={`${
          selectedUser ? "hidden md:block" : "block max-md:w-full"
        }`}
      >
        <ChatList onSelect={(user) => setSelectedUser(user)} />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={messages}
            onSend={sendMessage}
            onBack={() => setSelectedUser(null)}
          />
        ) : (
          <div className="hidden md:flex flex-1 min-h-screen items-center justify-center text-gray-400 bg-white">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
