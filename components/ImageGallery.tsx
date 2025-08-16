"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageGalleryProps {
    className?: string;
}

const productImages = [
    "/images/image-product-1.jpg",
    "/images/image-product-2.jpg",
    "/images/image-product-3.jpg",
    "/images/image-product-4.jpg"
];

const thumbnailImages = [
    "/images/image-product-1-thumbnail.jpg",
    "/images/image-product-2-thumbnail.jpg",
    "/images/image-product-3-thumbnail.jpg",
    "/images/image-product-4-thumbnail.jpg"
];

export function ImageGallery({ className }: ImageGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? productImages.length - 1 : prev - 1
        );
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isModalOpen) return;

            switch (event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isModalOpen]);

    return (
        <>
            <div className={`relative ${className}`}>

                <div className="relative rounded-lg overflow-hidden md:hidden ">
                    <div className="aspect-square relative w-full">
                        <Image
                            src={productImages[currentImageIndex]}
                            alt="Product image"
                            fill
                            className="object-cover cursor-pointer hover:opacity-95 transition-opacity duration-200 "
                            priority={currentImageIndex === 0}
                            onClick={openModal}
                        />


                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 h-10 w-10"
                        >
                            <ChevronLeft className="h-5 w-5 text-black" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 h-10 w-10"
                        >
                            <ChevronRight className="h-5 w-5 text-black" />
                        </Button>

                        {/* Image indicator dots for mobile */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {productImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectImage(index)}
                                    aria-label={`View image ${index + 1}`}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImageIndex
                                        ? "bg-orange-500 scale-125"
                                        : "bg-white/60 hover:bg-white/80"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>


                <div className="relative rounded-lg overflow-hidden hidden md:block">
                    <div className="aspect-square relative max-w-sm mx-auto p-4 rounded-lg">
                        <Image
                            src={productImages[currentImageIndex]}
                            alt="Product image"
                            fill
                            className="object-cover cursor-pointer hover:opacity-95 transition-opacity duration-200 rounded-lg"
                            priority={currentImageIndex === 0}
                            onClick={openModal}
                        />
                    </div>
                </div>


                <div className="mt-6 hidden md:block">
                    <div className="flex justify-center space-x-4">
                        {thumbnailImages.map((thumbnail, index) => (
                            <button
                                key={index}
                                onClick={() => selectImage(index)}
                                aria-label={`Select image ${index + 1}`}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 relative group ${index === currentImageIndex
                                    ? "border-orange-500 ring-2 ring-orange-500/20"
                                    : "border-transparent hover:border-gray-300 hover:scale-105"
                                    }`}
                            >
                                <Image
                                    src={thumbnail}
                                    alt={`Product thumbnail ${index + 1}`}
                                    fill
                                    className={`object-cover transition-all duration-200 ${index === currentImageIndex
                                        ? "scale-105"
                                        : "group-hover:scale-110"
                                        }`}
                                />
                                {/* Active state indicator */}
                                {index === currentImageIndex && (
                                    <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Image Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 ">
                    <div ref={modalRef} className="relative w-full max-w-lg overflow-hidden">

                        <div className="relative">

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeModal}
                                className="absolute top-0 right-5 z-20  hover:bg-transparent"
                            >
                                <X className=" size-8 text-white font-bold" />
                            </Button>

                            {/* Main Image with Navigation */}
                            <div className="relative rounded-lg overflow-hidden mb-6 pt-10">
                                <div className="aspect-square relative max-w-md mx-auto">
                                    <Image
                                        src={productImages[currentImageIndex]}
                                        alt="Product image"
                                        fill
                                        className="object-cover rounded-lg"
                                    />

                                    {/* Navigation Arrows */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 h-10 w-10"
                                    >
                                        <ChevronLeft className="h-5 w-5 text-black" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 h-10 w-10"
                                    >
                                        <ChevronRight className="h-5 w-5 text-black" />
                                    </Button>
                                </div>
                            </div>

                            {/* Thumbnail Navigation in Modal */}
                            <div className="flex justify-center space-x-4">
                                {thumbnailImages.map((thumbnail, index) => (
                                    <button
                                        key={index}
                                        onClick={() => selectImage(index)}
                                        aria-label={`Select image ${index + 1}`}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative group ${index === currentImageIndex
                                            ? "border-orange-500 ring-2 ring-orange-500/20"
                                            : "border-transparent hover:border-gray-300 hover:scale-105"
                                            }`}
                                    >
                                        <Image
                                            src={thumbnail}
                                            alt={`Product thumbnail ${index + 1}`}
                                            fill
                                            className={`object-cover transition-all duration-200 ${index === currentImageIndex
                                                ? "scale-105"
                                                : "group-hover:scale-110"
                                                }`}
                                        />
                                        {/* Active state indicator */}
                                        {index === currentImageIndex && (
                                            <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
