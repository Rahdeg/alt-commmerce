"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface ProductDetailsProps {
    className?: string;
}

export function ProductDetails({ className }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => Math.max(0, prev - 1));

    const addToCart = () => {
        if (quantity > 0) {

            const existingCart = localStorage.getItem('cart');
            const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];


            const newItem: CartItem = {
                id: 'fall-limited-sneakers',
                name: 'Fall Limited Edition Sneakers',
                price: 125.00,
                quantity: quantity,
                image: '/images/image-product-1-thumbnail.jpg'
            };


            const existingItemIndex = cart.findIndex((item: CartItem) => item.id === newItem.id);

            if (existingItemIndex >= 0) {

                cart[existingItemIndex].quantity += quantity;
            } else {

                cart.push(newItem);
            }


            localStorage.setItem('cart', JSON.stringify(cart));


            window.dispatchEvent(new CustomEvent('cartUpdated'));


            setQuantity(0);

            console.log(`Added ${quantity} items to cart`);
        }
    };

    return (
        <div className="flex justify-center items-start w-full min-h-screen py-8">
            <div className={`max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${className}`}>
                <div className="space-y-4 md:space-y-6 px-4 md:px-6">

                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Sneaker Company
                    </p>


                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Fall Limited Edition Sneakers
                    </h1>


                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        These low-profile sneakers are your perfect casual wear companion.
                        Featuring a durable rubber outer sole, they&apos;ll withstand everything
                        the weather can offer.
                    </p>


                    <div className="flex  md:flex-col  items-center justify-between md:items-start py-2">
                        <div className="flex items-center space-x-2 md:space-x-3">
                            <span className="text-2xl md:text-3xl font-bold text-gray-900">$125.00</span>
                            <span className="bg-black text-white text-xs md:text-sm font-bold px-2 py-1 rounded-md">
                                50%
                            </span>
                        </div>
                        <span className="text-base md:text-lg text-gray-500 line-through">$250.00</span>
                    </div>



                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center w-full">

                        <div className="flex w-full md:w-auto md:min-w-[200px] md:max-w-2xl items-center bg-blue-50 rounded-lg border-2 border-transparent focus-within:border-orange-500 transition-all duration-200 h-14 md:h-16">
                            <Button
                                variant="ghost"
                                onClick={decreaseQuantity}
                                disabled={quantity === 0}
                                className="h-full w-14 md:w-16 text-orange-500 hover:bg-blue-200 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 touch-manipulation rounded-l-lg flex items-center justify-center p-0"
                            >
                                <Minus className="h-8 w-8 md:h-10 md:w-10" />
                            </Button>

                            <span className="flex-1 text-center font-semibold text-gray-900 text-lg md:text-xl">
                                {quantity}
                            </span>

                            <Button
                                variant="ghost"
                                onClick={increaseQuantity}
                                className="h-full w-14 md:w-16 text-orange-500 hover:bg-blue-200 hover:text-orange-600 transition-all duration-200 touch-manipulation rounded-r-lg flex items-center justify-center p-0"
                            >
                                <Plus className="h-8 w-8 md:h-10 md:w-10" />
                            </Button>
                        </div>


                        <Button
                            onClick={addToCart}
                            disabled={quantity === 0}
                            className="w-full md:flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-black font-bold !h-14 md:!h-16 px-8 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation text-lg md:text-xl md:min-w-[200px]"
                        >
                            <ShoppingCart className="h-7 w-6 md:h-7 md:w-7 mr-3" />
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
