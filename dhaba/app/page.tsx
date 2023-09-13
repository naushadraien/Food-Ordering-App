import FeaturedItems from "@/components/FeaturedItems";
import OfferTimer from "@/components/OfferTimer";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <main>
      <Slider />
      <FeaturedItems />
      <OfferTimer />
    </main>
  );
}
