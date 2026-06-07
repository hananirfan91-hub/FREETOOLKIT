import React, { useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import mammoth from 'mammoth';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FileDown, Upload, FileUp, Loader2, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setDownloadUrl(null);
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] 
    },
    maxFiles: 1
  } as any);

  const convertToPDF = async () => {
    if (!file || !previewRef.current) return;
    setIsProcessing(true);
    setProgress(10);
    
    try {
      // 1. Read the DOCX file
      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);

      // 2. Convert to HTML using Mammoth
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value; // The generated HTML
      setProgress(60);

      // 3. Render the HTML into the hidden preview div
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = htmlContent;
      
      // Apply some basic styling to make it look like a document
      contentDiv.style.width = '210mm'; // A4 width
      contentDiv.style.minHeight = '297mm'; // A4 height
      contentDiv.style.padding = '20mm';
      contentDiv.style.backgroundColor = 'white';
      contentDiv.style.color = 'black';
      contentDiv.style.fontFamily = 'Arial, sans-serif';
      contentDiv.style.fontSize = '12pt';
      contentDiv.style.lineHeight = '1.5';
      
      // Append temporarily to the DOM to render it using html2canvas
      previewRef.current.innerHTML = '';
      previewRef.current.appendChild(contentDiv);
      setProgress(80);

      // Give it a tiny moment to render in the DOM
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Use HTML2Canvas to capture it
      const canvas = await html2canvas(contentDiv, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      // 5. Generate PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setProgress(100);

      // Clean up the DOM
      previewRef.current.innerHTML = '';
      
    } catch (error) {
      console.error("Error converting Word to PDF: ", error);
      alert("Failed to convert Word file. Please try another file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <Helmet>
        <title>Word to PDF Converter | FreeToolKit</title>
        <meta name="description" content="Convert Word documents (DOCX) to PDF online for free. 100% secure, offline processing in your browser." />
      </Helmet>

      {/* Hidden Div for rendering HTML to Canvas */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -100, pointerEvents: 'none' }} 
      >
        <div ref={previewRef} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 mb-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-6">
          <FileDown className="w-8 h-8 text-blue-600" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Word to PDF Converter
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 max-w-2xl mx-auto">
          Instantly convert Word documents (DOCX) to PDF. Completely secure—your files are processed locally.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                {...getRootProps()} 
                className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`}
              >
                <input {...getInputProps()} />
                <Upload className={`w-14 h-14 mx-auto mb-6 transition-colors ${isDragActive ? 'text-blue-500' : 'text-slate-400'}`} />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & drop your DOCX here</h3>
                <p className="text-slate-500 mb-6">or click to browse files</p>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
                  <FileUp className="w-4 h-4" /> Select Word Document
                </span>
              </motion.div>
            ) : !downloadUrl ? (
              <motion.div 
                key="processing"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileDown className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-mono truncate px-4">{file.name}</h3>
                <p className="text-slate-500 mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                {isProcessing ? (
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-sm font-semibold text-slate-600 flex justify-center items-center gap-2">
                       <Loader2 className="w-4 h-4 animate-spin text-blue-500" /> Converting to PDF...
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setFile(null)} className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={convertToPDF} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                      Convert to PDF
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="absolute inset-0 rounded-full border-4 border-white animate-ping opacity-20"></span>
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Conversion Complete!</h3>
                <p className="text-slate-500 mb-8">Your PDF document is ready to download.</p>
                
                <div className="flex flex-col gap-4 max-w-xs mx-auto">
                  <a href={downloadUrl} download={`${file.name.replace('.docx', '')}.pdf`} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-300 transition-all flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download PDF
                  </a>
                  <button onClick={() => {setFile(null); setDownloadUrl(null);}} className="w-full py-3 text-slate-500 hover:text-slate-800 font-semibold transition-colors">
                    Convert Another File
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Informative Content for SEO */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Convert Word files (DOCX) to PDF Online</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Converting your Microsoft Word documents into portable PDFs has never been easier, and securely executing this inside your own web browser means zero delays and absolute privacy. Here is how our free tool converts your DOCX files to PDF almost instantly:
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-slate-600 mb-8">
          <li><strong>Upload your DOCX file</strong> by dragging and dropping it into the designated box above.</li>
          <li>Click the <strong>"Convert to PDF"</strong> button.</li>
          <li>Our advanced in-browser engine parses your Word document and reconstructs it visually in memory.</li>
          <li>Once processed, click <strong>"Download PDF"</strong> to save the generated document to your device.</li>
        </ol>

        <h3 className="text-xl font-bold text-slate-900 mb-3">Why Use Our Word to PDF Converter?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Traditional file converters mandate that you upload your sensitive resumes, contracts, or personal essays to a remote server. Our client-side Word to PDF tool completely transforms that workflow. Since it uses your own CPU to process the file, your content never traverses the internet, meaning unparalleled security.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Additionally, this is a 100% free service with no signup barriers, no watermarks, and no file-size limits.
        </p>
      </div>

    </div>
  );
}
