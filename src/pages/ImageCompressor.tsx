import React, { useState, useRef } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Image as ImageIcon, Upload, Download, Settings, Zap, ShieldCheck, Maximize } from 'lucide-react';

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
        setCompressedUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!previewUrl) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      
      // Compress to JPEG with selected quality
      const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedUrl(dataUrl);
      
      // Calculate approximate size of base64 string
      const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
      const padding = (dataUrl.charAt(dataUrl.length - 2) === '=') ? 2 : ((dataUrl.charAt(dataUrl.length - 1) === '=') ? 1 : 0);
      setCompressedSize((base64Length * 0.75) - padding);
    };
    img.src = previewUrl;
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const toolContent = (
    <div className="space-y-8">
      {!previewUrl ? (
        <div 
          className="border-2 border-dashed border-blue-300 rounded-2xl p-16 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer bg-slate-50 group"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload an Image</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Drag and drop your image here or click to browse files. Supports JPEG, PNG, and WebP.</p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 mx-auto">
            <ImageIcon className="w-5 h-5" />
            Select Image
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/jpeg, image/png, image/webp" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Compression Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">Quality: {quality}%</label>
                    <span className="text-sm text-slate-500">{quality < 50 ? 'Low' : quality < 80 ? 'Medium' : 'High'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={quality} 
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <button 
                  onClick={compressImage}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-6"
                >
                  <Zap className="w-5 h-5" />
                  Compress Now
                </button>
                <button 
                  onClick={() => { setPreviewUrl(null); setCompressedUrl(null); setSelectedFile(null); }}
                  className="w-full bg-white text-slate-600 border border-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all mt-2"
                >
                  Upload Different Image
                </button>
              </div>
            </div>

            {compressedUrl && (
              <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  Compression Results
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl border border-green-100">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Original Size</p>
                    <p className="text-xl font-bold text-slate-900">{formatBytes(originalSize)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-green-100">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">New Size</p>
                    <p className="text-xl font-bold text-green-600">{formatBytes(compressedSize)}</p>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-sm font-semibold py-2 px-4 rounded-lg text-center mb-6">
                  Saved {formatBytes(originalSize - compressedSize)} ({Math.round(((originalSize - compressedSize) / originalSize) * 100)}%)
                </div>
                <a 
                  href={compressedUrl} 
                  download={`compressed_${selectedFile?.name || 'image.jpg'}`}
                  className="w-full bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Compressed Image
                </a>
              </div>
            )}
          </div>

          <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center min-h-[400px] relative">
            <img 
              src={compressedUrl || previewUrl} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              {compressedUrl ? 'Compressed Preview' : 'Original Preview'}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolPageLayout
      title="Free Image Compressor Online - Reduce Image Size Without Losing Quality"
      description="Compress JPEG, PNG, and WebP images online for free. Reduce image file size instantly without losing quality. 100% client-side, secure image compressor."
      keywords="compress image online free, free image compressor, reduce image size, compress jpeg, compress png, image optimizer free"
      heading="Free Image Compressor"
      subheading="Reduce image file size instantly without losing quality. 100% secure client-side processing."
      theme={{
        primary: 'bg-blue-600',
        light: 'bg-blue-100',
        text: 'text-blue-600',
        gradient: 'from-blue-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Need to <strong>compress image online free</strong>? Large, unoptimized images are the number one cause of slow website loading times, which can severely hurt your SEO rankings and user experience. Our free online image compressor solves this problem instantly.
          </p>
          <p>
            With our <strong>compress image online free</strong> tool, you can drastically reduce the file size of your JPEGs, PNGs, and WebP images without noticeable quality loss. Best of all, unlike other services that upload your personal photos to their servers, our tool uses your browser's native Canvas API to compress images entirely locally. This guarantees 100% privacy, zero upload wait times, and no file size limits. Optimize your images for web, email, or social media today without creating an account.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: '100% Client-Side', description: 'Your images are compressed directly in your browser. They are never uploaded to our servers, ensuring absolute privacy.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Lossy Compression', description: 'Advanced algorithms reduce file size significantly while maintaining excellent visual quality.', icon: <Zap className="w-6 h-6" /> },
        { title: 'Fast Processing', description: 'No waiting for uploads or downloads. The compression happens instantly using your device\'s processing power.', icon: <ImageIcon className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Upload Image', description: 'Click the upload area or drag and drop your image files (JPEG, PNG, WebP).' },
        { title: 'Adjust Quality', description: 'Select your desired compression level using the slider (lower quality = smaller file size).' },
        { title: 'Compress & Download', description: 'Click "Compress Now" and instantly download your optimized image.' }
      ]}
      benefits={[
        { title: 'Faster Websites', description: 'Optimized images load faster, improving your website\'s user experience and SEO rankings.' },
        { title: 'Save Storage', description: 'Free up valuable space on your hard drive, phone, or cloud storage by reducing image sizes.' },
        { title: 'Easy Sharing', description: 'Smaller images are easier to attach to emails and share on social media platforms.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can safely compress personal or sensitive photos.' }
      ]}
      faqs={[
        { question: 'Is this image compressor really free?', answer: 'Yes, our image compressor is 100% free to use. There are no hidden fees, no subscriptions, and no watermarks added to your images.' },
        { question: 'Will my images lose quality?', answer: 'We use smart lossy compression techniques to reduce the file size of your images while keeping the visual quality intact. You can adjust the quality slider to find the perfect balance.' },
        { question: 'Are my uploaded images secure?', answer: 'Absolutely. All image processing happens securely in your browser. We do not store or even receive your images on our servers.' }
      ]}
    />
  );
}
