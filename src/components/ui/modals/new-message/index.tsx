"use client";
import React, { useState } from "react";
import ModalWrapper from "@/components/shared/modal";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) return;
    onSave(title, desc);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper title="New Message" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        {/* Input */}
        <div>
          <Typography className="pb-2 font-semibold">Title</Typography>
          <input
            type="text"
            className="px-3 py-3 w-full bg-white rounded outline-none"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Textarea */}
        <div>
          <Typography className="pb-2 font-semibold">Description</Typography>
          <textarea
            className="px-3 py-3 w-full bg-white rounded outline-none h-32 resize-none"
            placeholder="Write something..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outlined"
            className="w-full text-secondary-color"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full bg-primary-color rounded-xl text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default SimpleModal;
