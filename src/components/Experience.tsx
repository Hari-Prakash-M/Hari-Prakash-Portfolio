import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { personalInfo } from '../data';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-black relative border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32 text-center"
        >
          <div className="inline-flex items-center gap-4 border-b border-white/10 pb-4 justify-center mb-6">
            <span className="text-zinc-500 font-mono text-xs">02.</span>
            <h2 className="text-sm font-mono text-white tracking-wide uppercase">
               Career Chronology
            </h2>
            <span className="text-zinc-500 font-mono text-xs">log</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tighter text-white">
            Professional Runtime.
          </h3>
        </motion.div>

        <div ref={containerRef} className="relative flex flex-col items-center">
          
          {/* Static Background Line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2 rounded-full"></div>
          
          {/* Animated Foreground Line (Desktop) */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[30px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-white/50 via-white to-white/10 md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] origin-top hidden md:block"
          ></motion.div>

          {/* Animated Foreground Line (Mobile) */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[30px] top-0 w-[2px] bg-gradient-to-b from-white/50 via-white to-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] origin-top md:hidden"
          ></motion.div>

          <div className="space-y-16 lg:space-y-24 w-full relative z-10 pl-[80px] md:pl-0">
            {personalInfo.experience.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full group"
                >
                  
                  {/* Glowing Dot indicator */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
                    className="absolute left-[-58px] md:left-1/2 top-6 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-black border-2 border-zinc-600 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-500 z-20 flex items-center justify-center"
                  >
                     <div className="w-1.5 h-1.5 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </motion.div>

                  {/* Left Side (Desktop: Period) */}
                  <div className={`md:w-5/12 ${isEven ? 'md:text-right md:pr-16' : 'md:order-2 md:text-left md:pl-16'} mb-2 md:mb-0 w-full`}>
                    <div className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-widest inline-flex items-center gap-3 bg-white/5 md:bg-transparent px-3 py-1 md:p-0 rounded-full md:rounded-none">
                       {!isEven && <span className="hidden md:inline-flex w-8 h-[1px] bg-zinc-800"></span>}
                       {exp.period}
                       {isEven && <span className="hidden md:inline-flex w-8 h-[1px] bg-zinc-800"></span>}
                    </div>
                  </div>

                  {/* Right Side (Content) */}
                  <div className={`md:w-5/12 flex flex-col ${isEven ? 'md:order-2 md:pl-16' : 'md:text-right md:pr-16 md:items-end'} w-full mt-2 md:mt-0`}>
                    <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/20 border border-white/5 group-hover:bg-zinc-900/40 group-hover:border-white/10 transition-colors duration-500 w-full relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-colors"></div>
                       <h3 className="text-xl md:text-2xl font-display text-white group-hover:text-zinc-200 transition-colors tracking-tight mb-1">{exp.role}</h3>
                       <h4 className="text-sm md:text-base text-zinc-400 font-mono tracking-wide mb-4">{exp.company}</h4>
                       <p className={`text-zinc-500 text-sm leading-relaxed font-light ${isEven ? '' : 'md:text-right'}`}>
                         {exp.description}
                       </p>
                    </div>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
