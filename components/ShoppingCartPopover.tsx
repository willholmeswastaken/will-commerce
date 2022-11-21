import { Popover, Transition } from '@headlessui/react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import Stripe from 'stripe'
import checkout from '../pages/api/checkout'
import ShoppingCartItem from './ShoppingCartItem'

interface ShoppingCartPopoverProps {
    products: Stripe.Price[];
    checkout: () => Promise<void>;
}

const ShoppingCartPopover = ({ products, checkout }: ShoppingCartPopoverProps) => {
    return (
        <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8 z-50">
            <Popover.Button className="group -m-2 p-2 flex items-center">
                <ShoppingBagIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{products.length}</span>
                <span className="sr-only">items in cart, view bag</span>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Panel className="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">Shopping Cart</h2>

                    <div className="max-w-2xl mx-auto px-4">
                        <ul role="list" className="divide-y divide-gray-200">
                            {products?.map((price) => <ShoppingCartItem price={price} key={price.id} />)}
                        </ul>
                        {
                            products.length > 0
                                ? (<button
                                    onClick={checkout}
                                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                >
                                    Checkout
                                </button>)
                                : <div className='flex justify-center items-center'><h3 className='flex-grow font-semibold text-lg text-center mt-4'>No items in bag</h3></div>
                        }

                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default ShoppingCartPopover