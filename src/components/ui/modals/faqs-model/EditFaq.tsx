// "use client";

// import React, { useState } from "react";

// import { Button } from "@/components/shared/button";
// import ModalWrapper from "@/components/shared/modal";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";

// interface EditFaq {
//   isOpen: boolean;
//   onClose: () => void;
//   ChangeStatus: () => void;
//   title?: string;
// }

// const EditFaqModal: React.FC<EditFaq> = ({ onClose, isOpen, title, ChangeStatus, }:  EditFaq) => {
//     // const [openfaq, setOPenfaq] = useState<number | null>(null);

//   return (
//     <ModalWrapper
//       className=""
//     //   title={" Edit  FAQ"}
//     title={title}
//       titleStyling={"text-left"}
//       onClose={onClose}
//       isOpen={isOpen}
//     >
//       <div className="space-y-5 pt-3">
//         <div className="space-y-5">
//         </div>
//         <div className=" flex flex-col gap-5">
//           <div>
//             <Typography className="pb-2 text-primary-color font-semibold">
//               Question
//             </Typography>
//             <input
//               type="text"
//               className="px-3 py-4 bg-white outline-none w-[100%] rounded"
//               placeholder="How much for stress management , RMR consultation? "
//               name=""
//               id=""
//             />
//           </div>
//           <div className="">
//              <Typography className="pb-2 text-primary-color font-semibold">
//               Status
//             </Typography>
//             <div className=" flex relative">
//             <input
//               type="text"
//               className="px-3 py-4 bg-white outline-none w-[100%] rounded  "
//               placeholder="Active"
//               name=""
//               id=""
//             />
//             <div className=" absolute right-2 top-5">
//              <Icon className="text-secondary-color" icon="uim:angle-down" width="24" height="24" />
//             </div>
//             </div>
//           </div>
//           <div>
//             <Typography className="pb-2 text-primary-color font-semibold">
//               Question
//             </Typography>
//             <textarea
//   className="px-3 py-4 bg-white outline-none w-full rounded resize-none"
//   placeholder="Enter the answer..."
//   rows={4}
// />

//           </div>
//         </div>

//          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
//                    <Button variant="outlined" size="medium" className="w-full text-secondary-color" onClick={onClose}>
//                      Cancel
//                    </Button>
//                    <Button
//                      onClick={(e) => {
//                        e.preventDefault();
//                        ChangeStatus();
//                        onClose();
//                      }}

//                      variant="primary"
//                      size="medium"
//                      className="w-full"
//                    >
//                      Update  & Save
//                    </Button>
//                  </div>

//       </div>
//     </ModalWrapper>
//   );
// };

// export default EditFaqModal;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/shared/button";
// import ModalWrapper from "@/components/shared/modal";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";
// import InputTextField from "@/components/shared/input-fields/input-text-field";
// import CustomDropdown from "@/components/shared/custom-dropdown";

// interface EditFaqProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (question: string, answer: string) => void;
//   title?: string;
//   initialQuestion?: string;
//   initialAnswer?: string;
// }

// const EditFaqModal: React.FC<EditFaqProps> = ({
//   onClose,
//   isOpen,
//   title,
//   onSave,
//   initialQuestion = "",
//   initialAnswer = "",
// }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [openfaq, setOpenfaq] = useState<number | null>(null);
//   const [statusOpen, setStatusOpen] = useState(false);
//   const [status, setStatus] = useState("");
//   const [editingFaq, setEditingFaq] = useState<null | number>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!question.trim() || !answer.trim()) return;
//     onSave(question, answer,);
//     onClose();
//   };

//   return (
//     <ModalWrapper
//       title={title}
//       titleStyling="text-left"
//       onClose={onClose}
//       isOpen={isOpen}
//     >
//       <form onSubmit={handleSubmit} className="space-y-5 pt-3">
//         <div>
//           <Typography className="pb-2 text-primary-color font-semibold">
//             Question
//           </Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="How much for stress management , RMR consultation? "
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>
//         {/* <div className="">
//              <Typography className="pb-2 text-primary-color font-semibold">
//               Status
//             </Typography>
//             <div className=" flex relative">
//              <input
//               type="text"
//               className="px-3 py-4 bg-white outline-none w-[100%] rounded  "
//               placeholder=""
//               name=""
//               id=""
//             />

//             <div className=" absolute right-2 top-5" onClick={() => setOpenfaq(openfaq === 1 ? null : 1)}>
//              <Icon className={`${
//                   openfaq === 1
//                     ? "text-tertiary-color"
//                     : "text-tertiary-color rotate-180"
//                 } transition-colors`} icon="uim:angle-down" width="24" height="24" />
//             </div>
//             </div>
//           </div> */}
//         <div>
//           <Typography className="pb-2 text-primary-color font-semibold">
//             Status
//           </Typography>

