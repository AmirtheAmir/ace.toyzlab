import HeroSection from "../../components/organisms/HeroSection";
import ProductGrid from "../../components/organisms/ProductGrid";
import NewsletterSubscribe from "../../components/organisms/NewsletterSubscribe";
import ViewAllButton from "../../components/atoms/ViewAllButton";
import { getStorageAsset } from "@/lib/storage";

export default function HomePage() {
  return (
    <>
      <HeroSection
        imageSrc={getStorageAsset("ferrari_banner.png")}
        ctaHref="/product/testarossa-ferrari-1984"
      />

      <div className="flex flex-col gap-4">
        <ProductGrid />

        <div className="flex justify-center">
          <ViewAllButton href="/collection/all" />
        </div>
      </div>

      <NewsletterSubscribe />
    </>
  );
}
