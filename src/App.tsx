import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import GithubRepos from './components/GithubRepos';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import BackgroundEffect from './components/BackgroundEffect';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-zinc-200 selection:bg-white selection:text-black font-sans relative">
      <BackgroundEffect />
      <div className="noise z-10" />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <GithubRepos />
        <Certifications />
        <Contact />
      </main>
      
      <ChatBot />
      
      <footer className="py-24 flex flex-col items-center justify-center text-center text-zinc-600 text-sm border-t border-white/5 relative z-10 bg-black overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none opacity-20">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            <h2 className="text-[15vw] md:text-[10vw] font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10 select-none px-4">
              HARI'S PORTFOLIO <span className="text-white/20 mx-4">•</span> HARI'S PORTFOLIO <span className="text-white/20 mx-4">•</span> HARI'S PORTFOLIO <span className="text-white/20 mx-4">•</span> HARI'S PORTFOLIO <span className="text-white/20 mx-4">•</span> 
            </h2>
          </motion.div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="font-mono tracking-widest uppercase text-xs text-white/80">HARI'S PORTFOLIO</p>
          <p>\u00a9 {new Date().getFullYear()} Hari Prakash M. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
