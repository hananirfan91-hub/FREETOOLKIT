import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Binary, 
  Image, 
  Crop, 
  Type, 
  FileText, 
  Link as LinkIcon, 
  KeyRound, 
  Hash, 
  Palette 
} from 'lucide-react';

export default function Home() {
  const tools = [
    {
      id: 'json-formatter',
      name: 'JSON Formatter & Validator',
      description: 'Format, validate, and beautify JSON data online instantly. 100% client-side processing.',
      icon: <Code className="w-8 h-8 text-yellow-500" />,
      path: '/json-formatter',
      color: 'bg-yellow-50',
    },
    {
      id: 'base64-encoder',
      name: 'Base64 Encoder / Decoder',
      description: 'Encode text to Base64 format or decode from it with various advanced options.',
      icon: <Binary className="w-8 h-8 text-indigo-500" />,
      path: '/base64-encoder',
      color: 'bg-indigo-50',
    },
    {
      id: 'image-compressor',
      name: 'Free Image Compressor',
      description: 'Compress JPEG, PNG, SVG, and GIFs client-side while saving space and maintaining quality.',
      icon: <Image className="w-8 h-8 text-blue-500" />,
      path: '/image-compressor',
      color: 'bg-blue-50',
    },
    {
      id: 'image-resizer',
      name: 'Free Image Resizer',
      description: 'Resize images online for free. Crop, resize, and optimize images for web directly in your browser.',
      icon: <Crop className="w-8 h-8 text-green-500" />,
      path: '/image-resizer',
      color: 'bg-green-50',
    },
    {
      id: 'text-case-converter',
      name: 'Text Case Converter',
      description: 'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more instantly.',
      icon: <Type className="w-8 h-8 text-pink-500" />,
      path: '/text-case-converter',
      color: 'bg-pink-50',
    },
    {
      id: 'word-counter',
      name: 'Word & Character Counter',
      description: 'Count words, characters, sentences, paragraphs, and estimate reading time online.',
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      path: '/word-counter',
      color: 'bg-orange-50',
    },
    {
      id: 'url-encoder',
      name: 'URL Encoder / Decoder',
      description: 'Encode or decode URLs and URI components safely and securely in your browser.',
      icon: <LinkIcon className="w-8 h-8 text-purple-500" />,
      path: '/url-encoder',
      color: 'bg-purple-50',
    },
    {
      id: 'password-generator',
      name: 'Strong Password Generator',
      description: 'Generate secure, random passwords with custom lengths and character sets.',
      icon: <KeyRound className="w-8 h-8 text-red-500" />,
      path: '/password-generator',
      color: 'bg-red-50',
    },
    {
      id: 'uuid-generator',
      name: 'UUID / GUID Generator',
      description: 'Generate universally unique identifiers (UUIDs) version 4 instantly for your projects.',
      icon: <Hash className="w-8 h-8 text-cyan-500" />,
      path: '/uuid-generator',
      color: 'bg-cyan-50',
    },
    {
      id: 'color-converter',
      name: 'Color Picker & Converter',
      description: 'Pick colors and convert between HEX, RGB, and HSL formats with a visual interface.',
      icon: <Palette className="w-8 h-8 text-teal-500" />,
      path: '/color-converter',
      color: 'bg-teal-50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>FreeToolKit - 100% Free Online Tools | No Signup, No Login</title>
        <meta name="description" content="Access 10+ free online tools including JSON Formatter, Base64 Encoder, Image Compressor, Password Generator, and more. 100% free, no signup, no login required." />
        <meta name="keywords" content="free online tools, no signup tools, no login tools, json formatter online free, base64 encode decode online free, compress image online free, resize image online free, uppercase to lowercase converter free, word counter online free, url encode decode online free, strong password generator free, uuid generator online free, hex to rgb converter free" />
        <link rel="canonical" href="https://freetoolshub1.vercel.app/" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-slate-900 py-24 border-b border-slate-800 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-600/20 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
            100% Free. No Signup. No Login Required.
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight"
          >
            Premium Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">& Utility Tools</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Boost your productivity with our suite of free online utilities. No registration, no login, no hidden fees. Just fast and reliable tools running entirely in your browser.
          </motion.p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={tool.path}
                className="block h-full bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/40 border border-slate-200 hover:shadow-2xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
