import React from 'react';
import './Home.css';
import Hero from '../components/Hero';
import BrandsSection from '../components/BrandsSection';
import WhySection from '../components/WhySection';
import BrandsCarousel from '../components/BrandsCarousel';
import Categories from '../components/Categories';
import Overview from '../components/Overview';
import Testimonials from '../components/Testimonials';
import TellUs from '../components/TellUs';

export default function Home(){
  return (
    <main className="home">
      <Hero />
      <BrandsSection />
      <WhySection />
      <BrandsCarousel />
      <Categories />
      <Overview />
      <Testimonials />
      <TellUs />
    </main>
  )
}
