interface PlaceholderImageProps {
    className?: string;
    alt?: string;
}

export function PlaceholderImage({ className, alt }: PlaceholderImageProps) {
    return (
        <div className={`bg-gradient-to-b from-orange-500 to-orange-300 rounded-lg ${className}`}>
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="w-32 h-20 bg-white/20 rounded-lg mb-2"></div>
                    <p className="text-sm font-medium">Sneaker Image</p>
                </div>
            </div>
        </div>
    );
}
