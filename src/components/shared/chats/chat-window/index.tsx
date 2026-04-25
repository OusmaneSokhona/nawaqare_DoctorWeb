// "use client";

// import { useState } from "react";

// type Message = {
//   id: number;
//   text: string;
//   sender: "me" | "other";
// };

// export default function ChatWindow({ user }: { user: any }) {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, text: "Hello Alex 👋", sender: "other" },
//     { id: 2, text: "Today appointment at 5pm", sender: "other" },
//   ]);

//   const [text, setText] = useState("");

//   const sendMessage = () => {
//     if (!text.trim()) return;

//     setMessages((prev) => [
//       ...prev,
//       { id: Date.now(), text, sender: "me" },
//     ]);

//     setText("");
//   };

//   return (
//     <div className="flex flex-col flex-1 bg-[#efeae2]">
//       {/* Header */}
//       <div className="h-14 px-4 flex items-center border-b bg-white">
//         <p className="font-medium">{user?.name}</p>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 space-y-3 overflow-y-auto">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`max-w-[65%] px-4 py-2 rounded-lg text-sm ${
//               msg.sender === "me"
//                 ? "ml-auto bg-[#dcf8c6]"
//                 : "bg-white"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="p-3 bg-white flex items-center gap-2">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message"
//           className="flex-1 px-4 py-2 border rounded-full outline-none text-sm"
//         />
//         <button
//           onClick={sendMessage}
//           className="px-5 py-2 bg-green-500 text-white rounded-full text-sm"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";

// type Message = {
//   id: number;
//   text: string;
//   sender: "me" | "other";
// };

// export default function ChatWindow({ user }: { user: any }) {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, text: "Hello Alex 👋", sender: "other" },
//     { id: 2, text: "Today appointment at 5pm", sender: "other" },
//   ]);

//   const [text, setText] = useState("");

//   const sendMessage = () => {
//     if (!text.trim()) return;

//     setMessages((prev) => [...prev, { id: Date.now(), text, sender: "me" }]);

//     setText("");
//   };

//   return (
//     <div className="flex flex-col flex-1 bg-[#efeae2]">
//       {/* Header */}
//       <div className="h-14 px-4 flex items-center border-b bg-white">
//         <p className="font-medium">{user?.name}</p>
//       </div>

//       {/* Messages */}
//       {/* <div className="flex-1 p-4 space-y-3 overflow-y-auto">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`w-fit max-w-[75%] inline-block px-4 py-2 rounded-lg text-sm break-words
//               ${
//                 msg.sender === "me"
//                   ? "ml-auto bg-[#dcf8c6]"
//                   : "bg-white"
//               }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div> */}
//       {/* Messages */}
//       <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex ${
//               msg.sender === "me" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className="inline-flex w-fit max-w-[75%] px-4 py-2 rounded-lg  break-words
//           bg-white"
//               style={{
//                 backgroundColor: msg.sender === "me" ? "#dcf8c6" : "#ffffff",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="p-3 bg-white flex items-center gap-2">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message"
//           className="flex-1 px-4 py-2 border rounded-full outline-none "
//         />
//         <button
//           onClick={sendMessage}
//           className="px-5 py-2 bg-green-500 text-white rounded-full text"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { Icon } from "@iconify/react";
// import Image from "next/image";
// import { useState } from "react";

// type Message = {
//   id: number;
//   text: string;
//   sender: "me" | "other";
// };

// export default function ChatWindow({
//   user,
//   messages,
//   onSend,
// }: {
//   user: any;
//   messages: Message[];
//   onSend: (userId: number, text: string) => void;
// }) {
//   const [text, setText] = useState("");

//   const sendMessage = () => {
//     if (!text.trim()) return;
//     onSend(user.id, text);
//     setText("");
//   };

//   return (
//     <div className="flex flex-col flex-1 bg-[#efeae2]">
//       {/* Header */}
//       <div className="h-14 px-4 flex gap-2 rounded-sm items-center border-b bg-white">
//         <Image
//                     src='/assets/svg/sehrImg2.svg'
//                     alt="avatar"
//                     width={42}
//                     height={42}
//                     className="rounded-full"
//                   />
//         <p className="font-medium">{user.name}</p>
//       </div>

//       {/* Messages */}
//       {/* <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex ${
//               msg.sender === "me" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`inline-flex w-fit max-w-[75%] px-4 py-2 rounded-lg  break-words ${
//                 msg.sender === "me"
//                   ? "bg-[#dcf8c6]"
//                   : "bg-primary-color text-white"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div> */}

// {/* Messages */}
// <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
//   {messages.map((msg) => (
//     <div
//       key={msg.id}
//       className={`flex flex-col ${
//         msg.sender === "me" ? "items-end" : "items-start"
//       }`}
//     >
//       {/* Message Bubble */}
//       <div
//         className={`inline-flex w-fit max-w-[75%] px-4 py-2 rounded-lg break-words ${
//           msg.sender === "me"
//             ? "bg-[#dcf8c6]"
//             : "bg-primary-color text-white"
//         }`}
//       >
//         {msg.text}
//       </div>

//       {/* Time & Tick (justify-between) */}

//     </div>
//   ))}
// </div>

//       {/* Input */}
//       <div className="p-3 bg-white flex items-center gap-2">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message"
//           className="flex-1 px-4 py-2 border rounded-full outline-none "
//         />
//         <button
//           onClick={sendMessage}
//           className="px-5 py-2 bg-green-500 text-white rounded-full"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

export default function ChatWindow({
  user,
  messages,
  onSend,
  onBack,
}: {
  user: any;
  messages: Message[];
  onSend: (userId: number, text: string) => void;
  onBack: () => void;
}) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    onSend(user.id, text);
    setText("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#efeae2]">
      {/* Header */}
      <div className="h-14 px-4 flex items-center gap-3 bg-white border-b">
        {/* Back Arrow (mobile only) */}
        <button onClick={onBack} className="md:hidden">
          <Icon icon="mdi:arrow-left" width={24} />
        </button>

        <Image
          src="/assets/svg/sehrImg2.svg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="font-medium">{user.name}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 max-w-[75%] rounded-lg break-words ${
                msg.sender === "me"
                  ? "bg-[#dcf8c6]"
                  : "bg-primary-color text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-full outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-green-500 text-white rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
