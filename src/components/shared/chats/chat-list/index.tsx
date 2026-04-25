// "use client";

// import Image from "next/image";

// type ChatUser = {
//   id: number;
//   name: string;
//   lastMessage: string;
//   time: string;
//   avatar: string;
// };

// const users: ChatUser[] = Array.from({ length: 8 }).map((_, i) => ({
//   id: i + 1,
//   name: "Mr. Alex Martin",
//   lastMessage: "Today appointment at.....",
//   time: "1:20",
//   avatar: "/assets/svg/sehrImg2.svg",
// }));

// export default function ChatList({
//   onSelect,
// }: {
//   onSelect: (user: ChatUser) => void;
// }) {
//   return (
//     <div className="w-[360px] rounded-xl border-r bg-white">
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => onSelect(user)}
//           className="flex items-center gap-4 px-4 py-3 border-b cursor-pointer hover:bg-gray-100"
//         >
//           <Image
//             src={user.avatar}
//             alt="avatar"
//             width={42}
//             height={42}
//             className="rounded-full"
//           />

//           <div className="flex-1">
//             <p className="font-medium text-[#2c2c2c] text-lg">{user.name}</p>
//             <p className="text text-desc-color truncate">
//               {user.lastMessage}
//             </p>
//           </div>

//           <span className="text- text-gray-400">{user.time}</span>

//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import Image from "next/image";

type ChatUser = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
};

const users: ChatUser[] = Array.from({ length: 8 }).map((_, i) => ({
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
