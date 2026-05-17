import { MapPin } from 'lucide-react';
import { SCHOOL_DATA } from '../constants';

export function LocationSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Visit Us
            </div>
            <h2 className="text-4xl font-serif font-bold text-navy mb-8">On the banks of the Gin River</h2>
            <p className="text-midnight/70 leading-relaxed mb-8">
              Located in the heart of the Akmeemana division in Galle, our campus offers a serene and inspiring environment for learning.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-tint text-navy flex items-center justify-center rounded-brand shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-bold text-navy">Address</div>
                  <div className="text-midnight/60">{SCHOOL_DATA.location}, {SCHOOL_DATA.province}, {SCHOOL_DATA.country}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-video bg-border-grey rounded-brand overflow-hidden relative shadow-2xl shadow-navy/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.319717651034!2d80.18737527503657!3d6.087452893902307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1714beae1f2ab%3A0x9097a372d913ee1c!2sHapugala%20Vidyalaya!5e0!3m2!1sen!2slk!4v1715760000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hapugala Vidyalaya Location Map"
              className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-border-grey flex items-center gap-3">
                <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white">
                  <MapPin size={16} />
                </div>
                <div className="font-serif font-bold text-navy">{SCHOOL_DATA.shortName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
