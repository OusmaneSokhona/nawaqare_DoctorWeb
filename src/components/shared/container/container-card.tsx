import React, { FC } from "react";

import { ContainerCardProps } from "@/types";
import { Typography } from "../typography";

const ContainerCard: FC<ContainerCardProps> = ({
  cardHeading,
  children,
  headingAlign = "center",
  isSubHeading = false,
  subHeading,
}) => {
  return (
    <div className="w-full">
      {cardHeading && (
        <div className="py-8 sm:py-10">
          <Typography
            size="h3"
            as="h3"
            className={`text-primary-text text-${headingAlign}`}
          >
            {cardHeading}
          </Typography>

          {isSubHeading && (
            <Typography size="md" as="p" className="text-dark-gray">
              {subHeading}
            </Typography>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default ContainerCard;
