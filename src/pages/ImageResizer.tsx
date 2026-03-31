import React, { useState, useRef, useEffect } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import { Crop, Upload, Download, Settings, Maximize, ShieldCheck, Zap } from 'lucide-react';

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
        setResizedUrl(null);
        
        const img = new Image();
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    setWidth(newWidth);
    if (maintainAspectRatio && originalWidth > 0) {
      setHeight(Math.round((newWidth / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight);
    if (maintainAspectRatio && originalHeight > 0) {
      setWidth(Math.round((newHeight / originalHeight) * originalWidth));
    }
  };

  const resizeImage = () => {
    if (!previewUrl || width <= 0 || height <= 0) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Use better interpolation if supported
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, width, height);
      
      const dataUrl = canvas.toDataURL(selectedFile?.type || 'image/jpeg', 0.9);
      setResizedUrl(dataUrl);
    };
    img.src = previewUrl;
  };

  const toolContent = (
    <div className="space-y-8">
      {!previewUrl ? (
        <div 
          className="border-2 border-dashed border-green-300 rounded-2xl p-16 text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer bg-slate-50 group"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload an Image</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Drag and drop your image here or click to browse files. Supports JPEG, PNG, and WebP.</p>
          <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center gap-2 mx-auto">
            <Crop className="w-5 h-5" />
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
                <Settings className="w-5 h-5 text-green-600" />
                Resize Dimensions
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Width (px)</label>
                    <input 
                      type="number" 
                      value={width || ''} 
                      onChange={handleWidthChange}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-mono text-lg transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Height (px)</label>
                    <input 
                      type="number" 
                      value={height || ''} 
                      onChange={handleHeightChange}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-mono text-lg transition-all" 
                    />
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-4 rounded-xl border border-slate-200 mt-2">
                  <input 
                    type="checkbox" 
                    id="aspect" 
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500 cursor-pointer" 
                  />
                  <label htmlFor="aspect" className="ml-3 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                    Maintain aspect ratio
                  </label>
                </div>

                <button 
                  onClick={resizeImage}
                  className="w-full bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 mt-6"
                >
                  <Crop className="w-5 h-5" />
                  Resize Image
                </button>
                <button 
                  onClick={() => { setPreviewUrl(null); setResizedUrl(null); setSelectedFile(null); }}
                  className="w-full bg-white text-slate-600 border border-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all mt-2"
                >
                  Upload Different Image
                </button>
              </div>
            </div>

            {resizedUrl && (
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Ready to Download
                </h3>
                <a 
                  href={resizedUrl} 
                  download={`resized_${width}x${height}_${selectedFile?.name || 'image.jpg'}`}
                  className="w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Resized Image
                </a>
              </div>
            )}
          </div>

          <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center min-h-[400px] relative">
            <img 
              src={resizedUrl || previewUrl} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              {resizedUrl ? `${width} x ${height} px` : `${originalWidth} x ${originalHeight} px (Original)`}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolPageLayout
      title="Free Image Resizer Online - Resize Photos Quickly"
      description="Resize images online for free. Change dimensions of JPG, PNG, and WebP files easily. 100% client-side, secure photo resizer tool for social media and web."
      keywords="resize image online, free image resizer, photo resizer free, change image dimensions, resize picture"
      heading="Free Image Resizer"
      subheading="Change image dimensions quickly and easily for web and social media. 100% secure client-side processing."
      theme={{
        primary: 'bg-green-600',
        light: 'bg-green-100',
        text: 'text-green-600',
        gradient: 'from-green-900 to-slate-900'
      }}
      seoIntro={
        <>
          <p className="mb-4">
            Have you ever tried to upload a profile picture only to be told the dimensions are wrong? Or maybe you need to fit a large photograph into a specific layout on your blog. Our free tool lets you resize images in seconds without losing quality, solving these common frustrations instantly.
          </p>
          <p>
            Using this utility, you can easily scale your images up or down while maintaining the original aspect ratio to prevent distortion. Because the resizing process happens entirely within your web browser, your photos are never uploaded to a remote server. This ensures complete privacy for your personal images and provides lightning-fast performance. Resize your JPEGs, PNGs, and WebP files instantly with no signup required.
          </p>
        </>
      }
      toolContent={toolContent}
      features={[
        { title: '100% Client-Side', description: 'Your images are resized directly in your browser. They are never uploaded to our servers, ensuring absolute privacy.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Aspect Ratio Lock', description: 'Easily maintain the original aspect ratio to prevent your images from stretching or distorting.', icon: <Maximize className="w-6 h-6" /> },
        { title: 'High Quality', description: 'Advanced browser-based interpolation ensures your resized images look crisp and professional.', icon: <Zap className="w-6 h-6" /> }
      ]}
      howToSteps={[
        { title: 'Upload Image', description: 'Click the upload area or drag and drop your image files (JPEG, PNG, WebP).' },
        { title: 'Set Dimensions', description: 'Enter your desired width and height in pixels. Check "Maintain aspect ratio" to avoid distortion.' },
        { title: 'Resize & Download', description: 'Click "Resize Image" and instantly download your perfectly sized photo.' }
      ]}
      benefits={[
        { title: 'Social Media Ready', description: 'Quickly adjust your photos to fit Instagram, Facebook, Twitter, and LinkedIn dimension requirements.' },
        { title: 'Faster Websites', description: 'Serving correctly sized images improves your website\'s load time and Core Web Vitals.' },
        { title: 'Save Bandwidth', description: 'Stop sending massive 4K photos when a smaller 800px image is all that\'s needed.' },
        { title: 'Absolute Privacy', description: 'Since everything runs locally, you can safely resize personal or sensitive photos.' }
      ]}
      faqs={[
        { question: 'Is the image resizer free to use?', answer: 'Yes! Our image resizer is completely free. You can resize as many images as you need without any cost.' },
        { question: 'What image formats are supported?', answer: 'We support all major image formats including JPG, PNG, and WebP.' },
        { question: 'Will resizing affect image quality?', answer: 'Making an image smaller usually maintains quality perfectly. Enlarging an image significantly may cause pixelation, but our advanced algorithms minimize quality loss.' }
      ]}
    />
  );
}
