import HeroSection from "../../components/organisms/HeroSection";
import ProductGrid from "../../components/organisms/ProductGrid";
import NewsletterSubscribe from "../../components/organisms/NewsletterSubscribe";
import ViewAllButton from "../../components/atoms/ViewAllButton";
import { getStorageAsset } from "@/lib/storage";
import type { ProductItem } from "@/types/product";

type HomePageProps = {
  initialProducts: ProductItem[];
};

export default function HomePage({ initialProducts }: HomePageProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <HeroSection
          imageSrc={getStorageAsset("ferrari_banner.png")}
          ctaHref="/product/testarossa-ferrari-1984"
        />

        <div className="flex flex-col gap-4">
          <ProductGrid initialProducts={initialProducts} />

          <div className="flex justify-center">
            <ViewAllButton href="/collection/all" />
          </div>
        </div>

        <NewsletterSubscribe />
      </div>
    </>
  );
}
