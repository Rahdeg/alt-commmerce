"use client";

import { Menu, ShoppingCart, Trash2, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MobileCart } from "./MobileCart";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface HeaderProps {
    className?: string;
    currentPage?: string;
}

export function Header({ className, currentPage }: HeaderProps) {
    const [activeNavItem, setActiveNavItem] = useState<string>("Women");
    const [cartCount, setCartCount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { name: "Collections", href: "#" },
        { name: "Men", href: "#" },
        { name: "Women", href: "#" },
        { name: "About", href: "#" },
        { name: "Contact", href: "#" }
    ];


    useEffect(() => {
        if (currentPage) {
            setActiveNavItem(currentPage);
        }
    }, [currentPage]);


    useEffect(() => {
        const updateCart = () => {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                try {
                    const cart: CartItem[] = JSON.parse(storedCart);
                    setCartItems(cart);
                    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
                } catch (error) {
                    console.error('Error parsing cart data:', error);
                }
            } else {
                setCartItems([]);
                setCartCount(0);
            }
        };

        updateCart();

        const handleCartUpdate = updateCart;
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    // Close cart when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const removeFromCart = (itemId: string) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    const updateCartItemQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        const updatedCart = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <header className={`w-full bg-white px-4 py-4 shadow-sm relative z-40 ${className}`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    {/* Mobile Layout */}
                    <div className="flex items-center justify-center gap-x-2 md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Open menu"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="size-8" />
                        </Button>
                        <h1 className="text-3xl font-bold text-black">sneakers</h1>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center space-x-8">
                        <h1 className="text-2xl font-bold text-black md:text-3xl">sneakers</h1>

                        <nav className="flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveNavItem(item.name)}
                                    className={`transition-colors relative ${activeNavItem === item.name
                                        ? "text-black"
                                        : "text-gray-500 hover:text-black"
                                        }`}
                                >
                                    {item.name}

                                    {activeNavItem === item.name && (
                                        <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-orange-500" />
                                    )}
                                </a>
                            ))}
                        </nav>
                    </div>


                    <div className="flex items-center space-x-4">
                        <div className="relative" ref={cartRef}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleCart}
                                className="relative hover:bg-gray-100 transition-colors duration-200 h-10 w-10"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="size-7" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>


                            {isCartOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 hidden md:block">
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-black">Cart</h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setIsCartOpen(false)}
                                                className="h-6 w-6 text-gray-500 hover:text-black"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {cartItems.length === 0 ? (
                                            <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex items-center space-x-3">
                                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
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
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="h-6 w-6 text-gray-400 hover:text-red-500 flex-shrink-0"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <div className="border-t pt-4">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="font-bold text-black">Total:</span>
                                                        <span className="font-bold text-black">${getTotalPrice().toFixed(2)}</span>
                                                    </div>
                                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                                                        Checkout
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full overflow-hidden hover:bg-gray-100 transition-colors duration-200 h-10 w-10"
                            aria-label="User profile"
                        >
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/images/image-avatar.png"
                                    alt="User avatar"
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </Button>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                    <div
                        ref={mobileMenuRef}
                        className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-black">Menu</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={closeMobileMenu}
                                    className="h-8 w-8"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <nav className="flex-1 p-6">
                                <ul className="space-y-6">
                                    {navItems.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                onClick={() => {
                                                    setActiveNavItem(item.name);
                                                    closeMobileMenu();
                                                }}
                                                className={`block text-lg font-medium transition-colors ${activeNavItem === item.name
                                                    ? "text-orange-500"
                                                    : "text-gray-700 hover:text-orange-500"
                                                    }`}
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                        <User className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Guest User</p>
                                        <p className="text-xs text-gray-500">Sign in to your account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <MobileCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemoveItem={removeFromCart}
                onUpdateQuantity={updateCartItemQuantity}
            />
        </>
    );
}
