import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { SuccessModalProps } from "@/types/dashboard";

const SuccessCard: React.FC<SuccessModalProps> = ({
  title,
  description,
  buttonText,
  nextPageLink,
  skipBtnLink,
  skipBtnText,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 bg-white">
      <div className="max-w-[90px] md:max-w-[100px] xl:max-w-[120px]">
        <Image
          alt="logo"
          src={"/assets/svg/success.svg"}
          height={120}
          width={120}
        />
      </div>
      <div className="w-full space-y-3 md:space-y-4 xl:space-y-7">
        <div className="space-y-0 text-center">
          <Typography as="h3" size="h3" className="font-bold text-primary-text">
            {title}
          </Typography>
          <Typography
            as="p"
            size="lg"
            className="text-dark-gray mx-auto w-full xl:w-[70%]"
          >
            {description}
          </Typography>
        </div>
        <div className="w-full flex flex-col items-center justify-center pt-2 xl:pt-0">
          {nextPageLink ? (
            <Link href={nextPageLink} className="w-full">
              <Button
                className="w-full"
                type="button"
                variant="primary"
                onClick={onClick}
              >
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full"
              type="button"
              variant="primary"
              onClick={onClick}
            >
              {buttonText}
            </Button>
          )}

          {skipBtnLink ? (
            <Link href={skipBtnLink} className=" text-center">
              <Typography
                as="p"
                size="lg"
                className="cursor-pointer text-dark-gray underline underline-offset-2 font-semibold text-center mt-4 w-fit"
              >
                {skipBtnText}
              </Typography>
            </Link>
          ) : (
            skipBtnText && (
              <Typography
                as="p"
                size="lg"
                className="cursor-pointer text-dark-gray underline underline-offset-2 font-semibold text-center mt-4 w-fit"
              >
                {skipBtnText}
              </Typography>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
