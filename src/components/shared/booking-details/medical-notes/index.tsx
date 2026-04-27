"use client";
import { additionalDetails, medicalHeading } from "@/data";
import React from "react";
import { Typography } from "../../typography";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface NoteSectionProps {
  title: string;
  icon: string;
  bgColor: string;
  desc: string;
}

// const NoteSection: React.FC<NoteSectionProps> = ({ title, icon, bgColor, desc }) => (
//   <div className="border rounded-md mt-3">
//     <div className="px-3 py-5">
//       <div className="flex items-center gap-2 mb-2">
//         <div className={`${bgColor} w-10 h-10 flex items-center justify-center rounded`}>
//           <Image src={icon} width={20} height={18} alt={title} />
//         </div>
//         <Typography className="text-[17px] font-bold">{title}</Typography>
//       </div>
//       <Typography className="text-desc-color leading-[26px]">{desc}</Typography>
//     </div>
//   </div>
// );

const MedicalNotes = () => {
  // const sections = [
  //   { title: "Subjective", icon: "/assets/svg/microscope.svg", bgColor: "bg-[#f1f3f8]" },
  //   { title: "Objective", icon: "/assets/svg/stetho.svg", bgColor: "bg-[#f4faf9]" },
  //   { title: "Assessment", icon: "/assets/svg/tube.svg", bgColor: "bg-[#f1f3f8]" },
  //   { title: "Plan", icon: "/assets/svg/file.svg", bgColor: "bg-[#edeff1]" },
  // ];

  // const desc =
  //   "Lorem ipsum dolor sit amet consectetur. Magna lacus purus nibh sit maecenas elementum. Eu nisl congue pulvinar leo non tincidunt. Pellentesque lectus sapien sit purus faucibus.";

  return (
    <div className="bg-white rounded-xl h-[70vh] max-md:h-auto p-8">
      {/* <div className="flex justify-between flex-wrap gap-5 max-md:flex-col">
        {medicalHeading.map((d, i) => (
          <div
            key={i}
            className="basis-[32%] max-xl:basis-[48%] max-md:basis-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out bg-white flex flex-col gap-2 rounded-xl px-5 py-7"
          >
            <Typography className="text-[17px] font-bold">{d.heading}</Typography>


            {sections.map((s, idx) => (
              <NoteSection key={idx} {...s} desc={desc} />
            ))}

            
            {["Follow-up # 1", "Follow-up # 2"].map((follow, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center mt-3 bg-[#F5F5F5] px-3 py-1"
              >
                <Typography className="text-[17px] font-bold">{follow}</Typography>
                <Typography className="text-desc-color">
                  12 / 11 / 2023 | 12:00PM
                </Typography>
              </div>
            ))}
          </div>
        ))}
      </div> */}
      <div>
        {additionalDetails.map((d, i) => (
          <div
            key={i}
            className="border rounded-md flex justify-between max-md:flex-col max-md:gap-3 px-8 py-12 "
          >
            <div className="flex gap-3 items-center">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded bg-[#8DC645]">
                <Icon
                  className="text-white"
                  icon={d.icon}
                  width={24}
                  height={24}
                />
              </div>
              <div className="space-y-1">
                <Typography className="font-bold">{d.title}</Typography>
                <Typography className="text-desc-color">{d.subName}</Typography>
              </div>
            </div>

            <div className="space-y-1">
              <Typography className="font-bold">{d.method}</Typography>
              <Typography className="text-desc-color">{d.subMethod}</Typography>
            </div>
            <div className="space-y-1">
              <Typography className="font-bold">{d.fee}</Typography>
              <Typography className="text-desc-color">{d.amount}</Typography>
            </div>
            <div className="space-y-1">
              <Typography className="font-bold">{d.time}</Typography>
              <Typography className="text-desc-color">{d.mint}</Typography>
            </div>
            <div className="space-y-1">
              <Typography className="font-bold">{d.note}</Typography>
              <Typography className="text-desc-color">{d.dsc}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalNotes;
