import React from 'react'
import Stripe from 'stripe';
import { useProductStore } from '../store';
import { getProductDescription, getProductDisplayPrice, getProductImage, getProductName, parseProduct } from '../utils/product-values';

interface ShoppingCartItemProps {
    price: Stripe.Price;
}

const ShoppingCartItem = ({ price }: ShoppingCartItemProps) => {
    const product = parseProduct(price);
    const removeProduct = useProductStore((state) => state.remove);

    return (
        <li key={price.id} className="py-6 flex">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                    src={getProductImage(product)}
                    alt={getProductDescription(product)}
                    className="w-full h-full object-center object-cover"
                />
            </div>

            <div className="ml-4 flex-1 flex flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            {getProductName(product)}
                        </h3>
                        <p className="ml-4">£{getProductDisplayPrice(price)}</p>
                    </div>
                </div>
                <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex">
                        <button onClick={e => removeProduct(price)} type="button" className="font-medium text-red-600 hover:text-red-500">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>

    )
}

export default ShoppingCartItem