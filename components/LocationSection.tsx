import Image from 'next/image';
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

          <div className="aspect-video bg-border-grey rounded-brand overflow-hidden relative">
            <Image
              src="https://picsum.photos/seed/map/800/600"
              alt="Map Location"
              fill
              className="object-cover opacity-50 grayscale"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-4 rounded-brand shadow-lg border border-border-grey flex items-center gap-3">
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
