import Hero from "../../components/sections/Hero";
import Services from "../../components/sections/Services";
import Portofolio from "../../components/sections/Portofolio";
import Features from "../../components/sections/Features";
import Expertise from "../../components/sections/Bio";
import Follow_Us from "../../components/sections/Instagram";
import Reviews from "../../components/sections/Reviews";

export default function LandingPage() {
  return (
    <div className="bg-[#E8D4C3]">
      <Hero />
      <Services />
      <Portofolio />
      <Expertise />
      <Reviews />
      <Follow_Us />
      <Features />
    </div>
  );
}
