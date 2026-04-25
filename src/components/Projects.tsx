import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';
import { ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = useMemo(() => {
    const roles = personalInfo.projects.flatMap(p => p.roles || []);
    const techStacks = personalInfo.projects.flatMap(p => p.techStack || []);
    const uniqueFilters = Array.from(new Set([...roles, ...techStacks]));
    return ['All', ...uniqueFilters];
  }, []);

  const filteredProjects = useMemo(() => {
    return personalInfo.projects.filter(project => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(searchLower) || 
        project.description.toLowerCase().includes(searchLower) ||
        project.techStack.some(t => t.toLowerCase().includes(searchLower)) ||
        (project.roles && project.roles.some((r: string) => r.toLowerCase().includes(searchLower)));

      if (!matchesSearch) return false;
      if (activeFilter === 'All') return true;
      
      const hasRole = project.roles && project.roles.includes(activeFilter);
      const hasTech = project.techStack.includes(activeFilter);
      
      return hasRole || hasTech;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-6xl font-display font-medium tracking-tighter text-white shrink-0"
          >
            Projects.
          </motion.h2>
          
          <motion.div variants={itemVariants} className="w-full md:max-w-xs relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 backdrop-blur-sm transition-all shadow-inner"
            />
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20 flex flex-wrap gap-2 md:gap-3"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                variants={itemVariants}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-2 rounded-full border text-xs md:text-sm font-mono tracking-wide transition-all duration-300 ${
                  isActive 
                    ? 'border-white text-black' 
                    : 'border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/30 bg-black/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div 
          layout 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-32"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                className="py-20 text-center border border-white/5 rounded-3xl bg-zinc-900/20"
              >
                <p className="text-zinc-500 font-mono">No projects found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                  className="mt-6 text-white text-sm border-b border-white/30 hover:border-white pb-0.5 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              filteredProjects.map((project, idx) => (
                <motion.div 
                  layout
                  key={project.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-center origin-top"
                >
                  <div className={`w-full lg:w-3/5 aspect-[4/3] rounded-3xl overflow-hidden relative pro-card border border-white/10 shadow-2xl ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <Link to={`/project/${project.id}`} className="absolute inset-0 block">
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/90 to-zinc-800/40 mix-blend-multiply opacity-80 group-hover:opacity-60 transition-opacity duration-700 ease-out"></div>
                      <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-30 group-hover:opacity-50 transition-opacity">
                         <div className="w-[120%] h-[120%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] absolute"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-white/20 transition-colors font-display text-9xl tracking-tighter mix-blend-plus-lighter pointer-events-none">
                        0{idx + 1}
                      </div>
                      <div className="absolute bottom-6 left-8 flex flex-wrap gap-2 max-w-[80%] z-10 pointer-events-none">
                         {project.techStack.slice(0, 3).map(tech => (
                            <div key={tech} className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white">
                                {tech}
                            </div>
                         ))}
                      </div>
                    </Link>
                  </div>
                  
                  <div className={`w-full lg:w-2/5 space-y-8 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-6">
                      <Link to={`/project/${project.id}`}>
                        <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight group-hover:text-zinc-300 transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-zinc-400 text-lg leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                    
                    <Link to={`/project/${project.id}`} className="inline-flex items-center gap-2 text-white pb-1 border-b border-white/20 hover:border-white transition-colors">
                      Explore Project <ArrowUpRight className="w-4 h-4 translate-y-[1px] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
