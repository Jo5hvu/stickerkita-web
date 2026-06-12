import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import DesignGallery from "@/components/DesignGallery";
import StickerPriceCalculator from "@/components/StickerPriceCalculator";
import TermsProcess from "@/components/TermsProcess";
import FAQ from "@/components/FAQ";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#FFF7EF] text-[#2B1B12]">
      <Navigation />
      <Hero />
      <Products />
      <DesignGallery />
      <StickerPriceCalculator />
      <TermsProcess />
      <FAQ />
      <OrderCTA />
      <Footer />
    </main>
  );
}