import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Wrench, Zap, ShieldCheck, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Helmet>
        <title>About Us - FreeToolKit</title>
        <meta name="description" content="Learn more about FreeToolKit, our mission, and why we build 100% free, client-side tools for developers and creators." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            About <span className="text-indigo-600">FreeToolKit</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            We are on a mission to provide the fastest, most secure, and completely free digital utilities for everyone.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              We believe that essential digital tools shouldn't be hidden behind paywalls or require tedious account creation. Our mission is to democratize access to high-quality developer and utility tools, making them available to anyone with a web browser.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy First</h2>
            <p className="text-slate-600 leading-relaxed">
              Unlike traditional platforms that upload your sensitive data to remote servers, we've engineered FreeToolKit to run entirely on the client-side. Your files, code, and text never leave your device, ensuring absolute privacy and security.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-6">
            <Users className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Built for the Community</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            FreeToolKit is built by developers, for developers (and designers, writers, and everyday internet users). We are constantly listening to feedback and adding new tools to our suite to help you work faster and smarter.
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Wrench className="w-5 h-5" /> 10+ Free Tools
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-5 h-5" /> 100% Secure
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
