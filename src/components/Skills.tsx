import { motion, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'motion/react';
import { personalInfo } from '../data';
import { MouseEvent, useRef } from 'react';
import { Code2, Cpu, Wrench, Network, LayoutTemplate } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('program')) return Code2;
  if (cat.includes('tech')) return Cpu;
  if (cat.includes('tool')) return Wrench;
  if (cat.includes('framework') || cat.includes('library')) return LayoutTemplate;
  return Network;
};

// Extracted Card Component for isolated interaction states
function SkillCard({ skillGroup, idx }: { skillGroup: any; idx: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // For background spotlight
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    // For 3D tilt (-0.5 to 0.5)
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = getCategoryIcon(skillGroup.category);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.05)",
        zIndex: 10
      }}
      className="group relative flex flex-col rounded-3xl border border-white/5 bg-[#050505] overflow-hidden shadow-2xl hover:border-white/20 transition-colors duration-300 will-change-transform"
    >
      {/* Interactive Cursor Tracking Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Subtle top inner gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] to-transparent z-0" />
      
      <div className="relative p-8 md:p-10 z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
        
        {/* Header section with Icon & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10">
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/40 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 shadow-xl overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <Icon className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors duration-500 relative z-10" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1 group-hover:text-zinc-400 transition-colors duration-500 flex items-center gap-2">
              <span className="w-2 h-px bg-zinc-700 group-hover:bg-zinc-400 transition-colors duration-500" />
              Module_{String(idx + 1).padStart(2, '0')}
            </div>
            <h3 className="text-xl font-display font-semibold text-zinc-200 tracking-wide group-hover:text-white transition-colors duration-500">
              {skillGroup.category}
            </h3>
          </div>
        </div>

        {/* Interactive Skills Canvas / Chips */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
          {skillGroup.items.map((item: string, i: number) => (
            <motion.div 
              key={item} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.05), ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden px-4 py-2 rounded-lg border border-white/5 bg-black/80 text-xs md:text-sm font-mono text-zinc-400 tracking-wider group-hover:border-white/10 transition-all duration-300 hover:!border-white hover:!bg-white hover:!text-black hover:z-20 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer transform-gpu"
              whileHover={{ scale: 1.05, y: -4, rotate: (i % 2 === 0 ? 2 : -2) }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 block pointer-events-none whitespace-nowrap">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 bg-black overflow-hidden selection:bg-white/30 selection:text-white">
      
      {/* Atmospheric Background Blurs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -right-[10%] w-[50vw] h-[50vw] bg-zinc-900/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-zinc-800/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 xl:gap-24">
        
        {/* Left Side: Dramatic Sticky Header */}
        <div className="xl:w-1/3 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="xl:sticky xl:top-32"
          >
             {/* Decorative lines pattern */}
             <div className="flex gap-2 mb-8 opacity-40">
               <div className="w-16 h-[2px] bg-white" />
               <div className="w-4 h-[2px] bg-white/50" />
               <div className="w-2 h-[2px] bg-white/20" />
             </div>

             <h2 className="text-[15vw] sm:text-[100px] xl:text-[120px] font-display font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-700 mb-8 uppercase drop-shadow-2xl">
               SKILLS<span className="text-zinc-600">.</span>
             </h2>

             <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed mix-blend-plus-lighter max-w-md border-l-2 border-white/10 pl-6">
               A distinct breakdown of my technical stack. Focused on bridging theoretical machine learning complexity with highly scalable, robust architectural implementations.
             </p>
             
             {/* Abstract rotating technical compass */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
               className="w-24 h-24 mt-16 border rounded-full border-dashed border-white/20 hidden xl:flex items-center justify-center opacity-30 pointer-events-none"
             >
                <div className="w-16 h-16 border rounded-full border-white/10" />
                <div className="absolute w-1 h-3 bg-white top-0 -translate-y-1/2 rounded-full" />
             </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Interactive Card Grid */}
        <div className="xl:w-2/3 grid md:grid-cols-2 gap-6 lg:gap-8">
          {personalInfo.skills.map((skillGroup, idx) => (
             <SkillCard key={skillGroup.category} skillGroup={skillGroup} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
