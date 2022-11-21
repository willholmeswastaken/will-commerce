import React, { useMemo } from 'react'
import Stripe from 'stripe'
import { useProductStore } from '../store';
import { getProductDescription, getProductDisplayPrice, getProductImage, getProductName, parseProduct } from '../utils/product-values';

interface CardProps {
    price: Stripe.Price
}

const Card = ({ price }: CardProps) => {
    const product = parseProduct(price);
    const displayPrice = useMemo(() => getProductDisplayPrice(price), [price]);
    const productImage = useMemo(() => getProductImage(product), [product]);
    const productDescription = useMemo(() => getProductDescription(product), [product]);
    const productName = useMemo(() => getProductName(product), [product]);

    const addProduct = useProductStore((state) => state.add);

    return (
        <div>
            <div className="relative">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                    <img
                        src={productImage}
                        alt={productDescription}
                        className="w-full h-full object-center object-cover"
                    />
                </div>
                <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">{productName}</h3>
                </div>
                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                        £{displayPrice}
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <button
                    onClick={() => addProduct(price)}
                    className="relative w-full flex bg-gray-200 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                    Add to bag<span className="sr-only">, {productName}</span>
                </button>
            </div>
        </div>
    )
}

export default Card