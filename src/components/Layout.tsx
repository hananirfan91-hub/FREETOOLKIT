import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wrench, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsToolsOpen(false);
  }, [location]);

  const tools = [
    { name: 'JSON Formatter', path: '/json-formatter' },
    { name: 'Base64 Encoder', path: '/base64-encoder' },
    { name: 'Image Compressor', path: '/image-compressor' },
    { name: 'Image Resizer', path: '/image-resizer' },
    { name: 'Text Case Converter', path: '/text-case-converter' },
    { name: 'Word Counter', path: '/word-counter' },
    { name: 'URL Encoder', path: '/url-encoder' },
    { name: 'Password Generator', path: '/password-generator' },
    { name: 'UUID Generator', path: '/uuid-generator' },
    { name: 'Color Picker', path: '/color-picker' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden w-full">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span>FreeToolKit</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">Home</Link>
              <Link to="/blog" className="text-slate-300 hover:text-white font-medium transition-colors">Blog</Link>
              <div className="relative group">
                <button 
                  className="text-slate-300 hover:text-white font-medium transition-colors flex items-center gap-1 py-5"
                  onMouseEnter={() => setIsToolsOpen(true)}
                  onMouseLeave={() => setIsToolsOpen(false)}
                >
                  Tools <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Mega Menu Dropdown */}
                <div 
                  className={`absolute top-full right-0 w-[480px] bg-white border border-slate-200 shadow-2xl rounded-xl p-6 transition-all duration-200 ${isToolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                  onMouseEnter={() => setIsToolsOpen(true)}
                  onMouseLeave={() => setIsToolsOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {tools.map(tool => (
                      <Link 
                        key={tool.path} 
                        to={tool.path} 
                        className="block px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-slate-800 border-b border-slate-700 px-4 pt-2 pb-4 space-y-1"
          >
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">Home</Link>
            <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">Blog</Link>
            <div className="pt-2 pb-1 border-t border-slate-700">
              <div className="px-3 text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">All Tools</div>
              <div className="mt-2 space-y-1 pb-4">
                {tools.map(tool => (
                  <Link 
                    key={tool.path} 
                    to={tool.path} 
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4 tracking-tight">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span>FreeToolKit</span>
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                A premium collection of 100% free online tools designed to help developers, designers, and everyday users with their daily tasks. No signup, no login, no hidden fees. Just fast, free utilities.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Developer Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/json-formatter" className="hover:text-indigo-400 transition-colors">JSON Formatter</Link></li>
                <li><Link to="/base64-encoder" className="hover:text-indigo-400 transition-colors">Base64 Encoder</Link></li>
                <li><Link to="/uuid-generator" className="hover:text-indigo-400 transition-colors">UUID Generator</Link></li>
                <li><Link to="/color-picker" className="hover:text-indigo-400 transition-colors">Color Picker</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Utility Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/image-compressor" className="hover:text-indigo-400 transition-colors">Image Compressor</Link></li>
                <li><Link to="/password-generator" className="hover:text-indigo-400 transition-colors">Password Generator</Link></li>
                <li><Link to="/text-case-converter" className="hover:text-indigo-400 transition-colors">Case Converter</Link></li>
                <li><Link to="/word-counter" className="hover:text-indigo-400 transition-colors">Word Counter</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} FreeToolKit. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link to="/" className="hover:text-white transition-colors">About</Link>
              <Link to="/" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
