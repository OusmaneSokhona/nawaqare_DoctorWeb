import Image from "next/image";
import React, { FC } from "react";

import { content } from "@/data";
import { SubscriptionCardProps } from "@/types/dashboard";
import { formatExpiry } from "@/utils/number-utils";
import Container from "../../shared/container";
import { Typography } from "../../shared/typography";

const SubscriptionCard: FC<SubscriptionCardProps> = ({ data }) => {
  const cardConfig = content?.cardDetails?.cardCheckoutData?.find(
    (card) => card?.type === data?.brand,
  );

  const expiryDateValidation =
    data?.expiry !== null
      ? new Date(data?.expiry)
      : new Date(new Date()?.setFullYear(new Date().getFullYear() + 1));

  return (
    <Container styling="flex flex-col gap-3 xl:!px-10 xl:!py-5">
      <div>
        <Typography as="h5" size="h5" className="text-primary-dark">
          License Fee
        </Typography>
      </div>
      <div>
        <Typography as="p" size="lg" className="text-dark-gray font-medium">
          Next Payment : {formatExpiry(expiryDateValidation)}
        </Typography>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <Image
            src={cardConfig?.svg || "/default-card.svg"}
            width={24}
            height={15}
            alt="Card type"
          />
        </div>
        <div>
          <Typography as="p" size="lg" className="text-black font-bold">
            XXXX XXXX XXXX {data?.last4 || "XXXX"}
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default SubscriptionCard;
