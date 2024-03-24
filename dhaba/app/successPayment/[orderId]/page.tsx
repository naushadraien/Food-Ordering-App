"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = ({ params }: { params: { orderId: string } }) => {
  const router = useRouter();
  const { orderId } = params;
  // const searchParams = useSearchParams();
  // const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`/api/confirm-payment-intent/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(payment_intent);
        setTimeout(() => {
          router.push("/orders");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [orderId, router]);

  useEffect(() => {
    const sendMail = async () => {
      await fetch(`/api/confirm-payment-intent/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    sendMail();
    console.log("Triggered");
  }, [orderId]);

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] font-bold flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close this page!
        </p>
      </div>
    </>
  );
};

export default SuccessPage;
