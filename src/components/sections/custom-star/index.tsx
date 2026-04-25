"use client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const StarRating = ({ rating, onRatingChange, editable = true }: any) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => editable && setHover(star)}
          onMouseLeave={() => editable && setHover(0)}
          className={`transition-all duration-200 focus:outline-none ${
            editable ? "cursor-pointer" : "cursor-default"
          }`}
          disabled={!editable}
        >
          <Icon
            icon="material-symbols:star"
            width="28"
            height="28"
            className={`transition-colors duration-200 ${
              star <= (editable ? hover || rating : rating)
                ? "text-[#FFA500]"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
