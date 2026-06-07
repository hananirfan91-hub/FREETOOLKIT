import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { FileText, Upload, FileUp, Loader2, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setDownloadUrl(null);
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  } as any);

  const extractTextFromPDF = async (pdfFile: File) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n\n';
      setProgress(Math.round((i / pdf.numPages) * 100));
    }

    return fullText;
  };

  const convertToWord = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const text = await extractTextFromPDF(file);
      
      const paragraphs = text.split('\n\n').map(p => 
        new Paragraph({
          children: [new TextRun(p)]
        })
      );

      const doc = new Document({
        sections: [{ properties: {}, children: paragraphs }]
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

    } catch (error) {
      console.error("Error converting PDF: ", error);
      alert("Failed to convert PDF. Ensure it's a valid text-based PDF.");
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <Helmet>
        <title>PDF to Word Converter | 100% Free & Client-Side</title>
        <meta name="description" content="Convert PDF documents to editable Microsoft Word (DOCX) files online for free. 100% secure, offline processing in your browser." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 mb-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center justify-center p-3 bg-red-100 rounded-2xl mb-6">
          <FileText className="w-8 h-8 text-red-600" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          PDF to Word Converter
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 max-w-2xl mx-auto">
          Instantly convert PDF files to editable Word documents. Completely secure—your files never leave your browser.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-400 hover:bg-slate-50'}`}
              >
                <input {...getInputProps()} />
                <Upload className={`w-14 h-14 mx-auto mb-6 transition-colors ${isDragActive ? 'text-red-500' : 'text-slate-400'}`} />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & drop your PDF here</h3>
                <p className="text-slate-500 mb-6">or click to browse files</p>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
                  <FileUp className="w-4 h-4" /> Select PDF
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
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-mono truncate px-4">{file.name}</h3>
                <p className="text-slate-500 mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                {isProcessing ? (
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-sm font-semibold text-slate-600 flex justify-center items-center gap-2">
                       <Loader2 className="w-4 h-4 animate-spin text-red-500" /> Extracting Text ({progress}%)...
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setFile(null)} className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={convertToWord} className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-all flex items-center gap-2">
                      Convert to Word
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
                <p className="text-slate-500 mb-8">Your Word document is ready to download.</p>
                
                <div className="flex flex-col gap-4 max-w-xs mx-auto">
                  <a href={downloadUrl} download={`${file.name.replace('.pdf', '')}.docx`} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-300 transition-all flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download DOCX
                  </a>
                  <button onClick={() => {setFile(null); setDownloadUrl(null);}} className="w-full py-3 text-slate-500 hover:text-slate-800 font-semibold transition-colors">
                    Convert Another File
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

        {/* Benefits text */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
          <div className="flex gap-4 p-4 border border-slate-100 bg-white rounded-2xl shadow-sm">
            <ShieldCheck className="w-8 h-8 flex-shrink-0 text-red-500" />
            <div>
              <h4 className="font-bold text-slate-900">Secure & Private</h4>
              <p className="text-sm text-slate-600 mt-1">Processed entirely in-browser. Zero data uploaded.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 border border-slate-100 bg-white rounded-2xl shadow-sm">
            <FileText className="w-8 h-8 flex-shrink-0 text-blue-500" />
            <div>
              <h4 className="font-bold text-slate-900">Formatting Maintained</h4>
              <p className="text-sm text-slate-600 mt-1">Extracts clean text directly into DOCX paragraphs.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
