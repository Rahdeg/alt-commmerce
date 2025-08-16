import { Header } from "@/components/Header";
import { ImageGallery } from "@/components/ImageGallery";
import { ProductDetails } from "@/components/ProductDetails";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="Women" />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          {/* Image Gallery - Full width on mobile, left side on desktop */}
          <div className="order-1 lg:order-1">
            <ImageGallery />
          </div>

          {/* Product Details - Full width on mobile, right side on desktop */}
          <div className="order-2 lg:order-2">
            <ProductDetails />
          </div>
        </div>
      </main>
    </div>
  );
}
