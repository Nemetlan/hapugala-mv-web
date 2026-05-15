'use client';
import { Navbar } from '../../../components/Navbar';
import { PageHero } from '../../../components/PageHero';
import { Footer } from '../../../components/Footer';
import { motion } from 'motion/react';
import { Calendar, Users, Landmark, Award } from 'lucide-react';
import { BreadcrumbSchema } from '../../../components/JsonLd';

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
...
        <PageHero 
          title="Our History" 
          subtitle="Hapugala Vidyalaya Galle"
          description="Tracing our journey from a humble 1902 beginning to a cornerstone of education in Galle."
        />

        {/* Origins Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gold-tint text-gold-heritage flex items-center justify-center rounded-full">
                  <Landmark size={24} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-navy m-0">Origins and Foundation (1902)</h2>
              </div>
              
              <p className="text-midnight/80 leading-relaxed">
                The Ga/Hapugala Maha Vidyalaya stands as an institution of 117 years of proud history, situated in proximity to the Gin Ganga river, near Komaliya, in the Galle district of Sri Lanka. Its founding is inseparably tied to the philanthropic vision of a wealthy landowner of Galle, who approached <strong>Andyess George Jayasundara Mudalidu</strong> of Hapugala to establish a school for the village children.
              </p>
              
              <p className="text-midnight/80 leading-relaxed">
                On <strong>2nd January 1902</strong>, Andyess George Jayasundara Mudalidu officially founded the school. The land, measuring 2 roods and 1 perch, had previously been used for coconut and areca nut cultivation. The school commenced operations in a newly constructed coconut-thatched shed with approximately two dozen students.
              </p>

              <div className="bg-cream p-8 rounded-brand border-l-4 border-gold-heritage my-12 italic text-navy/80">
                The school was formally named the &quot;Rajagisheka Baudha Miga Padyashalawa&quot; (Rajagisheka Buddhist Mixed School), reflecting both its religious character and its founding spirit.
              </div>
            </motion.div>
          </div>
        </section>

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
                    { name: "Mendis Mahatha", period: "1902 – 1920" },
                    { name: "Hendy Jayasundara Mahatha", period: "1920 – 1951" },
                    { name: "L.D.U. da Silva Mahatha", period: "1951.11.16 – 1963.06.15" },
                    { name: "K.L.P. Dyas Mahatha", period: "1963.06.15 – 1966.03.03" },
                    { name: "Ansan Vikumasinha Mahatha", period: "1966.03.03 – 1974.01.01" },
                    { name: "Cha.Vha.S. (D.W.S.) Mendis Mahatha", period: "1974.01.01 – 1978.03.28" },
                    { name: "S. Pethangoda Mahatha", period: "1978 – 1992" },
                    { name: "Piyasena Game&apos;s Mahatha", period: "1992 – 2000" },
                    { name: "S. Kulasinha Mahatha", period: "2000.06.20 – 2003.09.22" },
                    { name: "Siril Kalansuriya Mahatha", period: "2004.02.13 – 2010" },
                    { name: "K.P.K. Wipul Milinda Padikkorale Mahatha", period: "2010.09.03 – 2017" },
                    { name: "M.F.P. Pushpakumara Mahatha", period: "2018.06.06 – Present" },
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

        {/* Key Eras */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-24">
              {/* Pethangoda Era */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-blue-tint text-navy flex items-center justify-center rounded-full">
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy">The Transformative Era (1978–1992)</h3>
                </div>
                <p className="text-midnight/80 leading-relaxed mb-6">
                  Under <strong>S. Pethangoda Mahatha</strong>, the school saw remarkable progress. Student enrollment surged to over 800, and the school expanded to Grade 13. The Arts and Commerce streams were introduced, marking the school&apos;s evolution into a fully-fledged secondary institution.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> Expanded to Grade 13</li>
                  <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> Introduced A/L Streams</li>
                  <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> Established Music Room</li>
                  <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> 5 Parallel Streams</li>
                </ul>
              </motion.div>

              {/* Digital Age */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-right"
              >
                <div className="flex items-center gap-4 mb-6 justify-end">
                  <h3 className="text-2xl font-serif font-bold text-navy">The Digital Age & Modernization</h3>
                  <div className="w-10 h-10 bg-gold-tint text-gold-heritage flex items-center justify-center rounded-full">
                    <Calendar size={20} />
                  </div>
                </div>
                <p className="text-midnight/80 leading-relaxed mb-6">
                  From 2000 onwards, under principals like <strong>S. Kulasinha</strong> and <strong>Siril Kalansuriya</strong>, the school entered the digital age. A Computer Unit was established, a modern library building was constructed, and infrastructure like the Buddha statue and new classrooms were added.
                </p>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-navy text-white p-12 rounded-brand shadow-xl"
              >
                <h3 className="text-2xl font-serif font-bold mb-6 text-gold-heritage text-center">A New Era of Excellence (2010–Present)</h3>
                <p className="text-white/80 leading-relaxed mb-8 text-center">
                  The leadership of <strong>K.P.K. Wipul Milinda Padikkorale</strong> and current principal <strong>M.F.P. Pushpakumara</strong> has focused on holistic development. From all-island musical honors to high academic pass rates, the school continues to shine.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-gold-heritage mb-1">86%</div>
                    <div className="text-xs uppercase tracking-widest text-white/60">A/L Commerce Pass Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gold-heritage mb-1">All-Island</div>
                    <div className="text-xs uppercase tracking-widest text-white/60">Musical Honors</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gold-heritage mb-1">117+</div>
                    <div className="text-xs uppercase tracking-widest text-white/60">Years of History</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

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
