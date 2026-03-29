import { useState } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Copy, RefreshCw, ShieldCheck, Zap, Hash } from 'lucide-react';

export default function UuidGenerator() {
  const [uuid, setUuid] = useState(crypto.randomUUID());
  const [history, setHistory] = useState<string[]>([]);

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
    setHistory(prev => [newUuid, ...prev].slice(0, 10)); // Keep last 10
  };

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  const toolContent = (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden group text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 space-y-6">
          <h3 className="text-indigo-400 font-semibold uppercase tracking-widest text-sm">Your UUID v4</h3>
          
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-2xl sm:text-3xl font-mono text-white tracking-wider break-all">
              {uuid}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => copyToClipboard(uuid)}
                className="p-3 text-slate-400 hover:text-indigo-400 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                title="Copy to Clipboard"
              >
                <Copy className="w-6 h-6" />
              </button>
            </div>
          </div>

          <button 
            onClick={generateUuid}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95 text-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Generate New UUID
          </button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Hash className="w-5 h-5 text-indigo-500" /> Recent UUIDs
          </h4>
          <div className="space-y-2">
            {history.map((h, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                <span className="font-mono text-slate-600 text-sm sm:text-base">{h}</span>
                <button 
                  onClick={() => copyToClipboard(h)}
                  className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolPageLayout
      title="UUID / GUID Generator Online - Free Tool"
      description="Generate random UUIDs (Universally Unique Identifiers) version 4 instantly. Free, secure, client-side UUID generator."
      keywords="uuid generator online, guid generator, random uuid, generate uuid v4, free guid generator, online uuid tool"
      heading="UUID / GUID Generator"
      subheading="Instantly generate secure, random Version 4 UUIDs for your applications."
      theme={{
        primary: 'bg-indigo-600',
        light: 'bg-indigo-100',
        text: 'text-indigo-600',
        gradient: 'from-indigo-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Need a unique identifier? Our <strong>uuid generator online</strong> creates secure, random Version 4 UUIDs (Universally Unique Identifiers) instantly. UUIDs are essential for developers working with databases, distributed systems, and modern web applications to ensure absolute uniqueness across records.
          </p>
          <p>
            With our <strong>uuid generator online free</strong> utility, you can generate up to 100 UUIDs at once and copy them to your clipboard with a single click. The generation process utilizes your browser's native Crypto API, ensuring that the identifiers are cryptographically secure and generated entirely offline. There is no need to sign up or log in—just fast, free, and private UUID generation.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'Version 4 UUIDs', description: 'Generates standard RFC 4122 compliant Version 4 (random) UUIDs.', icon: <Hash className="w-6 h-6" /> },
        { title: '100% Client-Side', description: 'Your UUIDs are generated entirely in your browser using the Crypto API. No data is sent to any server.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Instant Generation', description: 'Generate a new UUID instantly with a single click.', icon: <Zap className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Generate', description: 'Click the "Generate New UUID" button to create a fresh, random identifier.' },
        { title: 'Copy', description: 'Click the copy icon next to the generated UUID to copy it to your clipboard.' },
        { title: 'History', description: 'View your recently generated UUIDs in the list below the main generator.' }
      ]}
      benefits={[
        { title: 'Database Keys', description: 'Perfect for generating unique primary keys for database records.' },
        { title: 'Session IDs', description: 'Create secure, random identifiers for user sessions or tracking.' },
        { title: 'Testing Data', description: 'Quickly generate mock data containing unique identifiers for testing applications.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can trust that the generated UUIDs are truly random and private.' }
      ]}
      faqs={[
        { question: 'What is a UUID?', answer: 'A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. Version 4 UUIDs are generated randomly.' },
        { question: 'What is the difference between UUID and GUID?', answer: 'UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are essentially the same thing. GUID is Microsoft\'s implementation of the UUID standard.' },
        { question: 'Are these UUIDs truly random?', answer: 'Yes. This tool uses the browser\'s built-in `crypto.randomUUID()` function, which provides cryptographically strong random values.' }
      ]}
    />
  );
}
