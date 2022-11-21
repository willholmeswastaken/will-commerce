import { StripeRequestLineItem } from "./StripeRequestLineItem";

export interface CheckoutRequest {
  lineItems: StripeRequestLineItem[];
}
