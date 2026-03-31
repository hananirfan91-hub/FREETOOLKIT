import { useState, useEffect } from 'react';
import { Timer, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function CountdownWidget() {
  // Set a 72-hour countdown timer
  const [timeLeft, setTimeLeft] = useState(3600 * 72);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (timeLeft === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="fixed bottom-6 left-6 bg-slate-900 text-white p-3 pr-5 rounded-2xl shadow-2xl border border-indigo-500/30 z-50 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-inner relative">
        <Timer className="w-5 h-5 text-white animate-pulse" />
        <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
      </div>
      <div className="relative z-10">
        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider leading-none mb-1.5 flex items-center gap-1">
          Limited Time Offer
        </p>
        <p className="text-xl font-mono font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </p>
      </div>
    </motion.div>
  );
}
