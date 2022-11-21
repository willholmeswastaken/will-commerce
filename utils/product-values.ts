import Stripe from "stripe";

export const parseProduct = (p: Stripe.Price): Stripe.Product =>
  p.product as Stripe.Product;

export const getProductName = (p: Stripe.Product) => p.name;

export const getProductImage = (p: Stripe.Product): string => p.images[0]!;

export const getProductDescription = (p: Stripe.Product): string =>
  p.description!;

export const getProductDisplayPrice = (p: Stripe.Price): string =>
  Number(p.unit_amount! / 100).toFixed(2);
