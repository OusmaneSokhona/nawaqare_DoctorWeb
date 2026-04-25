import SuccessCard from "@/components/ui/success-card";

const PaymentSuccess = () => {
  return (
    <div className="pt-8">
      <SuccessCard
        title="Payment Successful"
        description="Payment for the platform fee was successful.
            You now have uninterrupted access to our services.
            Thank you!"
        buttonText="Next"
      />
    </div>
  );
};

export default PaymentSuccess;
