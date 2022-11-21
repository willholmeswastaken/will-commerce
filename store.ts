import Stripe from "stripe";
import create from "zustand";
import _ from "lodash";

interface ProductStore {
  products: Stripe.Price[];
  add: (p: Stripe.Price) => void;
  remove: (p: Stripe.Price) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  add: (p: Stripe.Price) =>
    set((state) => ({ products: _.union(state.products, [p]) })),
  remove: (p: Stripe.Price) =>
    set((state) => ({
      products: _.reject(
        state.products,
        (item: Stripe.Price) => item.id === p.id
      ),
    })),
}));
