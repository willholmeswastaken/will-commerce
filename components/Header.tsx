import React, { Fragment } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import { useProductStore } from '../store'
import { getProductDescription, getProductDisplayPrice, getProductImage, getProductName, parseProduct } from '../utils/product-values'
import { CheckoutResponse } from '../types'
import Link from 'next/link'
import ShoppingCartItem from './ShoppingCartItem'
import ShoppingCartPopover from './ShoppingCartPopover'

const Header = () => {
    const products = useProductStore((state) => state.products);

    const checkout = async (): Promise<void> => {
        const lineItems = products.map(p => ({
            price: p.id,
            quantity: 1
        }));

        const checkoutResponse = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({ lineItems: lineItems })
        });

        const checkoutResponseParsed: CheckoutResponse = await checkoutResponse.json()
        window.location.href = checkoutResponseParsed.session!.url!;

        console.log(lineItems);
    }
    return (
        <header className="relative bg-white">
            <nav aria-label="Top" className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative px-4 pb-14 sm:static sm:px-0 sm:pb-0">
                    <div className="h-16 flex items-center justify-between">
                        <div className="flex-1 flex">
                            <Link href='/' className='font-semibold text-lg'>
                                Will-Commerce
                            </Link>
                        </div>

                        <div className="flex-1 flex items-center justify-end">
                            <ShoppingCartPopover products={products} checkout={checkout} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header