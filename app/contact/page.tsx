'use client';

import { Navbar } from '../../components/Navbar';
import { PageHero } from '../../components/PageHero';
import { Footer } from '../../components/Footer';
import { LocationSection } from '../../components/LocationSection';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SCHOOL_DATA } from '../../constants';
import { motion } from 'motion/react';
import { BreadcrumbSchema } from '../../components/JsonLd';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://hapugalacollege.lk" },
          { name: "Contact", item: "https://hapugalacollege.lk/contact" }
        ]} 
      />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title="Get in Touch" 
          subtitle="Contact Us"
          description="We are here to help. Reach out to us for any inquiries about our school, admissions, or activities."
          backgroundImage="https://picsum.photos/seed/contact/1920/1080"
        />

        <section className="py-24 bg-cream/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: Phone, 
                  title: "Call Us", 
                  details: [SCHOOL_DATA.phone], 
                  color: "bg-blue-500/10 text-blue-600" 
                },
                { 
                  icon: Mail, 
                  title: "Email Us", 
                  details: [SCHOOL_DATA.email], 
                  color: "bg-amber-500/10 text-amber-600" 
                },
                { 
                  icon: MapPin, 
                  title: "Visit Us", 
                  details: [SCHOOL_DATA.location, SCHOOL_DATA.province], 
                  color: "bg-green-500/10 text-green-600" 
                },
                { 
                  icon: Clock, 
                  title: "Office Hours", 
                  details: ["Mon - Fri: 7:30 AM - 2:00 PM", "Sat - Sun: Closed"], 
                  color: "bg-purple-500/10 text-purple-600" 
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-border-grey hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-4">{item.title}</h3>
                  <div className="space-y-1">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-midnight/60 text-sm leading-relaxed">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
