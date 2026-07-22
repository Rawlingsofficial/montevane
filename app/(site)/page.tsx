import { BestSellers } from "@/components/home/BestSellers";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { Editorial } from "@/components/home/Editorial";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BrandShowcase />
      <BestSellers />
      <Editorial />
      <WhyShopWithUs />
      <Newsletter />
    </>
  );
}
