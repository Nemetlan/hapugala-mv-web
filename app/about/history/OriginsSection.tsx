'use client';

import { motion } from 'motion/react';
import { Landmark } from 'lucide-react';

export default function OriginsSection() {
  return (
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
  );
}
