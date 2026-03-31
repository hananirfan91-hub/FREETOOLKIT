import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, Server } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Helmet>
        <title>Privacy Policy - FreeToolKit</title>
        <meta name="description" content="Privacy Policy for FreeToolKit. Learn how we protect your data with our 100% client-side processing tools." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="lead text-xl text-slate-600 mb-8">
              At FreeToolKit, your privacy is our highest priority. We have built our platform from the ground up to ensure your data remains secure and private.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <Shield className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2 mt-0">100% Client-Side</h3>
                <p className="text-slate-600 mb-0">All tools process data directly in your browser. Your files and text are never uploaded to our servers.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <Lock className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2 mt-0">No Tracking</h3>
                <p className="text-slate-600 mb-0">We do not track your usage of specific tools or store the content you process through them.</p>
              </div>
            </div>

            <h2>1. Information We Collect</h2>
            <p>
              Because our tools operate entirely on the client-side (in your browser), we do not collect, store, or transmit the data you input into our tools. This includes images, JSON data, passwords, and any other text.
            </p>
            <p>
              We use standard analytics (like Google Analytics) to understand general website traffic patterns, such as which pages are most popular and what devices our visitors use. This data is aggregated and anonymized.
            </p>

            <h2>2. How We Use Information</h2>
            <p>
              The aggregated analytics data we collect is used solely to:
            </p>
            <ul>
              <li>Improve our website and tools</li>
              <li>Understand user preferences</li>
              <li>Ensure our website functions correctly across different devices and browsers</li>
            </ul>

            <h2>3. Cookies</h2>
            <p>
              We use cookies for basic site functionality and analytics. You can choose to disable cookies through your browser settings, though this may affect some features of the site.
            </p>

            <h2>4. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h2>5. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <p className="text-sm text-slate-500 mt-12">
              Last updated: March 30, 2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
