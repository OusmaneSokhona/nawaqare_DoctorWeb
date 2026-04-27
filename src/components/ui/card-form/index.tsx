"use client";

import { FC, useState } from "react";
import Cards from "react-credit-cards-2";

import "react-credit-cards-2/dist/es/styles-compiled.css";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import ChooseCard from "@/components/ui/choose-card";
import CardFormSkeleton from "@/components/ui/skeletons/card-form-skeleton";
import ChooseCardSkeleton from "@/components/ui/skeletons/choose-card-skeleton";

const CardForm: FC<any> = ({
  paymentIntentClient,
  addNewCard = false,
  cardAlreadyAdded = false,
  cardsListData,
  isLoading,
  amount,
  formData = {},
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const elements = useElements();
  const queryParams = searchParams?.toString();
  const stripe = useStripe();
  const defaultCardId =
    cardsListData?.defaultCard || cardsListData?.cards[0]?.id;

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleDefaultChange = (id: string) => {
    console.log("Default payment id:", id);
  };

  if (isLoading) {
    return <CardFormSkeleton />;
  }

  const handleCheckout = () => {
    if (!stripe || !elements) {
      return;
    }

    if (cardAlreadyAdded) {
      // If card is already added, confirm the payment using the existing payment method ID
      stripe
        ?.confirmPayment({
          clientSecret: paymentIntentClient,
          confirmParams: {
            payment_method: cardsListData?.defaultCard || defaultCardId,
            return_url: `${process.env.NEXT_PUBLIC_STRIPE_RETURN_URL}/payment-status?status=success`,
          },
        })
        ?.then((result) => {
          if (result?.error) {
            toast?.error(result?.error?.message);
            router.push("/payment-status?status=failed");
          } else {
            router.push("/payment-status?status=success");
          }
        });
    } else {
      // Prepare billing details only if they are available
      const billingDetails =
        formData?.city ||
        formData?.postalCode ||
        formData?.stateOrProvince ||
        formData?.region
          ? {
              address: {
                city: formData?.city,
                postal_code: formData?.postalCode,
                state: formData?.stateOrProvince,
                country: formData?.region,
                line1: formData?.address,
              },
            }
          : {};

      // If adding a new card, confirm the payment using the card elements
      stripe
        ?.confirmCardPayment(paymentIntentClient, {
          payment_method: {
            card: elements?.getElement(
              CardNumberElement,
            ) as StripeCardNumberElement,
            billing_details: billingDetails, // This will be empty if no details are provided
          },
          setup_future_usage: "on_session",
          return_url: `${process.env.NEXT_PUBLIC_STRIPE_RETURN_URL}/payment-status?status=success`,
        })
        ?.then((result) => {
          if (result?.error) {
            toast?.error(result?.error?.message);
            router.push("/payment-status?status=failed");
          } else {
            handleDefaultChange(
              result?.paymentIntent?.payment_method as string,
            );
            router.push("/payment-status?status=success");
          }
        });
    }
  };

  return (
    <div
      className={`w-full h-max bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] rounded-[22px] flex flex-col ${!cardAlreadyAdded && "pt-5 lg:pt-10"}`}
    >
      {!cardAlreadyAdded && (
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus as any}
        />
      )}
      <div className="grid w-full grid-cols-2 gap-6 p-5 lg:p-10">
        {!cardAlreadyAdded ? (
          <>
            <div className="flex flex-col w-full col-span-2 gap-2">
              <Typography as="p" size="lg" className="font-semibold">
                Card Number <span className="text-red">*</span>
              </Typography>
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#000000",
                      "::placeholder": {
                        color: "#A1A1A1",
                      },
                    },
                    invalid: {
                      color: "#ff4444",
                    },
                  },
                }}
                onFocus={() => setState({ ...state, focus: "number" })}
                className="w-full px-5 ! py-4 border rounded-[12px] text-h6 placeholder:text-h6 placeholder:text-dark-gray disabled:text-dark-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-dull-white focus:outline-none hover:border-purple"
              />
            </div>
            <div className="flex flex-col w-full col-span-2 gap-2">
              <Typography as="p" size="lg" className="font-semibold">
                Card Holder <span className="text-red">*</span>
              </Typography>
              <input
                type="text"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                onFocus={() => setState({ ...state, focus: "name" })}
                placeholder="Enter your first name"
                className="w-full px-5 py-4 border rounded-[12px] text-h6 placeholder:text-h6 placeholder:text-dark-gray disabled:text-dark-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-dull-white focus:outline-none hover:border-purple"
              />
            </div>
            <div className="flex w-full col-span-2 gap-3">
              <div className="flex flex-col w-full col-span-1 gap-2">
                <Typography as="p" size="lg" className="font-semibold">
                  Expiry Date <span className="text-red">*</span>
                </Typography>
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#000000",
                        "::placeholder": {
                          color: "#A1A1A1",
                        },
                      },
                      invalid: {
                        color: "#ff4444",
                      },
                    },
                  }}
                  onFocus={() => setState({ ...state, focus: "expiry" })}
                  className="w-full px-5 ! py-4 border rounded-[12px] text-h6 placeholder:text-h6 placeholder:text-dark-gray disabled:text-dark-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-dull-white focus:outline-none hover:border-purple"
                />
              </div>
              <div className="flex flex-col w-full col-span-1 gap-2">
                <Typography as="p" size="lg" className="font-semibold">
                  CVV/CVC <span className="text-red">*</span>
                </Typography>
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#000000",
                        "::placeholder": {
                          color: "#A1A1A1",
                        },
                      },
                      invalid: {
                        color: "#ff4444",
                      },
                    },
                  }}
                  onFocus={() => setState({ ...state, focus: "cvc" })}
                  className="w-full px-5 ! py-4 border rounded-[12px] text-h6 placeholder:text-h6 placeholder:text-dark-gray disabled:text-dark-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-dull-white focus:outline-none hover:border-purple"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col w-full col-span-2">
              <div className="flex justify-between items-center w-full flex-wrap gap-3 flex-row sm:gap-0">
                <Typography as="h5" size="h5" className="text-primary-text">
                  Choose card
                </Typography>

                <button
                  onClick={() =>
                    router.push(
                      `/add-new-card?redirectUrl=${pathname + "?" + queryParams}`,
                    )
                  }
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
            <div className="col-span-2">
              <hr className="w-full text-light-gray" />
            </div>
            <div className="flex flex-col w-full col-span-2 gap-3">
              {false ? (
                <>
                  <ChooseCardSkeleton />
                  <ChooseCardSkeleton />
                  <ChooseCardSkeleton />
                </>
              ) : (
                cardsListData?.cards?.map((card: any, index: any) => {
                  return (
                    <ChooseCard
                      isDefault={cardsListData?.defaultCard}
                      key={index}
                      data={card}
                      onChange={() => handleDefaultChange(card?.id)}
                    />
                  );
                })
              )}
            </div>
          </>
        )}
        {!addNewCard && (
          <>
            <div className="col-span-2">
              <hr className="w-full bg-light-gray" />
            </div>
            <div className="flex justify-between w-full col-span-2">
              <div>
                <Typography
                  as="p"
                  size="lg"
                  className="text-dark-gray font-medium"
                >
                  Subtotal
                </Typography>
              </div>
              <div>
                <Typography
                  as="p"
                  size="lg"
                  className="text-dark-gray font-medium"
                >
                  $ {amount}
                </Typography>
              </div>
            </div>
            <div className="col-span-2">
              <hr className="w-full bg-light-gray" />
            </div>
            <div className="flex justify-between w-full col-span-2">
              <div>
                <Typography
                  as="p"
                  size="lg"
                  className="text-primary-text font-bold"
                >
                  Total
                </Typography>
              </div>
              <div>
                <Typography
                  as="p"
                  size="lg"
                  className="text-primary-text font-bold"
                >
                  $ {amount}
                </Typography>
              </div>
            </div>
          </>
        )}
        {addNewCard ? (
          <div className="w-full col-span-2">
            <Button
              type="submit"
              className="w-full text-white font-semibold text-lg"
              variant="primary"
            >
              Save Card
            </Button>
          </div>
        ) : (
          <div className="w-full col-span-2">
            <Button
              onClick={handleCheckout}
              className="w-full text-white font-semibold text-lg"
              variant="primary"
            >
              Pay Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CardForm;
