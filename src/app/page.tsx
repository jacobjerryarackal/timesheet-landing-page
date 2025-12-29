import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import Stats from '@/components/Stats/Stats';
import Footer from '@/components/Footer/Footer';
import Testimonials from '@/components/Testimonials/Testimonials';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Testimonials />
        {/* Add Pricing, Testimonials, Contact sections as needed */}
      </main>
      <Footer />
    </>
  );
}