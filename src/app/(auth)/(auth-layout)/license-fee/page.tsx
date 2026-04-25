"use client";

import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/shared/button";
import ContainerCard from "@/components/shared/container/container-card";
import Iconify from "@/components/shared/iconify";
import { Typography } from "@/components/shared/typography";
import { LicenceFeeItems } from "@/data";
import { useAppSelector } from "@/redux/hooks";
import { addUser, removeUser } from "@/redux/slices/app-slice";

const LicenceFree = () => {
  const userLicenseFee = 60;
  const LicenseFeeUser = useAppSelector((state) => state.app.licenceFeeUser);
  const dispatch = useDispatch();

  const handleRemoveUser = () => {
    if (LicenseFeeUser === 1) return;
    dispatch(removeUser());
  };
  return (
    <ContainerCard>
      <div className="text-center py-10">
        <Typography
          size={"h4"}
          as={"h4"}
          className="text-primary-text font-bold"
        >
          License Fee / year
        </Typography>
        <Typography
          size={"h1"}
          as={"h1"}
          className="text-primary-text font-bold pt-5"
        >
          {`$${LicenseFeeUser * userLicenseFee}`}
        </Typography>
      </div>
      <hr className="text-dark-gray"></hr>
      <div className="py-8">
        <Typography
          size={"h4"}
          as={"h4"}
          className="text-primary-text font-bold"
        >
          Includes:
        </Typography>
      </div>
      <div className="pb-8 flex flex-col gap-4 select-none">
        {LicenceFeeItems?.map((item) => (
          <div key={item.id} className="flex gap-5 items-center">
            <Image
              src="/assets/svg/licence-check-icon.svg"
              alt={item.text}
              width={24}
              height={24}
            />
            <Typography
              size="lg"
              as="h6"
              className="text-primary-text font-bold"
            >
              {item.text}
            </Typography>
            {item.id === 1 && (
              <div className="flex gap-4 items-center">
                <div
                  className={`rounded-full border border-primary-text w-5 h-5 flex items-center justify-center cursor-pointer ${LicenseFeeUser === 1 && `cursor-not-allowed opacity-60`}`}
                  onClick={handleRemoveUser}
                >
                  <Iconify icon="bx:minus" className="text-primary-text" />
                </div>
                <Typography
                  size="lg"
                  as="h6"
                  className="text-primary-text font-bold"
                >
                  {LicenseFeeUser}
                </Typography>
                <div
                  onClick={() => dispatch(addUser())}
                  className="rounded-full border border-primary-text w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  <Iconify icon="bx:plus" className="text-primary-text" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-8">
        <Button variant="primary" size="medium" className="w-full">
          Pay Now
        </Button>
      </div>
    </ContainerCard>
  );
};

export default LicenceFree;
