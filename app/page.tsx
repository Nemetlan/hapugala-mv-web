import dynamic from 'next/dynamic';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { WelcomeSection } from '../components/WelcomeSection';
import { Footer } from '../components/Footer';
import { SchoolSchema } from '../components/JsonLd';

// Lazy load below-the-fold components
const EthosSection = dynamic(() => import('../components/EthosSection').then(mod => mod.EthosSection));
const HouseSection = dynamic(() => import('../components/HouseSection').then(mod => mod.HouseSection));
const StructureSection = dynamic(() => import('../components/StructureSection').then(mod => mod.StructureSection));
const ClubsSection = dynamic(() => import('../components/ClubsSection').then(mod => mod.ClubsSection));
const AchievementsSection = dynamic(() => import('../components/AchievementsSection').then(mod => mod.AchievementsSection));
const NewsSection = dynamic(() => import('../components/NewsSection').then(mod => mod.NewsSection));
const LocationSection = dynamic(() => import('../components/LocationSection').then(mod => mod.LocationSection));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SchoolSchema />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WelcomeSection />
        <EthosSection />
        <HouseSection />
        <StructureSection />
        <ClubsSection />
        <AchievementsSection />
        <NewsSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
