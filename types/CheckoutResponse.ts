import Stripe from "stripe";

export interface CheckoutResponse {
  session?: Stripe.Checkout.Session;
  message?: string;
}
