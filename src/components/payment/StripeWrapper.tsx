
import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripeUtils";

interface StripeWrapperProps {
  children: ReactNode;
}

export const StripeWrapper = ({ children }: StripeWrapperProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
