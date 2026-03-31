import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import JsonFormatter from './pages/JsonFormatter';
import Base64Encoder from './pages/Base64Encoder';
import ImageCompressor from './pages/ImageCompressor';
import ImageResizer from './pages/ImageResizer';
import TextCaseConverter from './pages/TextCaseConverter';
import WordCounter from './pages/WordCounter';
import UrlEncoder from './pages/UrlEncoder';
import PasswordGenerator from './pages/PasswordGenerator';
import UuidGenerator from './pages/UuidGenerator';
import ColorConverter from './pages/ColorConverter';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
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
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="about" element={<About />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
