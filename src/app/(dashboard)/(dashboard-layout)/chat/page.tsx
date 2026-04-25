// "use client";

// import ChatList from "@/components/shared/chats/chat-list";
// import ChatWindow from "@/components/shared/chats/chat-window";
// import { useState } from "react";
// // import ChatList from "@/components/chat/ChatList";
// // import ChatWindow from "@/components/chat/ChatWindow";

// export default function ChatPage() {
//   const [selectedUser, setSelectedUser] = useState<any>(null);

//   return (
//     <div className="h-screen flex bg-gray-100">
//       <ChatList onSelect={setSelectedUser} />

//       {selectedUser ? (
//         <ChatWindow user={selectedUser} />
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-gray-400">
//           Select a chat to start messaging
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import ChatList from "@/components/shared/chats/chat-list";
// import ChatWindow from "@/components/shared/chats/chat-window";
// import { useState } from "react";
// // import ChatList from "@/components/chat/ChatList";
// // import ChatWindow from "@/components/chat/ChatWindow";

// type Message = {
//   id: number;
//   text: string;
//   sender: "me" | "other";
// };

// export default function ChatPage() {
//   const [selectedUser, setSelectedUser] = useState<any>(null);

//   const [chats, setChats] = useState<Record<number, Message[]>>({
//     1: [
//       { id: 1, text: "Hello Alex 👋", sender: "other" },
//       { id: 2, text: "Today appointment at 5pm", sender: "other" },
//     ],
//     2: [
//       { id: 1, text: "Hi there!", sender: "other" },
//     ],
//   });

// //   const sendMessage = (userId: number, text: string) => {
// //     setChats((prev) => ({
// //       ...prev,
// //       [userId]: [
// //         ...(prev[userId] || []),
// //         { id: Date.now(), text, sender: "me" },
// //       ],
// //     }));
// //   };
// const sendMessage = (userId: number, text: string) => {
//   // My message
//   setChats((prev) => ({
//     ...prev,
//     [userId]: [
//       ...(prev[userId] || []),
//       { id: Date.now(), text, sender: "me" },
//     ],
//   }));

//   // Auto reply (after delay)
//   setTimeout(() => {
//     setChats((prev) => ({
//       ...prev,
//       [userId]: [
//         ...(prev[userId] || []),
//         {
//           id: Date.now() + 1,
//           text: "Sure 👍 I will get back to you shortly.",
//           sender: "other",
//         },
//       ],
//     }));
//   }, 800); // WhatsApp-like delay
// };

//   return (
//     <div className="h-screen flex bg-gray-100">
//       <ChatList onSelect={setSelectedUser} />

//       {selectedUser ? (
//         <ChatWindow
//           user={selectedUser}
//           messages={chats[selectedUser.id] || []}
//           onSend={sendMessage}
//         />
//       ) : (
//         <div className="flex-1 flex items-center bg-white rounded-xl justify-center text-gray-400">
//           Select a chat to start messaging
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import ChatList from "@/components/shared/chats/chat-list";
import ChatWindow from "@/components/shared/chats/chat-window";
import { useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [chats, setChats] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: "Hello Alex 👋", sender: "other" },
      { id: 2, text: "Today appointment at 5pm", sender: "other" },
    ],
    2: [{ id: 1, text: "Hi there!", sender: "other" }],
  });

  const sendMessage = (userId: number, text: string) => {
    setChats((prev) => ({
      ...prev,
      [userId]: [
        ...(prev[userId] || []),
        { id: Date.now(), text, sender: "me" },
      ],
    }));

    setTimeout(() => {
      setChats((prev) => ({
        ...prev,
        [userId]: [
          ...(prev[userId] || []),
          {
            id: Date.now() + 1,
            text: "Sure 👍 I will get back to you shortly.",
            sender: "other",
          },
        ],
      }));
    }, 800);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Chat List */}
      <div
        className={`${
          selectedUser ? "hidden md:block" : "block max-md:w-full"
        }`}
      >
        <ChatList onSelect={setSelectedUser} />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={chats[selectedUser.id] || []}
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
