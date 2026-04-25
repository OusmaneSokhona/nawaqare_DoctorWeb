"use client";
import React from "react";

interface Props {
  onChatClick: () => void;
  onSignForward: () => void;
}

const ClinicalNote: React.FC<Props> = ({ onChatClick, onSignForward }) => {
  return (
    <div className="space-y-6">
      <textarea
        placeholder="Write clinical notes..."
        className="w-full h-40 p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-color"
      />

      <div className="flex justify-between items-center">
        <button onClick={onChatClick} className="text-gray-600">
          Open Chat
        </button>

        <button
          onClick={onSignForward}
          className="bg-primary-color text-white px-6 py-2 rounded-lg"
        >
          Sign & forward
        </button>
      </div>
    </div>
  );
};

export default ClinicalNote;
