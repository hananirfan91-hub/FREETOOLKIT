import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';

// Lazy load all tool pages for better initial load performance
const JsonFormatter = React.lazy(() => import('./pages/JsonFormatter'));
const Base64Encoder = React.lazy(() => import('./pages/Base64Encoder'));
const ImageCompressor = React.lazy(() => import('./pages/ImageCompressor'));
const ImageResizer = React.lazy(() => import('./pages/ImageResizer'));
const TextCaseConverter = React.lazy(() => import('./pages/TextCaseConverter'));
const WordCounter = React.lazy(() => import('./pages/WordCounter'));
const UrlEncoder = React.lazy(() => import('./pages/UrlEncoder'));
const PasswordGenerator = React.lazy(() => import('./pages/PasswordGenerator'));
const UuidGenerator = React.lazy(() => import('./pages/UuidGenerator'));
const ColorConverter = React.lazy(() => import('./pages/ColorConverter'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));
const PdfToWord = React.lazy(() => import('./pages/PdfToWord'));
const WordToPdf = React.lazy(() => import('./pages/WordToPdf'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const About = React.lazy(() => import('./pages/About'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="json-formatter" element={<JsonFormatter />} />
              <Route path="base64-encoder" element={<Base64Encoder />} />
              <Route path="image-compressor" element={<ImageCompressor />} />
              <Route path="image-resizer" element={<ImageResizer />} />
              <Route path="text-case-converter" element={<TextCaseConverter />} />
              <Route path="word-counter" element={<WordCounter />} />
              <Route path="url-encoder" element={<UrlEncoder />} />
              <Route path="password-generator" element={<PasswordGenerator />} />
              <Route path="uuid-generator" element={<UuidGenerator />} />
              <Route path="color-picker" element={<ColorConverter />} />
              <Route path="resume-builder" element={<ResumeBuilder />} />
              <Route path="pdf-to-word" element={<PdfToWord />} />
              <Route path="word-to-pdf" element={<WordToPdf />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="about" element={<About />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
