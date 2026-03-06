import NavigationBar from "./Components/Organism/NavigationBar";
import HeroSection from "./Components/Organism/HeroSection";
import ProductGrid from "./Components/Organism/ProductGrid";
import ViewAllButton from "./Components/Atoms/ViewAllButton";
import NewsletterSubscribe from "./Components/Organism/NewsletterSubscribe";
import FooterBar from "./Components/Organism/FooterBar";
export default function Home() {
  return (
    <main className="max-w-7xl w-full m-2 flex flex-col gap-2">
      <NavigationBar />
      <HeroSection imageSrc="/Images/heroSectionPic.jpg" />
      <ProductGrid />
      <ViewAllButton/>
      <NewsletterSubscribe/>
      <FooterBar/>
    </main>
  );
}
