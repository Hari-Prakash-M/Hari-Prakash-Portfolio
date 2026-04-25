import NeuralNetwork from './NeuralNetwork';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'motion/react';
import { ArrowRight, Download, Sparkles, Cpu, Fingerprint, Database } from 'lucide-react';
import { useRef, MouseEvent, useEffect, useState } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Mouse Tracking for Interactive Lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const spotlightMask = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,1), transparent 80%)`;
  const glowMask = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.08), transparent 70%)`;

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full bg-black overflow-hidden selection:bg-white/30 selection:text-white flex items-center justify-center pt-20"
    >
      {/* 
        ========================================
        BACKGROUND LAYERS (Deep, Dark, Cinematic) 
        ========================================
      */}

      {/* 1. Base Noise Texture (Encoded SVG for perfect grain) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* 2. Static faint grid */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)'
        }}
      />

      {/* 3. Interactive Mouse Spotlight revealing a brighter grid */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
           backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
           backgroundSize: '4rem 4rem',
           maskImage: spotlightMask,
           WebkitMaskImage: spotlightMask
        }}
      />

      {/* 4. Ambient Tracking Glow */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{ background: glowMask }}
      />

      {/* 5. 3D Spline Scene (Focal Point) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-70 mt-20" style={{ mixBlendMode: 'screen' }}>
        <div className="w-full h-full max-w-[1200px] max-h-[800px] pointer-events-auto">
          {mounted && <NeuralNetwork />}
        </div>
      </div>

      {/* Decorative Glow behind Spline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-white rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-black rounded-full blur-[50px] opacity-80 pointer-events-none z-0" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none z-10" />


      {/* 
        ========================================
        FOREGROUND CONTENT 
        ========================================
      */}
      <motion.div style={{ y, opacity }} className="relative z-20 w-full max-w-7xl mx-auto px-6  flex flex-col items-center justify-center min-h-[85vh] pointer-events-none">
        
        {/* Animated Access Pill */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
           transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           className="group relative px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3 mb-12 sm:mb-16 cursor-default overflow-hidden pointer-events-auto"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
           </span>
           <span className="text-[10px] md:text-xs font-mono text-zinc-300 uppercase tracking-[0.2em] relative z-10">
             System Initialized
           </span>
        </motion.div>

        {/* Monumental Typography */}
        <div className="relative flex flex-col items-center w-full max-w-5xl text-center leading-[0.85] tracking-tighter">
           
           <h1 className="text-[15vw] sm:text-[140px] md:text-[180px] lg:text-[220px] font-display font-black uppercase flex flex-col items-center">
              
              {/* Part 1: HARI */}
              <motion.span 
                 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                 animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                 transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                 className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 pb-2 md:pb-6 drop-shadow-2xl"
              >
                 HARI
                 {/* Sweeping Light Beam Effect */}
                 <motion.span 
                   animate={{ left: ['-100%', '200%'] }} 
                   transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 }}
                   className="absolute top-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-[20deg] mix-blend-overlay -z-10"
                 />
              </motion.span>

              {/* Part 2: PRAKASH */}
              <motion.span 
                 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                 animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                 transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                 className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-zinc-500 via-zinc-800 to-black drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                 style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
              >
                 PRAKASH
              </motion.span>

           </h1>

           {/* Floating Subtitle Elements */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={mounted ? { opacity: 1 } : {}}
             transition={{ duration: 1.5, delay: 0.8 }}
             className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 md:px-12 pointer-events-none hidden md:flex"
           >
              <div className="flex flex-col items-start gap-1 font-mono text-[10px] text-zinc-500 tracking-[0.3em] uppercase">
                <span className="flex items-center gap-2"><Cpu className="w-3 h-3 text-white/50" /> AI Architect</span>
                <span className="pl-5">Neural Systems</span>
              </div>
              <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-zinc-500 tracking-[0.3em] uppercase text-right">
                <span className="flex items-center gap-2"><Database className="w-3 h-3 text-white/50" /> Data Eng</span>
                <span className="pr-5">Scale & Pipeline</span>
              </div>
           </motion.div>
        </div>

        {/* Minimalist Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 text-zinc-400 font-light text-sm md:text-lg max-w-2xl text-center leading-relaxed mix-blend-plus-lighter px-4"
        >
          Engineering robust intelligence and scalable architectures. 
          Bridging the absolute precision of deep mathematical models with 
          the elegant simplicity of modern full-stack engineering.
        </motion.p>

        {/* Ultra-Premium Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-6 z-30 w-full sm:w-auto pointer-events-auto"
        >
          {/* Primary CTA */}
          <a 
            href="#projects"
            className="group relative px-8 py-4 sm:py-5 bg-white text-black font-display font-semibold tracking-wide overflow-hidden w-full sm:w-auto flex items-center justify-center rounded-sm transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
          >
             <span className="relative z-10 flex items-center gap-3">
               Explore Intelligence <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
             </span>
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-zinc-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </a>
          
          {/* Secondary CTA */}
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Hari_Prakash_Resume.pdf"
            className="group relative px-8 py-4 sm:py-5 border border-white/20 bg-black/40 backdrop-blur-xl text-white font-mono tracking-widest text-xs uppercase w-full sm:w-auto flex items-center justify-center gap-3 rounded-sm overflow-hidden hover:border-white transition-colors duration-500 hover:bg-white/5 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Download className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-300 relative z-10" />
            <span className="relative z-10">Download Resume</span>
          </a>
        </motion.div>

      </motion.div>

      {/* Downward Scroll indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={mounted ? { opacity: 1 } : {}}
         transition={{ delay: 1.5, duration: 1 }}
         className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer z-50 group mix-blend-plus-lighter pointer-events-auto"
         onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 group-hover:text-white transition-colors duration-500">
          Scroll Down
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden group-hover:bg-white/20 transition-colors">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-[50%] bg-white shadow-[0_0_10px_white]"
          />
        </div>
      </motion.div>

    </section>
  );
}
