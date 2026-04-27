import React from "react";
import { Typography } from "../../typography";
import Image from "next/image";
import { docPrescription, prescriptionPharmacy } from "@/data";

const DocotorPrescription = () => {
  return (
    <div className="mt-5 bg-white rounded-xl p-8  max-md:h-auto">
      <div className="flex max-md:flex-col gap-8">
        {docPrescription.map((d, i) => (
          <div
            key={i}
            className="w-[430px] max-md:w-full px-5 py-5 shadow-[0_0_10px_rgba(0,0,0,0.3)] bg-white rounded-lg"
          >
            <div className="flex justify-between">
              <div className="flex gap-3">
                <Image
                  src={d.img}
                  width={100}
                  height={100}
                  alt="prof"
                  className=" rounded-[8px]"
                />
                <div className="space-y-1">
                  <Typography className="font-bold text-[#1F2A37]">
                    {d.title}
                  </Typography>
                  <Typography className="text-[#1F2A37] font-medium">
                    Expires on: 12 Dec 2025
                  </Typography>
                  <Typography className="text-[#1F2A37] font-medium">
                    Prescription ID: RX-34028-A
                  </Typography>
                  <Typography className="underline text-primary-color pt-1">
                    Validated by pharmacy
                  </Typography>
                </div>
              </div>
              {/* <Typography className={`${i === 0 ? "bg-secondary-color w-[90px] h-[30px] flex items-center justify-center rounded-full text-white" : "bg-secondary-color2 text-white w-[90px] h-[30px] flex items-center rounded-full justify-center"}`}>{d.txt}</Typography> */}
              <Typography
                className={`${d.btn} w-[90px] h-[30px] flex items-center justify-center rounded-full text-white`}
              >
                {d.txt}
              </Typography>
            </div>
            <hr className="mt-4 mb-4" />
            <div className="space-y-2">
              <Typography className="font-bold text-[#2C2C2C]">
                Amoxicillin 500mg
              </Typography>
              {/* <Typography className='text-[#4F4F4F]'>Morning & evening</Typography> */}
              <Typography className="font-semibold text-desc-color1">
                {d.desc}
              </Typography>
              <Typography className="text-[#828282]">
                Refill until Oct 15,2025
              </Typography>
              <Typography className="font-semibold text-desc-color1">
                {d.dsc}
              </Typography>
              <div className="flex justify-between pt-2">
                <Typography className="text-[#4F4F4F] underline">
                  View Dosage Details
                </Typography>
                <Typography className="text-primary-color underline">
                  View full prescription
                </Typography>
              </div>
            </div>
            <hr className="mt-4 mb-4" />
            <div className="space-y-1">
              <Typography className="text-[#4F4F4F] underline">
                View Patient File
              </Typography>
              <Typography className="text-[#4F4F4F] underline">
                Go to Consultation
              </Typography>
              <Typography className="text-[#4F4F4F] underline">
                Tracking Details
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className=' bg-white rounded-xl p-8'>
    //       <div className="flex max-md:flex-col gap-8">
    //         {docPrescription.map((d, i) => (
    //           <div
    //             key={i}
    //             className="w-[400px] max-md:w-full px-5 py-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white rounded-lg"
    //           >
    //             <div className="flex justify-between">
    //               <div className="flex gap-3">
    //                 <Image src={d.img} width={50} height={50} alt="prof" className=" rounded-[8px]"/>
    //                 <div className="space-y-1">
    //                   <Typography className="font-bold">{d.title}</Typography>
    //                   <Typography className="text-desc-color1">12/sep/2024</Typography>
    //                 </div>
    //               </div>

    //               <Typography
    //                 className={`${d.btn} w-[90px] h-[30px] flex items-center justify-center rounded-full text-white`}
    //               >
    //                 {d.txt}
    //               </Typography>
    //             </div>

    //             <hr className="mt-4 mb-4" />
    //             <div>
    //               <Typography className='font-bold text-[#2C2C2C]'>#RX-20845</Typography>
    //               <Typography className='font-semibold text-desc-color1'>$340</Typography>
    //               <Typography className='text-[#828282]'>Delivery: Pending</Typography>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
  );
};

export default DocotorPrescription;
