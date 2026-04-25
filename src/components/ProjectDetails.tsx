import { useParams, Link } from 'react-router-dom';
import { personalInfo } from '../data';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Navigation from './Navigation';
import { motion } from 'motion/react';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = personalInfo.projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-4xl text-white font-display mb-4">Project Not Found</h1>
          <Link to="/" className="text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-zinc-300 selection:bg-white selection:text-black font-sans relative">
      <div className="noise" />
      <Navigation />
      
      <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-16 font-light uppercase tracking-wider text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-16"
        >
          <header className="space-y-8 max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-display font-medium text-white tracking-tighter leading-[0.9]">
              {project.title}.
            </h1>
            <p className="text-xl md:text-3xl text-zinc-400 font-light max-w-3xl leading-relaxed tracking-tight">
              {project.shortDescription}
            </p>
          </header>

          <div className="aspect-video w-full rounded-2xl bg-zinc-900 flex items-center justify-center relative overflow-hidden group">
             {project.image && (
               <img 
                 src={project.image} 
                 alt={project.title} 
                 className="absolute inset-0 w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80"
               />
             )}
             <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 to-zinc-800/80 opacity-90 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
             {!project.image && (
               <div className="text-zinc-700 font-mono text-center flex flex-col items-center">
                 <div className="text-8xl mb-6 font-display font-medium opacity-20 tracking-tighter">{project.techStack[0]}</div>
               </div>
             )}
          </div>

          <div className="grid md:grid-cols-3 gap-16 pt-8">
            <div className="md:col-span-2 space-y-16 text-lg text-zinc-400 leading-relaxed font-light">
              <div className="space-y-6">
                <h3 className="text-2xl font-display text-white tracking-tight">Overview</h3>
                <p className="text-xl">
                  {project.description}
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-display text-white tracking-tight">Capabilities & Metrics</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.metrics.map(m => (
                    <div key={m} className="p-6 border border-white/5 bg-zinc-900/30 rounded-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <p className="relative z-10 text-white font-medium">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h4 className="text-xs uppercase tracking-widest font-mono text-zinc-500">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(t => (
                    <span key={t} className="px-4 py-2 border border-white/10 rounded-full text-xs font-mono text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/5">
                <h4 className="text-xs uppercase tracking-widest font-mono text-zinc-500">Links</h4>
                <div className="space-y-4">
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         <Github className="w-4 h-4" />
                      </div>
                      <span className="font-medium tracking-wide">Source Code</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-zinc-600 cursor-not-allowed">
                       <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center">
                         <Github className="w-4 h-4" />
                      </div>
                      <span>Private Repository</span>
                    </div>
                  )}
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                       <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         <ExternalLink className="w-4 h-4" />
                      </div>
                      <span className="font-medium tracking-wide">Live Preview</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-zinc-600 cursor-not-allowed">
                       <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center">
                         <ExternalLink className="w-4 h-4" />
                      </div>
                      <span>Internal / Offline</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
