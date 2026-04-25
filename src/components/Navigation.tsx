import { personalInfo } from '../data';
import { Github, Linkedin } from 'lucide-react';

export default function Navigation() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass-nav rounded-full px-6 py-3 flex items-center gap-8 text-sm text-zinc-400 font-medium">
        <a href="#" className="font-display font-bold text-white tracking-widest text-base">HP.</a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#projects" className="hover:text-white transition-colors">Work</a>
          <a href="#skills" className="hover:text-white transition-colors">Expertise</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4 border-l border-white/10 pl-4">
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github className="w-4 h-4"/></a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4"/></a>
        </div>
      </nav>
    </div>
  );
}
