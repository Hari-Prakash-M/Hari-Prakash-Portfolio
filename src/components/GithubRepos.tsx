import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  
  const githubUsername = personalInfo.socials.github.split('/').pop()?.replace(/-/g, '');

  useEffect(() => {
    if (!githubUsername) return;
    // Updated to proper username "Hari-Prakash-M" parsing correctly or hardcoded if needed
    const username = personalInfo.socials.github.substring(personalInfo.socials.github.lastIndexOf('/') + 1);
    
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [githubUsername]);

  if (loading || repos.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-20 gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-medium tracking-tighter text-white"
          >
             Open Source.
          </motion.h2>
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white">
            View GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="pro-card p-8 rounded-2xl group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <Github className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-display text-white mb-3 group-hover:text-zinc-300 transition-colors line-clamp-1">{repo.name}</h3>
              <p className="text-zinc-400 font-light mb-8 flex-1 line-clamp-3 leading-relaxed">
                {repo.description || "No description provided."}
              </p>
              
              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono tracking-wider">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5" /> {repo.forks_count}</span>
                </div>
                {repo.language && (
                  <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    {repo.language}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
