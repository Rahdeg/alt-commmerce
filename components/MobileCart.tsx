"use client";

import { useState, useEffect, useRef } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface MobileCartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onRemoveItem: (itemId: string) => void;
    onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export function MobileCart({
    isOpen,
    onClose,
    cartItems,
    onRemoveItem,
    onUpdateQuantity
}: MobileCartProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
            <div
                ref={cartRef}
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ShoppingCart className="h-6 w-6 text-orange-500" />
                            <h2 className="text-xl font-bold text-black">Cart ({getTotalItems()})</h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto max-h-96">
                    {cartItems.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                            <p className="text-gray-400 text-sm mt-2">Add some products to get started</p>
                        </div>
                    ) : (
                        <div className="px-6 py-4 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-black truncate">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                                className="h-6 w-6 text-orange-500 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="text-sm font-bold">-</span>
                                            </Button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                className="h-6 w-6 text-orange-500 hover:bg-orange-100"
                                            >
                                                <span className="text-sm font-bold">+</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-2">
                                        <p className="text-sm font-bold text-black">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onRemoveItem(item.id)}
                                            className="h-6 w-6 text-red-500 hover:bg-red-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer with Total and Checkout */}
                {cartItems.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-black">Total:</span>
                            <span className="text-xl font-bold text-black">${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <Button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors duration-200 text-lg"
                        >
                            Checkout
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
