"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

import { BankAccountCardProps } from "@/types/dashboard";
import Container from "../../shared/container";
import { Typography } from "../../shared/typography";

const BankAccountCard: FC<BankAccountCardProps> = ({ bankAccounts }) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <Container styling="px-5 md:!px-10 !py-5 md:!py-10 flex flex-col gap-4">
        <div className="flex xs:items-center justify-between w-full gap-4 xs:gap-0 xs:flex-row flex-col">
          <div>
            <Typography as="h5" size="h5" className="text-primary-dark">
              Bank Accounts
            </Typography>
          </div>

          <div>
            <button
              onClick={() => router.push("/add-new-bank")}
              className="flex justify-center items-center gap-2 cursor-pointer"
            >
              <Image
                src="/assets/svg/btn-green.svg"
                alt="btn-green"
                height={24}
                width={24}
              />
              <Typography
                as="p"
                size="lg"
                className="text-primary-dark font-semibold"
              >
                {" "}
                Add New Bank
              </Typography>
            </button>
          </div>
        </div>
        <div>
          <hr className="w-full text-dark-gray" />
        </div>
        <div className="space-y-5">
          {bankAccounts?.map((account, index) => (
            <div
              key={index}
              className="flex justify-between items-start md:gap-4"
            >
              <div className="w-3/5 sm:w-9/12 flex flex-col items-start justify-between">
                <div className="flex items-center gap-1">
                  <Typography
                    as="p"
                    size="md"
                    className="text-primary-text font-semibold"
                  >
                    {account?.bankName}
                  </Typography>
                  |
                  <Typography
                    as="p"
                    size="md"
                    className="text-primary-text font-semibold"
                  >
                    {account?.currency}
                  </Typography>
                </div>
                <div>
                  <Typography
                    as="p"
                    size="sm"
                    className="text-dark-gray leading-relaxed"
                  >
                    IBAN : <br /> {account?.iban}
                  </Typography>
                </div>
              </div>
              <div className="w-2/5 sm:w-1/4">
                {account?.default ? (
                  <Typography
                    as="p"
                    size="md"
                    className="text-primary-dark underline underline-offset-2 font-semibold sm:whitespace-nowrap text-right cursor-pointer"
                  >
                    Default
                  </Typography>
                ) : (
                  <Typography
                    as="p"
                    size="md"
                    className="text-dark-gray underline underline-offset-2 font-semibold sm:whitespace-nowrap text-right cursor-pointer"
                  >
                    Set as default
                  </Typography>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BankAccountCard;
