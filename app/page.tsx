import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Shop from "@/components/Shop";
import Story from "@/components/Story";
import OrderForm from "@/components/OrderForm";
import FAQ from "@/components/FAQ";
import Instagram from "@/components/Instagram";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Shop />
      <Story />
      <OrderForm />
      <FAQ />

      <div className="mt-20 md:mt-28">
        <Instagram />
      </div>

      <div className="mt-20 md:mt-28">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}