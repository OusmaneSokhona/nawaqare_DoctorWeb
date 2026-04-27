import Image from "next/image";
import React from "react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";
import StarRating from "@/components/sections/custom-star";
import { reviews } from "@/data";

const stats = [
  {
    icon: "streamline-ultimate:rating-star-ribbon",
    stat: "4.7 / 5",
    title: "Average rating",
  },
  {
    icon: "mdi:tick-circle",
    stat: "24",
    title: "Total reviews",
  },
  {
    icon: "pajamas:false-positive",
    stat: "85%",
    title: "Response rate",
  },
];

const criteria = [
  {
    title: "Communication",
    perc: "80",
  },
  {
    title: "Clarity",
    perc: "70",
  },
  {
    title: "Punctuality",
    perc: "60",
  },
  {
    title: "Behaviors",
    perc: "50",
  },
  {
    title: "Quailty",
    perc: "40",
  },
];

const Review = () => {
  return (
    <div className="p-8 bg-white min-h-screen rounded-xl space-y-5">
      <div className="flex items-center gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="border rounded-xl p-3 space-y-2 w-44">
            <div className="bg-primary-color flex items-center justify-center rounded-full h-10 w-10 text-white">
              <Icon icon={stat.icon} width="24" height="24" />
            </div>
            <Typography size={"h5"} as={"h5"}>
              {stat?.stat}
            </Typography>
            <Typography>{stat.title}</Typography>
          </div>
        ))}
      </div>
      <div className="border rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-3">
          <StarRating rating={4} editable={false} />
          <Typography size={"h5"} as={"h5"}>
            4.0
          </Typography>
          <Typography className="text-desc-color">5 Reviews</Typography>
        </div>
        <div className="space-y-2">
          <Typography size={"h6"} as={"h6"}>
            Criteria
          </Typography>
          <div>
            {criteria.map((cre, i) => (
              <div key={i} className="flex items-center gap-2">
                <Typography className="text-desc-color w-28">
                  {cre.title}
                </Typography>
                <div
                  style={{
                    width: `${cre.perc}%`,
                  }}
                  className="bg-primary-color h-2 rounded-xl"
                ></div>
                <span>{cre.perc}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="border basis-[60%] h-[200px] border-gray-200 mt-5 rounded-xl px-3 py-5  ">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Image
              src="/assets/svg/reviewImg.svg"
              width={57}
              height={57}
              alt="prof"
              className=" rounded-full"
            />
            <div className="space-y-1">
              <Typography className="font-bold">Emily Anderson</Typography>
              <Image
                src="/assets/svg/star.svg"
                width={76}
                height={13}
                alt="prof"
                className=" rounded-full"
              />
            </div>
          </div>
        </div>
        <Typography
          as="h5"
          className="font-medium w-[75%] max-md:w-full text-desc-color mt-2"
        >
          Dr. Patel is a true professional who genuinely cares about his
          patients. I highly recommend Dr. Patel to anyone seeking exceptional
          cardiac care.
        </Typography>
      </div> */}

      <Typography size={"h5"} as={"h5"}>
        Review
      </Typography>
      <Typography>Patient review about consultation</Typography>
      <div className="space-y-5">
        {reviews.map((review, i) => (
          <div key={i} className="space-y-2">
            <div className="flex gap-3 items-center">
              <Image
                src={review.image}
                width={57}
                height={57}
                alt="prof"
                className=" rounded-full"
              />
              <div className="space-y-1">
                <Typography className="font-bold">{review.name}</Typography>
                <div className="flex items-center gap-2">
                  <span>{review.rating}</span>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>
            <Typography className="text-desc-color">{review.review}</Typography>
            <Typography className="text-desc-color">
              {" "}
              {review.date}, {review.time}{" "}
            </Typography>
            <Typography className="text-primary-color underline underline-offset-4 font-medium cursor-pointer">
              Reply to patient
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
