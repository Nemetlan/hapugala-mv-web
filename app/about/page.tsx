import dynamic from 'next/dynamic';
import { Navbar } from '../../components/Navbar';
import { PageHero } from '../../components/PageHero';
import { Footer } from '../../components/Footer';
import { BreadcrumbSchema } from '../../components/JsonLd';

const WelcomeSection = dynamic(() => import('../../components/WelcomeSection').then(mod => mod.WelcomeSection));
const EthosSection = dynamic(() => import('../../components/EthosSection').then(mod => mod.EthosSection));
const HeritageSection = dynamic(() => import('./HeritageSection'));

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://hapugalacollege.lk" },
          { name: "About", item: "https://hapugalacollege.lk/about" }
        ]} 
      />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title="About Our School" 
          subtitle="Hapugala Vidyalaya Galle"
          description="A beacon of education and character in the heart of Galle, dedicated to nurturing the leaders of tomorrow."
        />
        
        <WelcomeSection />
        
        <EthosSection />

        <HeritageSection />
      </main>
      <Footer />
    </div>
  );
}
