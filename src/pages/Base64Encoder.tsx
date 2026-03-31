import { useState } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Binary, ArrowRightLeft, Copy, Trash2, ShieldCheck, Zap } from 'lucide-react';

export default function Base64Encoder() {
  const [input, setInput] = useState('Hello World!');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const processText = () => {
    try {
      if (!input) {
        setOutput('');
        setError(null);
        return;
      }
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError(null);
    } catch (err) {
      setError('Invalid input for Base64 decoding. Please ensure the string is correctly formatted.');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const toolContent = (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button 
          onClick={() => { setMode('encode'); setOutput(''); setError(null); }}
          className={`flex-1 py-3 text-center font-semibold rounded-lg transition-all ${mode === 'encode' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Encode to Base64
        </button>
        <button 
          onClick={() => { setMode('decode'); setOutput(''); setError(null); }}
          className={`flex-1 py-3 text-center font-semibold rounded-lg transition-all ${mode === 'decode' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Decode from Base64
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
              {mode === 'encode' ? 'Input Text' : 'Base64 String'}
            </label>
            <button onClick={() => setInput('')} className="text-slate-400 hover:text-red-500 transition-colors" title="Clear">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea 
            className="w-full border-2 border-slate-200 rounded-xl p-4 h-40 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-sm transition-all resize-none"
            placeholder={mode === 'encode' ? "Type or paste your text here..." : "Paste your Base64 string here..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={processText}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2 text-lg hover:-translate-y-1"
          >
            <ArrowRightLeft className="w-6 h-6" />
            {mode === 'encode' ? 'Encode Text' : 'Decode Base64'}
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            <button onClick={copyToClipboard} className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 text-sm font-medium">
              <Copy className="w-4 h-4" /> Copy Result
            </button>
          </div>
          {error ? (
            <div className="w-full border-2 border-red-200 bg-red-50 rounded-xl p-4 h-40 font-mono text-sm text-red-600 flex items-center justify-center">
              {error}
            </div>
          ) : (
            <textarea 
              className="w-full border-2 border-slate-200 rounded-xl p-4 h-40 bg-slate-50 focus:outline-none font-mono text-sm text-slate-700 resize-none"
              readOnly
              value={output}
              placeholder="Result will appear here..."
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="Base64 Encoder & Decoder Online - Free Client-Side Tool"
      description="Encode text to Base64 or decode Base64 strings online for free. Fast, secure, and 100% client-side Base64 converter tool."
      keywords="base64 encode decode online, base64 encoder, base64 decoder, encode to base64, decode base64 string, free base64 converter"
      heading="Base64 Encoder / Decoder"
      subheading="Encode text to Base64 or decode Base64 strings instantly and securely in your browser."
      theme={{
        primary: 'bg-indigo-600',
        light: 'bg-indigo-100',
        text: 'text-indigo-600',
        gradient: 'from-indigo-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Have you ever needed to pass complex data through a URL, embed an image directly into CSS, or prepare credentials for an API request? Base64 encoding is the standard solution for transmitting binary data safely across text-based protocols. Our browser-based Base64 encoder and decoder is the fastest and most secure way to convert your text or data.
          </p>
          <p>
            Whether you need to quickly encode a string to ensure data integrity, or decode a mysterious Base64 string back into readable text, our utility handles it instantly. Because it operates entirely within your browser (client-side), you can safely process sensitive tokens, passwords, or private data without worrying about it being intercepted or stored on a remote server. No signup, no login, just instant and private Base64 conversion.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'UTF-8 Support', description: 'Safely encodes and decodes special characters, emojis, and international text.', icon: <Binary className="w-6 h-6" /> },
        { title: '100% Secure', description: 'Everything runs locally in your browser. No data is transmitted to any server.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Instant Processing', description: 'Encode or decode large strings instantly without any network delays.', icon: <Zap className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Select Mode', description: 'Choose whether you want to "Encode to Base64" or "Decode from Base64" using the toggle buttons.' },
        { title: 'Input Data', description: 'Paste your plain text or Base64 string into the input area.' },
        { title: 'Process & Copy', description: 'Click the action button and instantly copy the result to your clipboard.' }
      ]}
      benefits={[
        { title: 'Data Integrity', description: 'Base64 ensures that binary data remains intact without modification during transport over text-based protocols.' },
        { title: 'API Integration', description: 'Easily prepare credentials for Basic Authentication headers or encode payloads for APIs.' },
        { title: 'Privacy Focused', description: 'Since the tool is entirely client-side, you can safely decode sensitive tokens or encode private keys.' },
        { title: 'Developer Friendly', description: 'A must-have utility for web developers, system administrators, and security researchers.' }
      ]}
      faqs={[
        { question: 'What is Base64 encoding?', answer: 'Base64 is an encoding scheme that represents binary data in an ASCII string format. It translates data into a radix-64 representation.' },
        { question: 'Is Base64 encryption?', answer: 'No. Base64 is an encoding method, not encryption. It does not hide data or secure it; it merely changes its format. Anyone can decode a Base64 string.' },
        { question: 'Why do I get an error when decoding?', answer: 'Base64 strings must have a length that is a multiple of 4 and contain only valid characters (A-Z, a-z, 0-9, +, /, and = for padding). Invalid strings will throw an error.' }
      ]}
    />
  );
}
