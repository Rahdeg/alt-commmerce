"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    image: string;
    onAddToCart?: (productId: string, quantity: number) => void;
    className?: string;
}

export function ProductCard({
    id,
    name,
    price,
    originalPrice,
    discount,
    rating = 0,
    reviewCount = 0,
    image,
    onAddToCart,
    className = ""
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleWishlistToggle = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(id, 1);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const renderRating = () => {
        if (rating === 0) return null;

        return (
            <div className="flex items-center space-x-1">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(rating)
                                ? "text-yellow-400 fill-current"
                                : "text-blue-300"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
        );
    };

    return (
        <div
            className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-blue-50">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className={`object-cover transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"
                        }`}
                />

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className={`absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-200 ${isWishlisted ? "text-red-500" : "text-gray-600"
                        }`}
                >
                    <Heart
                        className={`h-4 w-4 transition-all duration-200 ${isWishlisted ? "fill-current" : ""
                            }`}
                    />
                </Button>

                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        -{discount}%
                    </div>
                )}

                {/* Quick Add to Cart Overlay */}
                <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}>
                    <Button
                        onClick={handleAddToCart}
                        className="bg-white text-gray-900 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-200"
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                    </Button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
                {/* Rating */}
                {renderRating()}

                {/* Product Name */}
                <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 leading-tight">
                    {name}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-gray-900">
                        {formatPrice(price)}
                    </span>
                    {originalPrice && originalPrice > price && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button - Mobile Optimized */}
                <Button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-sm md:text-base touch-manipulation"
                >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
