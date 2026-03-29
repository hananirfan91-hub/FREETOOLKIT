import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { CheckCircle2, Info, Star, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ThemeColors {
  primary: string;
  light: string;
  text: string;
  gradient: string;
}

interface ToolPageLayoutProps {
  title: string;
  description: string;
  keywords: string;
  heading: string;
  subheading: string;
  toolContent: React.ReactNode;
  features: { title: string; description: string; icon: React.ReactNode }[];
  howToSteps: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  theme: ThemeColors;
  seoIntro?: React.ReactNode;
}

const INTERNAL_LINKS = [
  { name: 'JSON Formatter', path: '/json-formatter', text: 'Try our JSON Formatter' },
  { name: 'Base64 Encoder', path: '/base64-encoder', text: 'Use our Base64 Encoder' },
  { name: 'Image Compressor', path: '/image-compressor', text: 'Try our Image Compressor' },
  { name: 'Image Resizer', path: '/image-resizer', text: 'Use our Image Resizer' },
  { name: 'Password Generator', path: '/password-generator', text: 'Try our Password Generator' },
  { name: 'Word Counter', path: '/word-counter', text: 'Use our Word Counter' },
];

export default function ToolPageLayout({
  title,
  description,
  keywords,
  heading,
  subheading,
  toolContent,
  features,
  howToSteps,
  benefits,
  faqs,
  theme,
  seoIntro
}: ToolPageLayoutProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // Get 4 random internal links that are not the current page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const randomLinks = INTERNAL_LINKS.filter(link => link.path !== currentPath).slice(0, 4);
  const canonicalUrl = `https://freetoolshub1.vercel.app${currentPath}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="FreeToolKit" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webAppSchema)}
        </script>
      </Helmet>

      {/* 1. Hero & Tool Section */}
      <section className={`bg-gradient-to-b ${theme.gradient} py-16 md:py-24 border-b border-slate-800`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            {heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto"
          >
            {subheading}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl text-left border border-slate-200"
          >
            {toolContent}
          </motion.div>
        </div>
      </section>

      {/* 1.5 SEO Intro Section */}
      {seoIntro && (
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-700 leading-relaxed text-lg">
            {seoIntro}
          </div>
        </section>
      )}

      {/* 2. Features Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <Star className={`w-8 h-8 ${theme.text}`} />
              Advanced Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${theme.light} rounded-lg flex items-center justify-center mb-4 ${theme.text}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How to Use Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <Info className={`w-8 h-8 ${theme.text}`} />
              How to Use
            </h2>
          </div>
          <div className="space-y-6">
            {howToSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold text-lg`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Benefits Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <CheckCircle2 className={`w-8 h-8 ${theme.text}`} />
              Why Use Our Tool?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4">
                <CheckCircle2 className={`w-6 h-6 ${theme.text} flex-shrink-0 mt-1`} />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <HelpCircle className={`w-8 h-8 ${theme.text}`} />
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Internal Linking Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">More Free Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {randomLinks.map((link, idx) => (
              <Link 
                key={idx} 
                to={link.path}
                className="group p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2"
              >
                <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm">{link.name}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1 group-hover:text-indigo-500">
                  {link.text} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
