import { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden"
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48L3N2Zz4=')] opacity-30 animate-[pulse_4s_ease-in-out_infinite]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="flex p-1 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-yellow-300" aria-hidden="true" />
                </span>
                <p className="font-medium text-sm md:text-base truncate">
                  <span className="font-bold text-yellow-300">BIGGEST OFFER:</span> 100% Free Premium Services! No Login & No Signup Required Forever.
                </p>
              </div>
              
              <div className="flex items-center gap-4 flex-shrink-0">
                <Link 
                  to="/" 
                  className="flex items-center gap-1 text-sm font-bold bg-white text-indigo-600 px-4 py-1.5 rounded-full hover:bg-indigo-50 transition-colors shadow-sm"
                  aria-label="Explore free tools"
                >
                  Explore Now <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  className="p-1.5 rounded-md hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setIsVisible(false)}
                  aria-label="Dismiss banner"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
