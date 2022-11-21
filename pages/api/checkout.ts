import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CheckoutResponse, CheckoutRequest } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutResponse>
) {
  if (req.method != "POST") {
    res.status(405).json({ message: "POST method required" });
  }

  try {
    const body: CheckoutRequest = JSON.parse(req.body);

    const stripe = new Stripe(process.env.STRIPE_SECRET ?? "", {
      apiVersion: "2022-11-15",
    });

    const session = await stripe.checkout.sessions.create({
      success_url: process.env.SUCCESS_URL!,
      cancel_url: process.env.CANCEL_URL!,
      line_items: body.lineItems,
      mode: "payment",
    });

    res.status(201).json({ session });
  } catch (e) {
    // @ts-ignore
    res.status(500).json({ message: e.message });
  }
}
