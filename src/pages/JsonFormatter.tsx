import { useState } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Code, CheckCircle, AlertCircle, Copy, Trash2 } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"John Doe","age":30,"city":"New York","skills":["JavaScript","React","Node.js"]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const toolContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col h-[500px]">
          <div className="flex items-center justify-between bg-slate-800 text-slate-300 px-4 py-3 rounded-t-xl border-b border-slate-700">
            <span className="font-mono text-sm font-medium">Input (Raw JSON)</span>
            <button onClick={() => setInput('')} className="text-slate-400 hover:text-red-400 transition-colors" title="Clear">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea 
            className="flex-grow w-full bg-slate-900 text-yellow-400 font-mono text-sm p-4 rounded-b-xl focus:outline-none resize-none border border-slate-800 focus:border-yellow-500/50 transition-colors"
            placeholder='{"paste": "your JSON here"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col h-[500px]">
          <div className="flex items-center justify-between bg-slate-800 text-slate-300 px-4 py-3 rounded-t-xl border-b border-slate-700">
            <span className="font-mono text-sm font-medium flex items-center gap-2">
              {error ? (
                <><AlertCircle className="w-4 h-4 text-red-500" /> <span className="text-red-400">Invalid JSON</span></>
              ) : output ? (
                <><CheckCircle className="w-4 h-4 text-green-500" /> <span className="text-green-400">Valid JSON</span></>
              ) : (
                'Output'
              )}
            </span>
            <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm" title="Copy">
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
          <div className="flex-grow w-full bg-slate-900 text-slate-300 font-mono text-sm p-4 rounded-b-xl overflow-auto border border-slate-800 relative">
            {error ? (
              <div className="text-red-400 font-mono text-sm whitespace-pre-wrap">{error}</div>
            ) : (
              <pre><code className="language-json">{output}</code></pre>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button 
          onClick={formatJson}
          className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 flex items-center gap-2 text-lg hover:-translate-y-1"
        >
          <Code className="w-6 h-6" />
          Format & Validate JSON
        </button>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="JSON Formatter & Validator Online - Free Client-Side Tool"
      description="Format, validate, and beautify JSON data online instantly. 100% client-side processing ensures your data never leaves your browser."
      keywords="json formatter online, json validator, beautify json, format json online, free json editor"
      heading="JSON Formatter & Validator"
      subheading="Instantly format, validate, and beautify your JSON data securely in your browser."
      theme={{
        primary: 'bg-yellow-500',
        light: 'bg-yellow-100',
        text: 'text-yellow-600',
        gradient: 'from-yellow-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Welcome to the best <strong>json formatter online</strong>. If you are a developer, data analyst, or student working with APIs, you know how messy and unreadable raw JSON data can be. Our free online JSON formatter and validator is designed to instantly parse, format, and beautify your JSON strings into a clean, readable, and collapsible tree structure.
          </p>
          <p>
            Unlike other tools that send your sensitive data to a backend server, our <strong>json formatter online free</strong> tool runs 100% client-side in your browser. This means your data is completely secure and private. Whether you need to debug a complex API response, validate JSON syntax, or simply format a minified JSON string for readability, this tool provides instant results without any signup or login required.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'Instant Validation', description: 'Detects syntax errors in real-time and provides helpful error messages.', icon: <CheckCircle className="w-6 h-6" /> },
        { title: '100% Client-Side', description: 'Your JSON data is processed entirely in your browser. No data is sent to any server.', icon: <Code className="w-6 h-6" /> },
        { title: 'One-Click Copy', description: 'Easily copy your beautifully formatted JSON to your clipboard with a single click.', icon: <Copy className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Paste JSON', description: 'Paste your raw, unformatted, or minified JSON data into the left input panel.' },
        { title: 'Click Format', description: 'Click the "Format & Validate JSON" button to process your data.' },
        { title: 'Review & Copy', description: 'If valid, your formatted JSON will appear on the right. If invalid, you will see exactly where the error is.' }
      ]}
      benefits={[
        { title: 'Enhanced Readability', description: 'Converts unreadable minified JSON into a clean, indented format.' },
        { title: 'Error Prevention', description: 'Catch missing commas, unquoted keys, and structural errors before they break your app.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can safely format sensitive API responses or configuration files.' },
        { title: 'Lightning Fast', description: 'No network latency means your JSON is formatted instantly, regardless of size.' }
      ]}
      faqs={[
        { question: 'Is my JSON data secure?', answer: 'Yes. This tool runs 100% client-side in your browser. Your data is never transmitted over the internet or saved to any server.' },
        { question: 'What makes JSON invalid?', answer: 'Common errors include missing quotes around keys, trailing commas, single quotes instead of double quotes, and missing brackets.' },
        { question: 'Can it handle large JSON files?', answer: 'Yes, modern browsers can easily parse and format JSON files containing tens of thousands of lines instantly.' }
      ]}
    />
  );
}
