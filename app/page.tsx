import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { WelcomeSection } from '../components/WelcomeSection';
import { EthosSection } from '../components/EthosSection';
import { HouseSection } from '../components/HouseSection';
import { StructureSection } from '../components/StructureSection';
import { ClubsSection } from '../components/ClubsSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { NewsSection } from '../components/NewsSection';
import { LocationSection } from '../components/LocationSection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
