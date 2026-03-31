import React, { useState } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Link, Copy, Trash2, ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const processUrl = (text: string, currentMode: 'encode' | 'decode') => {
    try {
      if (currentMode === 'encode') {
        return encodeURIComponent(text);
      } else {
        return decodeURIComponent(text);
      }
    } catch (e) {
      return 'Error: Invalid URL encoding';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    setOutput(processUrl(text, mode));
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
    setOutput(processUrl(output, newMode));
  };

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const toolContent = (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => { setMode('encode'); setOutput(processUrl(input, 'encode')); }}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'encode' 
                ? 'bg-white text-cyan-600 shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Encode URL
          </button>
          <button
            onClick={() => { setMode('decode'); setOutput(processUrl(input, 'decode')); }}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'decode' 
                ? 'bg-white text-cyan-600 shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Decode URL
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
              {mode === 'encode' ? 'Raw URL / Text' : 'Encoded URL'}
            </label>
            <button onClick={() => { setInput(''); setOutput(''); }} className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
          <textarea 
            className="w-full border-2 border-slate-200 rounded-2xl p-4 h-48 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 text-base transition-all resize-none shadow-inner bg-slate-50 font-mono"
            placeholder={mode === 'encode' ? 'Enter text to encode (e.g., Hello World!)' : 'Enter encoded URL (e.g., Hello%20World!)'}
            value={input}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleModeSwitch}
            className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 p-3 rounded-full transition-colors hidden md:block"
            title="Swap Input/Output and Mode"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
              {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
            </label>
            <button onClick={copyToClipboard} className="text-cyan-600 hover:text-cyan-800 transition-colors flex items-center gap-1 text-sm font-medium">
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
          <textarea 
            className="w-full border-2 border-slate-200 rounded-2xl p-4 h-48 bg-white text-base resize-none font-mono focus:outline-none"
            readOnly
            value={output}
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="URL Encoder / Decoder Online - Free Tool"
      description="Encode or decode URLs instantly. Convert special characters to URL-safe format or decode percent-encoded strings. Free, secure, client-side tool."
      keywords="url encoder online, url decoder online, percent encoding, url encode decode, encode url string, free url encoder"
      heading="URL Encoder & Decoder"
      subheading="Instantly encode text into a URL-safe format or decode percent-encoded URLs."
      theme={{
        primary: 'bg-cyan-600',
        light: 'bg-cyan-100',
        text: 'text-cyan-600',
        gradient: 'from-cyan-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Have you ever copied a link only to find it filled with confusing "%20" characters? Or perhaps you are a developer trying to pass complex data through a web request without breaking the link. Our browser-based URL encoder and decoder utility is designed to solve exactly these problems.
          </p>
          <p>
            When transmitting data over the internet, special characters like spaces, ampersands, and question marks must be encoded into a valid ASCII format. Our tool allows you to instantly convert standard text into a URL-safe format, or decode a messy URL string back into human-readable text. Because this tool runs entirely within your browser, your sensitive URLs and query parameters are never logged or stored on a remote server. Experience instant, secure, and free URL encoding with no registration needed.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'Encode & Decode', description: 'Easily switch between encoding raw text to URL-safe format and decoding percent-encoded URLs.', icon: <ArrowRightLeft className="w-6 h-6" /> },
        { title: '100% Client-Side', description: 'Your URLs are processed entirely in your browser. No data is sent to any server.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Instant Results', description: 'See the encoded or decoded result instantly as you type or paste your text.', icon: <Zap className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Select Mode', description: 'Choose whether you want to "Encode URL" or "Decode URL" using the toggle buttons.' },
        { title: 'Paste Text', description: 'Paste the text or URL you want to process into the left text area.' },
        { title: 'Copy Result', description: 'The processed result will instantly appear in the right text area. Click "Copy" to use it.' }
      ]}
      benefits={[
        { title: 'Fix Broken Links', description: 'Ensure your URLs work correctly by encoding spaces and special characters before sharing.' },
        { title: 'Read Complex URLs', description: 'Decode long, confusing URLs with percent-encoding (%20, etc.) to see what they actually say.' },
        { title: 'API Development', description: 'Quickly encode query parameters when building or testing API requests.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can safely encode or decode URLs containing sensitive tokens or data.' }
      ]}
      faqs={[
        { question: 'What is URL Encoding?', answer: 'URL encoding (percent-encoding) converts characters into a format that can be safely transmitted over the Internet. For example, a space becomes "%20".' },
        { question: 'Why do I need to encode URLs?', answer: 'URLs can only be sent over the Internet using the ASCII character-set. Unsafe ASCII characters (like spaces) must be encoded to ensure the URL is valid.' },
        { question: 'Is my data sent to a server?', answer: 'No. This tool runs 100% client-side in your browser. Your data is never transmitted over the internet.' }
      ]}
    />
  );
}
