'use client';

import { Navbar } from '../../../components/Navbar';
import { PageHero } from '../../../components/PageHero';
import { Footer } from '../../../components/Footer';
import { Users } from 'lucide-react';
import { BreadcrumbSchema } from '../../../components/JsonLd';
import OriginsSection from './OriginsSection';
import ErasSection from './ErasSection';

export default function HistoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://hapugalacollege.lk" },
          { name: "About", item: "https://hapugalacollege.lk/about" },
          { name: "History", item: "https://hapugalacollege.lk/about/history" }
        ]} 
      />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title="Our History" 
          subtitle="Hapugala Vidyalaya Galle"
          description="Tracing our journey from a humble 1902 beginning to a cornerstone of education in Galle."
        />

        <OriginsSection />

        {/* Principals Table */}
        <section className="py-24 bg-cream">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-4 mb-12">
               <Users className="text-gold-heritage" size={32} />
               <h2 className="text-3xl font-serif font-bold text-navy">Succession of Principals</h2>
            </div>
            
            <div className="overflow-x-auto rounded-brand border border-border-grey shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-sm">Principal</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-sm">Period of Service</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-grey">
                  {[
                    { name: "Mr. Mendis", period: "1902 – 1920" },
                    { name: "Mr. Hendy Jayasundara", period: "1920 – 1951" },
                    { name: "Mr. L.D.U. da Silva", period: "1951.11.16 – 1963.06.15" },
                    { name: "Mr. K.L.P. Dyas", period: "1963.06.15 – 1966.03.03" },
                    { name: "Mr. Ansan Vikumasinha", period: "1966.03.03 – 1974.01.01" },
                    { name: "Mr. Cha.Vha.S. (D.W.S.) Mendis", period: "1974.01.01 – 1978.03.28" },
                    { name: "Mr. S. Pethangoda", period: "1978 – 1992" },
                    { name: "Mr. Piyasena Game's", period: "1992 – 2000" },
                    { name: "Mr. S. Kulasinha", period: "2000.06.20 – 2003.09.22" },
                    { name: "Mr. Siril Kalansuriya", period: "2004.02.13 – 2010" },
                    { name: "Mr. K.P.K. Wipul Milinda Padikkorale", period: "2010.09.03 – 2017" },
                    { name: "Mr. M.A.P. Pushpakumara", period: "2018.06.06 – 2026" },
                    { name: "Mr. Dinesh Hettiarachchi", period: "2026 – Present" },
                  ].map((p, i) => (
                    <tr key={i} className="hover:bg-cream/50 transition-colors">
                      <td className="px-6 py-4 text-navy font-medium">{p.name}</td>
                      <td className="px-6 py-4 text-midnight/70">{p.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <ErasSection />

        {/* Closing Prayer */}
        <section className="py-24 bg-cream text-center border-t border-border-grey">
          <div className="max-w-3xl mx-auto px-4">
             <blockquote className="text-2xl font-serif italic text-navy leading-relaxed mb-8">
               &quot;That this school, which has for 117 years daily educated those who will inherit and carry forward the nation, will continue to do so for generations yet to come — this is our prayer.&quot;
             </blockquote>
             <div className="w-24 h-px bg-gold-heritage mx-auto mb-8"></div>
             <p className="text-xs uppercase tracking-[0.3em] text-midnight/50">
               Compiled from institutional historical records
             </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
