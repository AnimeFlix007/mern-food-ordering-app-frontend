/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const displayRazorPay = async (amount: any, callback: any) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    toast.error("Server Error!! Please try after sometime..");
    return;
  }

  const options = {
    key: "rzp_test_ZLNI9QNCLztFk3",
    currency: "INR",
    amount: amount * 100,
    name: "Foody Cafe",
    description: "Thanks for Purchasing",
    image: "https://i.imgur.com/Zb3NMb2.png",

    handler: async function () {
      await callback()
      toast.success("SuccessFull Payment!!");
    }
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
};

const loadScript = (src: string) => {
  return new Promise((res, rej) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      res(true);
    };

    script.onerror = () => {
      rej(false);
    };

    document.body.appendChild(script);
  });
};