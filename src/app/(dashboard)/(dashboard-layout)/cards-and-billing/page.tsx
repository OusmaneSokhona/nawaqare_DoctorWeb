"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Card from "@/components/shared/card";
import Container from "@/components/shared/container";
import Iconify from "@/components/shared/iconify";
import { Typography } from "@/components/shared/typography";
import BankAccountCard from "@/components/ui/bank-account-card";
import BillingDetailsCard from "@/components/ui/billing-details-card";
import BankAccountCardSkeleton from "@/components/ui/skeletons/bank-acccount-card-skeleton";
import BillingDetailsCardSkeleton from "@/components/ui/skeletons/billing-details-card-skeleton";
import CardSkeleton from "@/components/ui/skeletons/card-skeleton";
import { CardsBillings } from "@/data";

const CardsBillingsPage: NextPage = () => {
  const router = useRouter();
  const {
    cardsListData,
    billingAddressData,
    transactionsData,
    bankAccountsData,
  } = CardsBillings;

  const handleDefaultChange = (id: string): void => {
    console.log("default payment method id", id);
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col w-full sm:w-[95%] xl:w-full gap-3 xl:gap-5">
        <div className="flex flex-col gap-0 pl-3 xl:pl-0">
          <div>
            <Typography as="h4" size="h4" className="text-primary-dark">
              Cards & Billing
            </Typography>
          </div>
        </div>
        <div className="w-full">
          <Container styling="w-full flex flex-col gap-3 px-5 xl:!px-10 !py-5">
            <div className="flex xs:items-center justify-between gap-4 xs:gap-0 xs:flex-row flex-col">
              <div className="flex items-center gap-2.5">
                <Typography as="h5" size="h5" className="text-primary-dark">
                  Saved Cards
                </Typography>
                <button
                  disabled={false}
                  className="flex items-center disabled:opacity-50 gap-1  disabled:text-dark-gray text-primary-dark disabled:cursor-not-allowed"
                >
                  <Iconify icon="lets-icons:edit" width="16" height="16" />
                  <Typography as="p" size="sm" className="font-semibold">
                    Edit
                  </Typography>
                </button>
              </div>
              <div>
                <button
                  onClick={() => router.push("/add-new-card")}
                  className="flex justify-center items-center gap-2 xs:!py-3 cursor-pointer"
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
                    Add New Card
                  </Typography>
                </button>
              </div>
            </div>
            <div className="flex w-full gap-5 overflow-x-auto">
              {false ? (
                // Render skeleton loaders while card data is loading
                Array(4)
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  .fill()
                  .map((_, index) => <CardSkeleton key={index} />)
              ) : cardsListData?.cards?.length > 0 ? (
                // Render actual card list if data is available
                cardsListData?.cards
                  ?.sort((a, b) => {
                    // If a card is the default card, it should appear first
                    if (a.id === cardsListData?.defaultCard) return -1;
                    if (b.id === cardsListData?.defaultCard) return 1;
                    return 0;
                  })
                  ?.map((card, index) => (
                    <Card
                      key={index}
                      isDefault={card?.id === cardsListData?.defaultCard}
                      cardData={card}
                      onChange={() => handleDefaultChange(card?.id)}
                    />
                  ))
              ) : (
                // Render a message if no cards are found
                <div className="flex items-center justify-center w-full py-6">
                  <Typography
                    as="p"
                    size="md"
                    className="text-dark-gray font-medium"
                  >
                    No cards available
                  </Typography>
                </div>
              )}
            </div>
          </Container>
        </div>
        <div className="flex flex-col justify-between w-full gap-3 pb-10 lg:gap-5 lg:flex-row">
          <div className="flex flex-col gap-3 lg:gap-5 lg:w-[60%]">
            <div>
              <Container styling="flex flex-col gap-3 px-5 md:!px-10 !py-5 md:!py-8">
                <div className="flex items-center gap-1">
                  <Typography as="h5" size="h5" className="text-primary-dark">
                    Billing Information
                  </Typography>
                  <span className="text-sm font-inter !text-black">
                    ( Last 2 added )
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {false ? (
                    // Render skeleton loaders while data is loading
                    Array.from({ length: 2 }).map((_, index) => (
                      <BillingDetailsCardSkeleton key={index} />
                    ))
                  ) : billingAddressData && billingAddressData.length > 0 ? (
                    // Render actual billing information once data is loaded
                    billingAddressData
                      ?.slice(0, 2)
                      ?.map((item, index) => (
                        <BillingDetailsCard item={item} key={index} action />
                      ))
                  ) : (
                    // Render a message if no billing address is found
                    <div className="flex justify-center py-6">
                      <Typography
                        as="p"
                        size="md"
                        className="text-dark-gray font-semibold"
                      >
                        No billing address found
                      </Typography>
                    </div>
                  )}
                </div>
              </Container>
            </div>
          </div>
          <div className="lg:w-[40%]">
            {false ? (
              // Render skeleton loader while transactions data is loading
              <BankAccountCardSkeleton />
            ) : transactionsData?.items && transactionsData.items.length > 0 ? (
              // Render actual transactions once data is loaded
              <BankAccountCard bankAccounts={bankAccountsData.items} />
            ) : (
              // Render a message if no transactions are found
              <Container styling="px-5 md:!px-10 py-5 md:!py-8 flex flex-col gap-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <Typography as="h5" size="h5" className="text-primary-dark">
                      Bank Accounts
                    </Typography>
                  </div>
                </div>
                <div className="flex justify-center py-6">
                  <Typography
                    as="p"
                    size="md"
                    className="text-dark-gray font-semibold"
                  >
                    No bank accounts found
                  </Typography>
                </div>
              </Container>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsBillingsPage;
