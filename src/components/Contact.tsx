import { motion } from 'motion/react';
import { personalInfo } from '../data';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0ALikely message:%0D%0A${message}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tighter mb-6">
            Get in Touch.
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto font-light text-lg">
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500">Name</label>
              <input 
                required 
                name="name"
                type="text" 
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors font-light placeholder:text-zinc-700"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500">Email</label>
              <input 
                required 
                name="email"
                type="email" 
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors font-light placeholder:text-zinc-700"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500">Message</label>
            <textarea 
              required 
              name="message"
              rows={4} 
              className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors font-light placeholder:text-zinc-700 resize-none"
              placeholder="Your message..."
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 mt-8 bg-white text-black font-medium tracking-wide hover:bg-zinc-200 transition-colors rounded-full"
          >
            Send Message
          </button>
        </form>
        
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 font-mono text-sm uppercase tracking-wider">
          <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">{personalInfo.email}</a>
          <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{personalInfo.phone}</a>
        </div>
      </div>
    </section>
  );
}
