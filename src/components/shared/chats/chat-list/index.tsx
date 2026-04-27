"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getConversations, Conversation } from "@/api/service/conversations";

export type ChatUser = {
  id: number | string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  conversationId?: string;
};

const MOCK_USERS: ChatUser[] = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  name: "Mr. Alex Martin",
  lastMessage: "Today appointment at.....",
  time: "1:20",
  avatar: "/assets/svg/sehrImg2.svg",
}));

export default function ChatList({
  onSelect,
}: {
  onSelect: (user: ChatUser) => void;
}) {
  const [users, setUsers] = useState<ChatUser[]>(MOCK_USERS);

  useEffect(() => {
    getConversations()
      .then((conversations: Conversation[]) => {
        if (!Array.isArray(conversations) || conversations.length === 0) return;
        const mapped: ChatUser[] = conversations.map((conv) => {
          const firstName = conv.patient?.user?.first_name ?? "Patient";
          const lastName = conv.patient?.user?.last_name ?? "";
          const lastMsg = conv.last_message?.content ?? "No messages yet";
          const time = conv.last_message?.created_at
            ? new Date(conv.last_message.created_at).toLocaleTimeString(
                "fr-FR",
                { hour: "2-digit", minute: "2-digit" }
              )
            : "";
          return {
            id: conv.id,
            name: `${firstName} ${lastName}`.trim(),
            lastMessage: lastMsg,
            time,
            avatar: conv.patient?.user?.profile_picture ?? "/assets/svg/sehrImg2.svg",
            conversationId: conv.id,
          };
        });
        setUsers(mapped);
      })
      .catch(() => {
        // Keep mock data on error
      });
  }, []);

  return (
    <div className="w-full md:w-[360px] bg-white border-r h-screen overflow-y-auto">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          className="flex items-center gap-4 px-4 py-3 border-b cursor-pointer hover:bg-gray-100"
        >
          <Image
            src={user.avatar}
            alt="avatar"
            width={42}
            height={42}
            className="rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/svg/sehrImg2.svg";
            }}
          />

          <div className="flex-1">
            <p className="font-medium text-lg">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
          </div>

          <span className="text-xs text-gray-400">{user.time}</span>
        </div>
      ))}
    </div>
  );
}
