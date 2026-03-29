import { useState } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Type, Copy, Trash2, ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';

export default function TextCaseConverter() {
  const [text, setText] = useState('hello world! this is a text case converter.');

  const handleConvert = (type: string) => {
    if (!text) return;
    let result = text;
    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'alternating':
        result = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
        break;
      case 'inverse':
        result = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
        break;
    }
    setText(result);
  };

  const copyToClipboard = () => {
    if (text) navigator.clipboard.writeText(text);
  };

  const toolContent = (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <button onClick={() => handleConvert('sentence')} className="bg-slate-100 hover:bg-pink-100 hover:text-pink-700 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors border border-slate-200 hover:border-pink-300 text-sm">
          Sentence case
        </button>
        <button onClick={() => handleConvert('lower')} className="bg-slate-100 hover:bg-pink-100 hover:text-pink-700 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors border border-slate-200 hover:border-pink-300 text-sm">
          lower case
        </button>
        <button onClick={() => handleConvert('upper')} className="bg-slate-100 hover:bg-pink-100 hover:text-pink-700 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors border border-slate-200 hover:border-pink-300 text-sm">
          UPPER CASE
        </button>
        <button onClick={() => handleConvert('title')} className="bg-slate-100 hover:bg-pink-100 hover:text-pink-700 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors border border-slate-200 hover:border-pink-300 text-sm">
          Title Case
        </button>
        <button onClick={() => handleConvert('alternating')} className="bg-slate-100 hover:bg-pink-100 hover:text-pink-700 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors border border-slate-200 hover:border-pink-300 text-sm">
          aLtErNaTiNg
        </button>
        <button onClick={() => handleConvert('inverse')} className="bg-slate-100 hover:bg-pink-100 hover:text-pink-700 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors border border-slate-200 hover:border-pink-300 text-sm">
          iNVERSE cASE
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2 px-1">
          <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Your Text
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              {text.length} characters | {text.split(/\s+/).filter(w => w.length > 0).length} words
            </span>
            <button onClick={() => setText('')} className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
            <button onClick={copyToClipboard} className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1 text-sm font-medium">
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
        </div>
        <textarea 
          className="w-full border-2 border-slate-200 rounded-2xl p-6 h-64 focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 text-lg transition-all resize-none shadow-inner bg-slate-50"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="Text Case Converter Online - Uppercase to Lowercase"
      description="Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more instantly. Free online text case converter tool."
      keywords="uppercase to lowercase converter, text case converter, change text case, title case converter, sentence case online"
      heading="Text Case Converter"
      subheading="Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and more instantly."
      theme={{
        primary: 'bg-pink-600',
        light: 'bg-pink-100',
        text: 'text-pink-600',
        gradient: 'from-pink-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Looking for a reliable <strong>uppercase to lowercase converter</strong>? Whether you accidentally left caps lock on while typing a long document, or you need to quickly format text for a programming variable, our free online text case converter is the perfect solution.
          </p>
          <p>
            With our <strong>uppercase to lowercase converter free</strong> tool, you can instantly transform any text into UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. Because it runs entirely in your browser, your text is never uploaded to a server, ensuring complete privacy and lightning-fast conversions. No signup or login is required—just paste your text and click to convert.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'Multiple Formats', description: 'Supports Sentence case, lower case, UPPER CASE, Title Case, aLtErNaTiNg cAsE, and iNVERSE cASE.', icon: <Type className="w-6 h-6" /> },
        { title: '100% Client-Side', description: 'Your text is processed entirely in your browser. No data is sent to any server.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Live Word Count', description: 'Instantly see the character and word count of your text as you type or convert.', icon: <Zap className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Paste Text', description: 'Type or paste the text you want to convert into the large text area.' },
        { title: 'Select Case', description: 'Click any of the case conversion buttons above the text area (e.g., "UPPER CASE").' },
        { title: 'Copy Result', description: 'Your text will instantly transform. Click "Copy" to copy the result to your clipboard.' }
      ]}
      benefits={[
        { title: 'Fix Caps Lock Errors', description: 'Accidentally left Caps Lock on? Instantly fix entire paragraphs without retyping.' },
        { title: 'Standardize Titles', description: 'Ensure all your blog post titles or essay headings follow proper Title Case rules.' },
        { title: 'Format Data', description: 'Quickly clean up messy data exports by converting all names to Title Case or emails to lowercase.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can safely convert sensitive documents or emails.' }
      ]}
      faqs={[
        { question: 'What is Sentence case?', answer: 'Sentence case capitalizes only the first letter of the first word in a sentence, and leaves all other words lowercase (except proper nouns, though this basic tool lowercases everything else).' },
        { question: 'What is Title Case?', answer: 'Title Case capitalizes the first letter of every word. It is commonly used for book titles, movie titles, and article headlines.' },
        { question: 'Is my text sent to a server?', answer: 'No. This tool runs 100% client-side in your browser. Your text is never transmitted over the internet.' }
      ]}
    />
  );
}
