import { motion } from 'framer-motion';

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 z-0 bg-[length:40px_40px] opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`
        }}
      />

      {/* Animated gradient blobs - Brighter */}
      <motion.div
        animate={{
          x: ["0%", "8%", "-5%", "0%"],
          y: ["0%", "5%", "10%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full opacity-30 blur-[100px] mix-blend-screen bg-indigo-500/40"
      />
      <motion.div
        animate={{
          x: ["0%", "-10%", "8%", "0%"],
          y: ["0%", "-8%", "-5%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] -right-[5%] w-[50%] h-[50%] rounded-full opacity-30 blur-[120px] mix-blend-screen bg-blue-400/30"
      />
      <motion.div
        animate={{
          x: ["0%", "5%", "-8%", "0%"],
          y: ["0%", "-5%", "8%", "0%"],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[10%] left-[15%] w-[50%] h-[50%] rounded-full opacity-25 blur-[120px] mix-blend-screen bg-purple-500/30"
      />

      {/* Brighter Moving Spot Light */}
      <motion.div
        animate={{
          x: ["-50vw", "150vw"],
          y: ["-20vh", "120vh"],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "mirror", 
          ease: "linear" 
        }}
        className="absolute w-[300px] h-[300px] rounded-full opacity-40 blur-[80px] bg-white/20 mix-blend-screen mix-blend-overlay"
      />
    </div>
  );
}
