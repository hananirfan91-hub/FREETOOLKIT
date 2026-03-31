import { useState, useEffect } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { FileText, Type, AlignLeft, Clock, Hash, Trash2, Copy, ShieldCheck, Zap } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200); // 200 words per minute average

    setStats({ words, characters, charactersNoSpaces, sentences, paragraphs, readingTime });
  }, [text]);

  const copyToClipboard = () => {
    if (text) navigator.clipboard.writeText(text);
  };

  const toolContent = (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-orange-600 mb-1">{stats.words}</span>
          <span className="text-xs font-semibold text-orange-800 uppercase tracking-wider flex items-center gap-1">
            <FileText className="w-3 h-3" /> Words
          </span>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-slate-700 mb-1">{stats.characters}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Type className="w-3 h-3" /> Characters
          </span>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-slate-700 mb-1">{stats.charactersNoSpaces}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Hash className="w-3 h-3" /> No Spaces
          </span>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-slate-700 mb-1">{stats.sentences}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <AlignLeft className="w-3 h-3" /> Sentences
          </span>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-slate-700 mb-1">{stats.paragraphs}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <FileText className="w-3 h-3" /> Paragraphs
          </span>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-slate-700 mb-1">{stats.readingTime}m</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3" /> Read Time
          </span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2 px-1">
          <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Your Text
          </label>
          <div className="flex items-center gap-4">
            <button onClick={() => setText('')} className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
            <button onClick={copyToClipboard} className="text-orange-600 hover:text-orange-800 transition-colors flex items-center gap-1 text-sm font-medium">
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
        </div>
        <textarea 
          className="w-full border-2 border-slate-200 rounded-2xl p-6 h-80 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-lg transition-all resize-none shadow-inner bg-slate-50"
          placeholder="Start typing or paste your text here to see live word count and statistics..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="Word Counter & Character Counter Online - Free Tool"
      description="Count words, characters, sentences, paragraphs, and estimate reading time online. Free, secure, client-side word counter tool."
      keywords="word counter online, character counter, word count tool, count words, reading time calculator, free word counter"
      heading="Word & Character Counter"
      subheading="Instantly count words, characters, sentences, and paragraphs as you type."
      theme={{
        primary: 'bg-orange-600',
        light: 'bg-orange-100',
        text: 'text-orange-600',
        gradient: 'from-orange-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Whether you are a student trying to hit a strict essay word limit, a marketer crafting the perfect tweet, or an SEO professional optimizing a meta description, knowing your exact character and word count is essential. Our browser-based word counter is the perfect free tool for these everyday writing tasks.
          </p>
          <p>
            Using this utility, you get real-time statistics the moment you start typing or paste your text. It instantly calculates words, characters (both with and without spaces), sentences, paragraphs, and even estimates the reading time. Best of all, it operates 100% client-side. This means your private essays, articles, and confidential documents are never sent to a remote server. Enjoy fast, secure, and accurate counting with no signup required.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'Live Statistics', description: 'See your word count, character count, and other metrics update instantly as you type.', icon: <Zap className="w-6 h-6" /> },
        { title: '100% Client-Side', description: 'Your text is processed entirely in your browser. No data is sent to any server.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Reading Time', description: 'Automatically estimates how long it will take an average reader to read your text.', icon: <Clock className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Paste Text', description: 'Type or paste the text you want to analyze into the large text area.' },
        { title: 'View Stats', description: 'Look at the top dashboard to see live updates of words, characters, sentences, and paragraphs.' },
        { title: 'Edit & Refine', description: 'Continue editing your text to hit specific word count limits for essays, tweets, or SEO.' }
      ]}
      benefits={[
        { title: 'Meet Word Limits', description: 'Perfect for students writing essays, journalists, or marketers adhering to strict word count limits.' },
        { title: 'Optimize for SEO', description: 'Ensure your blog posts and articles meet the ideal length for search engine optimization.' },
        { title: 'Social Media Posts', description: 'Check character counts to ensure your tweets, Instagram captions, or LinkedIn posts fit perfectly.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can safely count words in confidential documents or private journals.' }
      ]}
      faqs={[
        { question: 'How is reading time calculated?', answer: 'Reading time is estimated based on an average reading speed of 200 words per minute.' },
        { question: 'Does it count spaces as characters?', answer: 'We provide two metrics: total characters (including spaces) and characters without spaces, so you have exactly the data you need.' },
        { question: 'Is my text sent to a server?', answer: 'No. This tool runs 100% client-side in your browser. Your text is never transmitted over the internet.' }
      ]}
    />
  );
}
