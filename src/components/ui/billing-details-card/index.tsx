import { Icon } from "@iconify/react";
import React, { FC } from "react";

import { BillingDetailsCardProps } from "@/types";
import Container from "../../shared/container";
import { Typography } from "../../shared/typography";

const BillingDetailsCard: FC<BillingDetailsCardProps> = ({
  action = false,
  item,
  key,
}) => {
  const { address, region, postalCode } = item || {};

  // Check for missing fields
  const isAddressMissing = !address;
  const isRegionMissing = !region;
  const isPostalCodeMissing = !postalCode;

  // Check if all fields are missing
  const isAllMissing =
    isAddressMissing && isRegionMissing && isPostalCodeMissing;

  return (
    <Container
      key={key}
      styling="!bg-off-white rounded-xl flex flex-col gap-3 p-6 relative !shadow-none"
    >
      {action && (
        <div className="absolute flex gap-3 top-3 right-4">
          <button
            disabled={false}
            className="flex disabled:opacity-50 items-center  gap-1.5 disabled:text-dark-gray text-red disabled:cursor-not-allowed"
          >
            <div>
              <Icon icon="fluent:delete-28-regular" width="16" height="16" />
            </div>
            <div>
              <Typography as="p" size="sm" className="font-semibold">
                Delete
              </Typography>
            </div>
          </button>
          <button
            disabled={false}
            className="flex disabled:opacity-50 items-center gap-1.5  disabled:text-dark-gray text-primary-dark disabled:cursor-not-allowed"
          >
            <div>
              <Icon icon="lets-icons:edit" width="16" height="16" />
            </div>
            <div>
              <Typography as="p" size="sm" className="font-semibold">
                Edit
              </Typography>
            </div>
          </button>
        </div>
      )}

      {/* Conditionally render content based on the presence of address, region, and postalCode */}
      {isAllMissing ? (
        <Typography
          as="p"
          size="md"
          className="text-black font-semibold text-center"
        >
          No billing address available for this card.
        </Typography>
      ) : (
        <>
          <div className={`flex gap-3 ${action && "pt-3"}`}>
            <div className="w-[35%] md:w-[25%]">
              <Typography as="p" size="md" className="text-black font-normal">
                Address:
              </Typography>
            </div>
            <div className="w-[65%] md:w-[75%]">
              <Typography as="p" size="md" className="text-black font-semibold">
                {isAddressMissing ? "No address found" : address}
              </Typography>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-[35%] md:w-[25%]">
              <Typography as="p" size="md" className="text-black font-normal">
                Country:
              </Typography>
            </div>
            <div className="w-[65%] md:w-[75%]">
              <Typography as="p" size="md" className="text-black font-semibold">
                {isRegionMissing ? "No region found" : region}
              </Typography>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-[35%] md:w-[25%]">
              <Typography as="p" size="md" className="text-black font-normal">
                Postal Code:
              </Typography>
            </div>
            <div className="w-[65%] md:w-[75%]">
              <Typography as="p" size="md" className="text-black font-semibold">
                {isPostalCodeMissing ? "No postal code found" : postalCode}
              </Typography>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default BillingDetailsCard;
