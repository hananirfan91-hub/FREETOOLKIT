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
  Palette,
  Zap,
  ShieldCheck,
  CheckCircle,
  HelpCircle
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
      id: 'color-picker',
      name: 'Color Picker & Converter',
      description: 'Pick colors and convert between HEX, RGB, and HSL formats with a visual interface.',
      icon: <Palette className="w-8 h-8 text-teal-500" />,
      path: '/color-picker',
      color: 'bg-teal-50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>FreeToolKit - 100% Free Online Tools | No Signup, No Login</title>
        <meta name="description" content="Discover FreeToolKit's premium collection of 100% free online developer and utility tools. Format JSON, compress images, generate passwords, and more without signup." />
        <meta name="keywords" content="free online tools, no signup tools, no login tools, json formatter online free, base64 encode decode online free, compress image online free, resize image online free, uppercase to lowercase converter free, word counter online free, url encode decode online free, strong password generator free, uuid generator online free, hex to rgb converter free" />
        <link rel="canonical" href="https://freetoolshub1.vercel.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freetoolshub1.vercel.app/" />
        <meta property="og:title" content="FreeToolKit - 100% Free Online Tools | No Signup, No Login" />
        <meta property="og:description" content="Discover FreeToolKit's premium collection of 100% free online developer and utility tools. Format JSON, compress images, generate passwords, and more without signup." />
        <meta property="og:site_name" content="FreeToolKit" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://freetoolshub1.vercel.app/" />
        <meta name="twitter:title" content="FreeToolKit - 100% Free Online Tools | No Signup, No Login" />
        <meta name="twitter:description" content="Discover FreeToolKit's premium collection of 100% free online developer and utility tools. Format JSON, compress images, generate passwords, and more without signup." />
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose FreeToolKit?</h2>
            <p className="text-lg text-slate-600">
              We built FreeToolKit to be the fastest, most reliable, and most secure collection of utilities on the web.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600">
                All our tools run directly in your browser. No waiting for server uploads, no loading screens. Just instant results.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Secure & Private</h3>
              <p className="text-slate-600">
                We respect your privacy. Your data never leaves your device. Everything is processed locally on your machine.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Completely Free</h3>
              <p className="text-slate-600">
                No paywalls, no premium tiers, no hidden fees, and absolutely no signup required. Free forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 mb-6">
              <HelpCircle className="w-8 h-8 text-slate-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about FreeToolKit and how it works.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Are these tools really 100% free?</h3>
              <p className="text-slate-600">Yes! Every single tool on FreeToolKit is completely free to use. There are no premium versions, no hidden fees, and no usage limits.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Do I need to create an account?</h3>
              <p className="text-slate-600">No. We believe in removing friction. You never have to sign up, log in, or provide your email address to use any of our utilities.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Is my data safe when using these tools?</h3>
              <p className="text-slate-600">Absolutely. Our tools are built using modern web technologies that process your data locally in your browser. Your files, text, and images are never uploaded to our servers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I use these tools on my mobile phone?</h3>
              <p className="text-slate-600">Yes, FreeToolKit is fully responsive and optimized for all devices. You can use our tools seamlessly on your desktop, tablet, or smartphone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide Section for SEO and Word Count */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate lg:prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Your Ultimate Toolkit for Developers and Creators</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              In today's fast-paced digital landscape, having access to reliable, fast, and secure online tools is essential for developers, designers, writers, and everyday internet users. That is exactly why we created <strong>FreeToolKit</strong>. Our mission is to provide a comprehensive suite of premium-quality utilities that are completely free to use, without the hassle of creating accounts, remembering passwords, or dealing with intrusive advertisements.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">A Suite of Developer Tools at Your Fingertips</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              For software engineers and web developers, efficiency is key. Our platform offers a robust set of developer-focused utilities designed to streamline your coding workflow. Whether you need to quickly format and validate complex JSON data structures, safely encode or decode Base64 strings, or generate cryptographically secure UUIDs (Universally Unique Identifiers) for your database records, FreeToolKit has you covered. We also provide a seamless URL Encoder and Decoder to ensure your web links are perfectly formatted and safe for transmission across the internet.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Optimize Your Digital Media Instantly</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Content creators and web designers know the importance of optimized media. Heavy, unoptimized images can drastically slow down your website's loading speed, negatively impacting both user experience and search engine optimization (SEO) rankings. With our built-in Image Compressor and Image Resizer, you can effortlessly reduce file sizes while maintaining pristine image quality. Furthermore, our intuitive Color Picker and Converter allows designers to seamlessly translate color codes between HEX, RGB, and HSL formats, ensuring perfect brand consistency across all digital platforms.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Everyday Utilities for Everyone</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              FreeToolKit isn't just for technical professionals; it is built for everyone. Need to secure your online accounts? Our Strong Password Generator creates virtually uncrackable passwords using a mix of uppercase letters, lowercase letters, numbers, and special symbols. Working on an essay, blog post, or social media update? Our Word and Character Counter provides real-time statistics on your text, while our Text Case Converter allows you to instantly switch between UPPERCASE, lowercase, Title Case, and Sentence case with a single click.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Privacy and Security First</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We understand that when you use online tools, you are often working with sensitive data—whether it's proprietary code, personal images, or secure passwords. Unlike many other online tool platforms that upload your files to remote servers for processing, FreeToolKit leverages modern web technologies to process everything locally right inside your web browser. This client-side processing architecture guarantees that your data never leaves your device, providing you with absolute privacy, unparalleled security, and lightning-fast performance.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Client-Side Processing Matters</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              When you use traditional online tools, your data is often uploaded to a remote server, processed, and then sent back to you. This approach introduces several significant risks and drawbacks. First, it compromises your privacy, as you are trusting a third party with your potentially sensitive information. Second, it relies heavily on your internet connection speed; uploading large images or massive JSON files can be incredibly slow and frustrating. Third, it poses a security risk, as data transmitted over the internet can potentially be intercepted.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              FreeToolKit eliminates all these issues by performing all operations directly within your web browser. When you compress an image, format JSON, or generate a password, the computation happens on your own device's processor. This means your files are never uploaded, your data remains completely private, and the tools operate at the maximum speed your device can handle, regardless of your internet connection. This modern approach to web applications ensures a safer, faster, and more reliable experience for every user.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Importance of Accessible Tools</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We believe that essential digital utilities should be accessible to everyone, without barriers. Many platforms hide their best features behind paywalls, require tedious account creation processes, or bombard users with intrusive advertisements that disrupt the workflow. FreeToolKit was built with a different philosophy. We are committed to providing a clean, distraction-free environment where you can get your work done quickly and efficiently. By removing the need for signups and logins, we ensure that you can access the tools you need the moment you need them.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Whether you are a seasoned software developer debugging complex data structures, a student writing an essay and needing a quick word count, or a designer optimizing images for a new website launch, FreeToolKit is designed to be your go-to resource. Our intuitive interfaces make complex tasks simple, allowing you to focus on what truly matters: your creative and professional endeavors.
            </p>
            
            <p className="text-slate-600 mb-6 leading-relaxed font-medium text-center mt-10">
              Bookmark FreeToolKit today and experience the convenience of having a powerful, secure, and 100% free digital utility belt right in your browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
