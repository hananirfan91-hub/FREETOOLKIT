import React, { useState, useEffect } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Copy, Palette, ShieldCheck, Zap, Hash } from 'lucide-react';

export default function ColorConverter() {
  const [color, setColor] = useState('#3b82f6'); // Default blue
  const [rgb, setRgb] = useState('rgb(59, 130, 246)');
  const [hsl, setHsl] = useState('hsl(217, 91%, 60%)');

  // Helper to convert HEX to RGB
  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0;
    try {
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
      }
      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return 'rgb(0, 0, 0)';
      }
    } catch (e) {
      return 'rgb(0, 0, 0)';
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Helper to convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  useEffect(() => {
    // When HEX changes, update RGB and HSL
    if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
      const newRgb = hexToRgb(color);
      setRgb(newRgb);
      
      // Extract r,g,b for HSL conversion
      const rgbMatch = newRgb.match(/\d+/g);
      if (rgbMatch) {
        setHsl(rgbToHsl(Number(rgbMatch[0]), Number(rgbMatch[1]), Number(rgbMatch[2])));
      }
    }
  }, [color]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('#')) val = '#' + val;
    setColor(val);
  };

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  const toolContent = (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl flex flex-col md:flex-row gap-8 items-center">
        
        {/* Visual Color Picker */}
        <div className="flex-shrink-0 relative group">
          <div 
            className="w-48 h-48 sm:w-64 sm:h-64 rounded-full shadow-inner border-4 border-slate-100 overflow-hidden relative cursor-pointer"
            style={{ backgroundColor: color }}
          >
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Click to open color picker"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Click to pick color
          </div>
        </div>

        {/* Inputs and Values */}
        <div className="flex-grow w-full space-y-6">
          
          {/* HEX Input */}
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-semibold text-slate-700 uppercase tracking-wider">
              <span>HEX Color</span>
              <button onClick={() => copyToClipboard(color)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-xs">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Hash className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="text" 
                value={color}
                onChange={handleHexChange}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-mono text-slate-700 transition-all uppercase"
                placeholder="#000000"
                maxLength={7}
              />
            </div>
          </div>

          {/* RGB Output */}
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-semibold text-slate-700 uppercase tracking-wider">
              <span>RGB Color</span>
              <button onClick={() => copyToClipboard(rgb)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-xs">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </label>
            <input 
              type="text" 
              value={rgb}
              readOnly
              className="w-full px-4 py-4 bg-slate-100 border-2 border-transparent rounded-2xl text-lg font-mono text-slate-600 focus:outline-none"
            />
          </div>

          {/* HSL Output */}
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-semibold text-slate-700 uppercase tracking-wider">
              <span>HSL Color</span>
              <button onClick={() => copyToClipboard(hsl)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-xs">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </label>
            <input 
              type="text" 
              value={hsl}
              readOnly
              className="w-full px-4 py-4 bg-slate-100 border-2 border-transparent rounded-2xl text-lg font-mono text-slate-600 focus:outline-none"
            />
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="Color Picker & HEX to RGB Converter Online - Free Tool"
      description="Pick colors visually or convert between HEX, RGB, and HSL formats instantly. Free, client-side color converter tool for designers and developers."
      keywords="color picker online, hex to rgb converter, rgb to hex, hsl color converter, web color codes, free color tool"
      heading="Color Picker & Converter"
      subheading="Visually select colors or convert between HEX, RGB, and HSL formats instantly."
      theme={{
        primary: 'bg-blue-600',
        light: 'bg-blue-100',
        text: 'text-blue-600',
        gradient: 'from-blue-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Our <strong>hex to rgb converter</strong> and color picker is the ultimate design utility for web developers, UI/UX designers, and digital artists. Translating colors between different formats can be tedious, but our tool makes it effortless and visual.
          </p>
          <p>
            Using this <strong>hex to rgb converter free</strong> tool, you can seamlessly convert color codes between HEX, RGB, and HSL formats in real-time. Whether you are matching a brand color palette or tweaking CSS values, our interactive color picker provides instant feedback. Like all our utilities, this tool runs entirely in your browser, ensuring a lightning-fast, private experience with absolutely no signup or login required.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: 'Visual Picker', description: 'Click the large color circle to open your system\'s native visual color picker.', icon: <Palette className="w-6 h-6" /> },
        { title: '100% Client-Side', description: 'Your colors are processed entirely in your browser. No data is sent to any server.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Instant Conversion', description: 'Type a HEX code and instantly see the RGB and HSL equivalents update in real-time.', icon: <Zap className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Pick a Color', description: 'Click the large colored circle to visually select a color, or type a HEX code into the input field.' },
        { title: 'View Formats', description: 'The tool automatically calculates and displays the corresponding RGB and HSL values.' },
        { title: 'Copy Codes', description: 'Click the "Copy" button next to any format to instantly copy the color code to your clipboard.' }
      ]}
      benefits={[
        { title: 'Web Development', description: 'Quickly grab the exact RGB or HSL values needed for your CSS stylesheets.' },
        { title: 'Design Consistency', description: 'Ensure you are using the exact same color across different design tools by converting formats.' },
        { title: 'Accessibility Testing', description: 'Easily get color values to check contrast ratios for web accessibility.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can safely pick colors without tracking.' }
      ]}
      faqs={[
        { question: 'What is HEX?', answer: 'HEX (Hexadecimal) is a 6-digit code used in HTML and CSS to represent colors. It combines Red, Green, and Blue values.' },
        { question: 'What is RGB?', answer: 'RGB stands for Red, Green, and Blue. It defines colors based on the intensity of these three primary colors of light (0-255).' },
        { question: 'What is HSL?', answer: 'HSL stands for Hue, Saturation, and Lightness. It is often considered more intuitive for humans to adjust than RGB or HEX.' }
      ]}
    />
  );
}
