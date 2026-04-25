import { Typography } from "@/components/shared/typography";
import React from "react";

const Message = () => {
  return (
    <div className="bg-white rounded-xl p-10">
      <Typography className="pl-80 font-semibold">New message</Typography>
      <div className="mx-auto w-[672px] pt-5">
        <div>
          <label className="text-md text-gray-600">Contact Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg"
            placeholder="xyz"
          />
        </div>
        <div>
          <label className="text-md text-gray-600">Message</label>
          <textarea
            rows={5}
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg resize-none"
            placeholder="Write your message..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Message;
