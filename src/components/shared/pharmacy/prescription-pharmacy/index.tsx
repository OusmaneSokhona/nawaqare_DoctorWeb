// 'use client'
// import React from 'react'
// import { Typography } from '../../typography'
// import { docPrescription, prescriptionPharmacy } from '@/data'

// const cards = [
//     {
//      title:"Dr. A. Raza",
//      date: "Oct 25, 2025",
//     }
// ]

// const PrescriptionPharmacy = () => {
//   return (
//     <div>
//         <div className='mt-5'>
//              <div className="flex max-md:flex-col gap-8">
//                      {prescriptionPharmacy.map((d,i)=>(
//                        <div key={i} className="w-[400px] max-md:w-full px-5 py-5 shadow-lg bg-white rounded-lg">
//                          <div className="flex justify-between">
//                          <div className="flex gap-3">
//                            {/* <Image src={d.img} width={50} height={50} alt="prof" className=" rounded-[8px]"/> */}
//                            <div className="space-y-2">
//                             <Typography className="font-bold text-[#1F2A37]">{d.title}</Typography>
//                            <Typography className="text-desc-color1">12/sep/2024</Typography>
//                            </div>
//                          </div>
//                          <Typography className={`${i === Active ? "bg-secondary-color w-[90px] h-[30px] flex items-center justify-center rounded-full text-white" : "bg-secondary-color2 text-white w-[90px] h-[30px] flex items-center rounded-full justify-center"}`}>{d.txt}</Typography>
//                          </div>
//                           <hr className="mt-4 mb-4" />
//                           <div>
//                            <Typography className='font-bold text-[#2C2C2C]'>Amoxicillin 500mg</Typography>
//                            <Typography className='font-semibold text-desc-color1'>{d.desc}</Typography>
//                            <Typography className='text-[#828282]'>Refill until Oct 15,2025</Typography>
//                           </div>
//                        </div>
//                      ))}
//                    </div>
//            </div>
//     </div>
//   )
// }

// export default PrescriptionPharmacy
"use client";
import React from "react";
import { Typography } from "../../typography";
import { prescriptionPharmacy } from "@/data";
import Image from "next/image";

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Validate":
      return "bg-secondary-color text-white";
    case "Pending":
      return "bg-[#F2994A] text-white";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

const PrescriptionPharmacy = () => {
  return (
    <div className=" bg-white rounded-xl p-8">
      <div className="flex max-md:flex-col gap-8">
        {prescriptionPharmacy.map((d, i) => (
          <div
            key={i}
            className="w-[450px] max-md:w-full px-5 py-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white rounded-lg"
          >
            <div className="flex justify-between max-md:flex-col max-md:gap-4">
              <div className="flex items-start gap-3">
                <Image
                  src={d.img}
                  width={80}
                  height={80}
                  alt="prof"
                  className=" rounded-[8px]"
                />
                <div className="space-y-1">
                  <Typography className="font-bold">{d.title}</Typography>
                  <Typography className="text-desc-color1">
                    Validated: 12 Dec 2025
                  </Typography>
                  <Typography className="text-desc-color1">
                    Prescription ID: RX-34028-A
                  </Typography>
                  <Typography className="text-primary-color underline">
                    Validated by pharmacy
                  </Typography>
                </div>
              </div>

              {/* <Typography 
                className={`${d.btn} w-[90px] h-[30px] flex items-center justify-center rounded-full text-white`}
              >
                {d.txt}
              </Typography> */}
              <button
                className={`px-6 py-2 h-[40px] max-md:w-[110px] font-medium rounded-full ${getStatusClasses(
                  d.status,
                )}`}
              >
                {d.status}
              </button>
            </div>

            <hr className="mt-4 mb-4" />
            <div className="space-y-1">
              <Typography className="font-bold text-lg text-[#2C2C2C]">
                Amoxicillin 500mg
              </Typography>
              <Typography className="font-medium text-md text-[#2C2C2C]">
                Morning & evening
              </Typography>
              <Typography className="font-medium text-md text-desc-color">
                Refill until Oct 15,2025
              </Typography>
              <Typography className="font-medium text-md text-desc-color">
                Processed by: Ayesha Khan (PH-1023)
              </Typography>
              <Typography className="text-primary-color underline">
                View full prescription
              </Typography>
              <div className="pt-3">
                <div className="w-[381px] max-md:w-full h-2 bg-[#EAEEF7] rounded-full">
                  <div className="bg-primary-color rounded-full h-2 w-[236px] "></div>
                </div>
              </div>
              <div className="flex justify-between max-md:flex-col pt-4">
                <Typography>Pending</Typography>
                <Typography>Preparing</Typography>
                <Typography>Out for delivery</Typography>
                <Typography>Delivered</Typography>
                <Typography>Failed</Typography>
              </div>
            </div>
            {/* <hr className="mt-4 mb-4" /> */}
            <div className="pt-2">
              {/* <Typography className='font-bold text-[#2C2C2C]'>#RX-20845</Typography> */}
              <Typography className="font-semibold text-desc-color1 underline">
                Revalidate
              </Typography>
              <Typography className="font-semibold text-desc-color1 underline">
                Mark as Out of Stock
              </Typography>
              <Typography className="font-semibold text-desc-color1 underline">
                Cancel
              </Typography>
              {/* <Typography className='text-[#828282]'>Delivery: Pending</Typography> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionPharmacy;
