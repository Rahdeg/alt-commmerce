"use client";

import { ProductCard } from "./ProductCard";

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    image: string;
}

interface ProductGridProps {
    products: Product[];
    onAddToCart?: (productId: string, quantity: number) => void;
    className?: string;
}

export function ProductGrid({ products, onAddToCart, className = "" }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className={`text-center py-12 ${className}`}>
                <div className="text-gray-500">
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm mt-2">Try adjusting your search or filters</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 ${className}`}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={onAddToCart}
                    className="w-full"
                />
            ))}
        </div>
    );
}

// Sample product data for demonstration
export const sampleProducts: Product[] = [
    {
        id: "1",
        name: "Fall Limited Edition Sneakers",
        price: 125.00,
        originalPrice: 250.00,
        discount: 50,
        rating: 4.8,
        reviewCount: 127,
        image: "/images/image-product-1.jpg"
    },
    {
        id: "2",
        name: "Classic White Sneakers",
        price: 89.99,
        rating: 4.6,
        reviewCount: 89,
        image: "/images/image-product-2.jpg"
    },
    {
        id: "3",
        name: "Premium Leather Sneakers",
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        rating: 4.9,
        reviewCount: 203,
        image: "/images/image-product-3.jpg"
    },
    {
        id: "4",
        name: "Sport Performance Sneakers",
        price: 149.99,
        rating: 4.7,
        reviewCount: 156,
        image: "/images/image-product-4.jpg"
    },
    {
        id: "5",
        name: "Casual Canvas Sneakers",
        price: 69.99,
        rating: 4.5,
        reviewCount: 78,
        image: "/images/image-product-1.jpg"
    },
    {
        id: "6",
        name: "High-Top Basketball Sneakers",
        price: 179.99,
        originalPrice: 219.99,
        discount: 18,
        rating: 4.8,
        reviewCount: 134,
        image: "/images/image-product-2.jpg"
    }
];
