"use client";

import { format, isToday, isYesterday, parse } from "date-fns";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/shared/button";
import Iconify from "@/components/shared/iconify";
import { ChatMessage, ChatWithDoctorModalProps } from "@/types/dashboard";

const ChatWithDoctorModal: React.FC<ChatWithDoctorModalProps> = ({
  onClose,
  isOpen,
  lastMessages,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(lastMessages);

  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openTextModal, setOpenTextModal] = useState(false);

  const onCloseHandler = () => {
    setOpenTextModal(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onCloseHandler();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setOpenTextModal(true);
      }, 50);
    }

    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
      setOpenTextModal(false);
    };
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  // Group messages by date label
  const groupedChat: { [key: string]: ChatMessage[] } = {};
  messages.forEach((msg) => {
    const dateObj = parse(msg.timestamp, "dd-MMMM-yyyy, hh:mmaaa", new Date());
    const label = isToday(dateObj)
      ? "Today"
      : isYesterday(dateObj)
        ? "Yesterday"
        : format(dateObj, "dd MMM yyyy");
    if (!groupedChat[label]) groupedChat[label] = [];
    groupedChat[label].push(msg);
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      e.target.value = "";
    }
  };

  const handleSend = () => {
    if (!messageText && !selectedFile) return;

    const now = new Date();
    const timestamp = format(now, "dd-MMMM-yyyy, hh:mmaaa");
    const newMessage: ChatMessage = {
      name: "Waqas ali",
      timestamp,
      isDoctor: false,
      text: messageText || "",
      attachment: selectedFile
        ? {
            name: selectedFile.name,
            url: URL.createObjectURL(selectedFile),
            size: `${(selectedFile.size / 1024).toFixed(1)} Kb`,
          }
        : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");
    setSelectedFile(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end w-full p-6 sm:p-8 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`${openTextModal ? "translate-x-0" : "translate-x-[150%]"} duration-500 ease-in-out transition-all bg-white flex flex-col justify-between gap-1 rounded-2xl py-5 sm:py-7 w-full sm:w-[70%] lg:w-[45%] xl:w-[35%] h-full relative`}
      >
        {/* Header */}
        <div className="border-b border-light-gray pb-6">
          <Iconify
            onClick={onCloseHandler}
            className="absolute top-3 right-3 cursor-pointer"
            height="24"
            width="24"
            icon="material-symbols:cancel-outline-rounded"
            color="#312D2D"
          />
        </div>

        <div className="h-[95%] w-full px-5 sm:px-8 pt-5 flex flex-col">
          {/* Chat List */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto space-y-6"
          >
            {Object.entries(groupedChat).map(([label, messages]) => (
              <div key={label}>
                <div className="mb-4 text-center flex justify-center">
                  <div className="w-fit text-center text-sm text-primary-text bg-background-color border border-light-gray px-3 py-1 rounded-2xl">
                    {label}
                  </div>
                </div>

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.isDoctor ? "justify-start" : "justify-end"} mb-4`}
                  >
                    <div className="max-w-[95%] sm:max-w-[80%] bg-white border border-light-gray rounded-xl px-4 py-3">
                      <div className="flex flex-col-reverse sm:flex-row gap-1 sm:gap-5 justify-between sm:items-center text-xs text-dark-gray mb-2">
                        <span className="font-semibold text-dark-gray">
                          {msg.name}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-md text-primary-text leading-relaxed">
                        {msg.text}
                      </p>
                      {msg.attachment && (
                        <div className="mt-3 border-t border-light-gray pt-2.5">
                          <a
                            href={msg.attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-100 text-green-900 text-sm px-3 py-1 rounded-full"
                          >
                            {msg.attachment.name} ({msg.attachment.size})
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="pt-4 border-t border-light-gray">
            {selectedFile && (
              <p className="mb-2.5 text-sm text-dark-gray px-2">
                Attached: {selectedFile.name}
              </p>
            )}
            <div className="flex gap-3 sm:gap-0 flex-col sm:flex-row items-center w-full bg-white border border-light-gray rounded-xl shadow-sm px-2 sm:px-4 sm:pr-2 py-2">
              <div className="flex-1 w-full sm:w-auto flex justify-between items-end ">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 outline-none text-md placeholder-dark-gray text-primary-text"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer h-[20px] sm:h-auto px-2 sm:py-0"
                >
                  <Iconify
                    icon="mdi:paperclip"
                    className="text-primary-text"
                    width="20"
                    height="20"
                  />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <Button
                type="button"
                size="small"
                variant="primary"
                className="w-full sm:w-fit rounded-lg px-8 py-2.5 font-semibold !text-lg"
                disabled={!messageText && !selectedFile}
                onClick={handleSend}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithDoctorModal;
