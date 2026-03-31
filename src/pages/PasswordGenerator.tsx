import { useState, useEffect } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Key, Copy, RefreshCw, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: 'text-red-500' });

  const generatePassword = () => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let charset = '';
    if (options.uppercase) charset += chars.uppercase;
    if (options.lowercase) charset += chars.lowercase;
    if (options.numbers) charset += chars.numbers;
    if (options.symbols) charset += chars.symbols;

    if (charset === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  useEffect(() => {
    let score = 0;
    if (password.length > 8) score += 1;
    if (password.length > 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score < 3) setStrength({ score, label: 'Weak', color: 'text-red-500' });
    else if (score < 5) setStrength({ score, label: 'Fair', color: 'text-yellow-500' });
    else if (score < 7) setStrength({ score, label: 'Good', color: 'text-blue-500' });
    else setStrength({ score, label: 'Strong', color: 'text-green-500' });
  }, [password]);

  const handleOptionChange = (option: keyof typeof options) => {
    const newOptions = { ...options, [option]: !options[option] };
    // Prevent unchecking all options
    if (!Object.values(newOptions).some(Boolean)) return;
    setOptions(newOptions);
  };

  const copyToClipboard = () => {
    if (password) navigator.clipboard.writeText(password);
  };

  const toolContent = (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-mono text-emerald-400 tracking-wider break-all">
              {password || 'Select options...'}
            </span>
            <div className="flex items-center gap-2 ml-4">
              <button 
                onClick={generatePassword}
                className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                title="Generate New Password"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={copyToClipboard}
                className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                title="Copy to Clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div 
                  key={level} 
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    strength.score >= level * 1.5 ? strength.color.replace('text-', 'bg-') : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className={`text-sm font-semibold ml-2 ${strength.color}`}>
              {strength.label}
            </span>
          </div>
          <span className="text-slate-400 text-sm font-medium">
            {length} characters
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Password Length
            </label>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
              {length}
            </span>
          </div>
          <input 
            type="range" 
            min="8" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
            <span>8</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider block mb-4">
            Characters Used
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors group">
              <input 
                type="checkbox" 
                checked={options.uppercase} 
                onChange={() => handleOptionChange('uppercase')}
                className="w-5 h-5 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="ml-3 text-slate-700 font-medium group-hover:text-emerald-700 transition-colors">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors group">
              <input 
                type="checkbox" 
                checked={options.lowercase} 
                onChange={() => handleOptionChange('lowercase')}
                className="w-5 h-5 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="ml-3 text-slate-700 font-medium group-hover:text-emerald-700 transition-colors">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors group">
              <input 
                type="checkbox" 
                checked={options.numbers} 
                onChange={() => handleOptionChange('numbers')}
                className="w-5 h-5 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="ml-3 text-slate-700 font-medium group-hover:text-emerald-700 transition-colors">Numbers (0-9)</span>
            </label>
            <label className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors group">
              <input 
                type="checkbox" 
                checked={options.symbols} 
                onChange={() => handleOptionChange('symbols')}
                className="w-5 h-5 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="ml-3 text-slate-700 font-medium group-hover:text-emerald-700 transition-colors">Symbols (!@#$...)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="Strong Password Generator Online - Secure & Free"
      description="Generate strong, secure, random passwords instantly. Customize length and characters. Free, client-side password generator tool."
      keywords="strong password generator, random password generator, secure password generator, create strong password, free password generator"
      heading="Strong Password Generator"
      subheading="Create secure, random passwords instantly to protect your online accounts."
      theme={{
        primary: 'bg-emerald-600',
        light: 'bg-emerald-100',
        text: 'text-emerald-600',
        gradient: 'from-emerald-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Are you still using the same password for multiple accounts? In an era of constant data breaches, using a unique, complex password for every online account is the single most effective way to secure your personal information against hackers. Protect your digital identity today with our cryptographically secure password generator.
          </p>
          <p>
            Our tool creates highly secure, random passwords instantly. You can easily customize the length and choose whether to include uppercase letters, numbers, and special characters to meet any website's requirements. Most importantly, this utility uses your browser's native <code>window.crypto</code> API to generate passwords 100% locally. We never see, store, or transmit your generated passwords over the network, guaranteeing absolute privacy and security without any signup or login.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'Cryptographically Secure', description: 'Uses the browser\'s Crypto API (window.crypto) to generate truly random, secure passwords.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: '100% Client-Side', description: 'Your password is generated entirely in your browser. It is never sent to or stored on any server.', icon: <Key className="w-6 h-6" /> },
        { title: 'Highly Customizable', description: 'Choose the exact length and character types (uppercase, lowercase, numbers, symbols) you need.', icon: <Zap className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Set Length', description: 'Use the slider to choose how long you want your password to be (we recommend at least 16 characters).' },
        { title: 'Choose Characters', description: 'Select which types of characters to include: uppercase, lowercase, numbers, and symbols.' },
        { title: 'Copy Password', description: 'Click the copy icon next to the generated password to copy it to your clipboard.' }
      ]}
      benefits={[
        { title: 'Prevent Hacking', description: 'Strong, random passwords are the best defense against brute-force attacks and credential stuffing.' },
        { title: 'Unique Passwords', description: 'Easily generate a unique, complex password for every single account you own.' },
        { title: 'Meet Requirements', description: 'Quickly create passwords that meet the strict requirements of any website or IT policy.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can trust that no one else sees the passwords you generate.' }
      ]}
      faqs={[
        { question: 'What makes a password strong?', answer: 'A strong password is long (16+ characters), random, and includes a mix of uppercase letters, lowercase letters, numbers, and symbols.' },
        { question: 'Is it safe to use an online password generator?', answer: 'Yes, if it is client-side like this one. Because the password is generated in your browser using JavaScript, it is never transmitted over the internet.' },
        { question: 'Should I memorize these passwords?', answer: 'No. It is best to use a reputable Password Manager to store these complex, generated passwords securely.' }
      ]}
    />
  );
}