//           <div className="relative">
//             <div
//               className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//               onClick={() => setStatusOpen(!statusOpen)}
//             >
//               <span>{status}</span>
//               <Icon
//                 icon="uim:angle-down"
//                 width="24"
//                 height="24"
//                 className={`transition-transform ${
//                   statusOpen
//                     ? "rotate-180 text-secondary-color"
//                     : "text-secondary-color"
//                 }`}
//               />
//             </div>
//             {statusOpen && (
//               <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
//                   onClick={() => {
//                     setStatus("Active");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Active
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("inActive");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   inActive
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           <Typography className="pb-2 text-primary-color font-semibold">
//             Answer
//           </Typography>
//           <textarea
//             className="px-3 py-4 bg-white outline-none w-full rounded resize-none placeholder:text-dark-gray"
//             placeholder=""
//             rows={4}
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
//           <Button
//             variant="outlined"
//             size="medium"
//             className="w-full text-secondary-color"
//             onClick={onClose}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="primary"
//             size="medium"
//             className="w-full"
//           >
//             Update & Save
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default EditFaqModal;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/shared/button";
// import ModalWrapper from "@/components/shared/modal";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";

// interface EditFaqProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (question: string, answer: string, status: string) => void;
//   title?: string;
//   initialQuestion?: string;
//   initialAnswer?: string;
//   initialStatus?: string;
// }

// const EditFaqModal: React.FC<EditFaqProps> = ({
//   onClose,
//   isOpen,
//   title,
//   onSave,
//   initialQuestion = "",
//   initialAnswer = "",
//   initialStatus = "Active",
// }) => {
//   const [question, setQuestion] = useState(initialQuestion);
//   const [answer, setAnswer] = useState(initialAnswer);
//   const [status, setStatus] = useState(initialStatus);
//   const [statusOpen, setStatusOpen] = useState(false);

//   useEffect(() => {
//     setQuestion(initialQuestion);
//     setAnswer(initialAnswer);
//     setStatus(initialStatus);
//   }, [initialQuestion, initialAnswer, initialStatus]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!question.trim() || !answer.trim()) return;
//     onSave(question, answer, status);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalWrapper
//       title={title}
//       titleStyling="text-left"
//       onClose={onClose}
//       isOpen={isOpen}
//     >
//       <form onSubmit={handleSubmit} className="space-y-5 pt-3">
//         <div>
//           <Typography className="pb-2 text-primary-color font-semibold">
//             Question
//           </Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="Enter your question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>
//         <div>
//           <Typography className="pb-2 text-primary-color font-semibold">
//             Status
//           </Typography>
//           <div className="relative">
//             <div
//               className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//               onClick={() => setStatusOpen(!statusOpen)}
//             >
//               <span>{status}</span>
//               <Icon
//                 icon="uim:angle-down"
//                 width="24"
//                 height="24"
//                 className={`transition-transform ${
//                   statusOpen
//                     ? "rotate-180 text-secondary-color"
//                     : "text-secondary-color"
//                 }`}
//               />
//             </div>
//             {statusOpen && (
//               <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
//                   onClick={() => {
//                     setStatus("Active");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Active
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("Inactive");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Inactive
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div>
//           <Typography className="pb-2 text-primary-color font-semibold">
//             Answer
//           </Typography>
//           <textarea
//             className="px-3 py-4 bg-white outline-none w-full rounded resize-none font-semibold placeholder:text-dark-gray"
//             placeholder="Enter your answer"
//             rows={4}
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
//           <Button
//             variant="outlined"
//             size="medium"
//             className="w-full text-secondary-color"
//             onClick={onClose}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="primary"
//             size="medium"
//             className="w-full"
//           >
//             Update & Save
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default EditFaqModal;

"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

interface EditFaqProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: string, answer: string, status: string) => void;
  title?: string;
  initialQuestion?: string;
  initialAnswer?: string;
  initialStatus?: string;
}

const EditFaqModal: React.FC<EditFaqProps> = ({
  onClose,
  isOpen,
  title,
  onSave,
  initialQuestion = "",
  initialAnswer = "",
  initialStatus = "Active",
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [status, setStatus] = useState(initialStatus);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    setQuestion(initialQuestion);
    setAnswer(initialAnswer);
    setStatus(initialStatus);
  }, [initialQuestion, initialAnswer, initialStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSave(question, answer, status);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper
      title={title}
      titleStyling="text-left"
      onClose={onClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        {/* Question */}
        <div>
          <Typography className="pb-2  font-semibold">Question</Typography>
          <input
            type="text"
            className="px-3 py-4 bg-white outline-none w-full rounded"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <Typography className="pb-2 font-semibold">Status</Typography>
          <div className="relative">
            <div
              className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
              onClick={() => setStatusOpen(!statusOpen)}
            >
              <span>{status}</span>
              <Icon
                icon="uim:angle-down"
                width="24"
                height="24"
                className={`transition-transform ${
                  statusOpen
                    ? "rotate-180 text-secondary-color"
                    : "text-secondary-color"
                }`}
              />
            </div>
            {statusOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
                <div
                  className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
                  onClick={() => {
                    setStatus("Active");
                    setStatusOpen(false);
                  }}
                >
                  Active
                </div>
                <div
                  className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
                  onClick={() => {
                    setStatus("Inactive");
                    setStatusOpen(false);
                  }}
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Answer */}
        <div>
          <Typography className="pb-2 font-semibold">Answer</Typography>
          <textarea
            className="px-3 py-4 bg-white outline-none w-full rounded resize-none font-semibold placeholder:text-dark-gray"
            placeholder="Enter your answer"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
          <Button
            variant="outlined"
            size="medium"
            className="w-full text-secondary-color"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            // variant="primary"
            size="medium"
            className="w-full bg-primary-color rounded-xl text-white"
          >
            Update & Save
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditFaqModal;
