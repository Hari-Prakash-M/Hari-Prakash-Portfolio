import { motion } from 'motion/react';
import { personalInfo } from '../data';

export default function Certifications() {
  return (
    <section className="py-32 px-6 md:px-12 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-32 items-center">
        <div className="md:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-medium text-white tracking-tighter"
          >
            Awards &<br/>Certifications.
          </motion.h2>
        </div>
        
        <div className="md:w-2/3 w-full">
          <div className="grid gap-6">
            {personalInfo.certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="pro-card p-6 rounded-2xl flex items-center justify-between group cursor-default"
              >
                <span className="font-light text-zinc-200 text-lg group-hover:text-white transition-colors">{cert}</span>
                <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors font-display">—</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
