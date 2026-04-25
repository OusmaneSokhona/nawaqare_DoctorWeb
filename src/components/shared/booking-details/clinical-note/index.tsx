// import React from 'react'
// import { Typography } from '../../typography'

// const ClinicalNote = () => {
//   return (
//     <div>
//       <div className='bg-white p-6 flex rounded-xl'>
//        <div className='basis-[60%]'>
//         <Typography size='h5' className='text-[#2c2c2c] font-bold'>Soap Notes</Typography>
//         <div className='space-y-3 mt-4'>
//            <Typography size='lg' className='text-[#2c2c2c] font-bold'>Subjective</Typography>
//            <div className='border rounded-lg px-4 py-6'>
//             <Typography className='text-desc-color font-medium'>Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene</Typography>
//            </div>
//            <Typography size='lg' className='text-[#2c2c2c] font-bold'>Objective</Typography>
//            <div className='border rounded-lg px-4 py-6'>
//             <Typography className='text-desc-color font-medium'>Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene</Typography>
//            </div>
//            <Typography size='lg' className='text-[#2c2c2c] font-bold'>Assessment</Typography>
//            <div className='border rounded-lg px-4 py-6'>
//             <Typography className='text-desc-color font-medium'>Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene</Typography>
//            </div>
//            <Typography size='lg' className='text-[#2c2c2c] font-bold'>Plan</Typography>
//            <div className='border rounded-lg px-4 py-6'>
//             <Typography className='text-desc-color font-medium'>Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene</Typography>
//            </div>
//         </div>
//        </div>
//       </div>
//     </div>
//   )
// }

// export default ClinicalNote
import React from "react";
import { Typography } from "../../typography";
import { Button } from "@/components/shared/button";

const soapNotes = [
  {
    title: "Subjective",
    description:
      "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
  },
  {
    title: "Objective",
    description:
      "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
  },
  {
    title: "Assessment",
    description:
      "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
  },
  {
    title: "Plan",
    description:
      "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
  },
];

const ClinicalNote = () => {
  return (
    <div>
      <div className="bg-white p-6 flex rounded-xl">
        <div className="basis-[60%] max-md:basis-full">
          <div>
            <Typography size="h5" className="text-[#2c2c2c] font-bold">
              Soap Notes
            </Typography>
            <Typography className="text-desc-color">
              Version History: v1.0 - 12 Sep 2023, 11:47 - Dr. Shah
            </Typography>
          </div>

          <div className="space-y-3 mt-6 px-2">
            {soapNotes.map((item, index) => (
              <div key={index} className="">
                <Typography size="lg" className="text-[#2c2c2c] font-bold">
                  {item.title}
                </Typography>

                <div className="border rounded-lg px-4 pt-3 pb-5 mt-1">
                  <Typography className="text-desc-color font-medium">
                    {item.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          {/* 🔽 ACTION BUTTONS */}
          <div className="flex justify-center gap-4 mt-8">
            <Button className="px-6 py-2 rounded-lg bg-[#E5E7EB] text-[#374151]">
              Save as Draft
            </Button>

            <Button className="px-10 py-2 rounded-lg bg-primary-color text-white">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNote;
