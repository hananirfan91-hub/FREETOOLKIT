import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Download, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Palette, 
  LayoutTemplate,
  Plus,
  Trash2,
  FileText
} from 'lucide-react';

interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  experience: { id: string; role: string; company: string; startDate: string; endDate: string; description: string }[];
  education: { id: string; degree: string; school: string; year: string }[];
  skills: { id: string; name: string }[];
}

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const [data, setData] = useState<ResumeData>({
    personal: {
      fullName: 'John Doe',
      jobTitle: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      address: 'San Francisco, CA',
      summary: 'Passionate software engineer with 5+ years of experience in building scalable web applications. Strong expertise in React, Node.js, and cloud architecture.'
    },
    experience: [
      { id: '1', role: 'Frontend Developer', company: 'Tech Corp', startDate: 'Jan 2020', endDate: 'Present', description: 'Led the development of a real-time collaborative dashboard.' }
    ],
    education: [
      { id: '1', degree: 'B.S. Computer Science', school: 'University of Technology', year: '2019' }
    ],
    skills: [
      { id: '1', name: 'React.js' }, { id: '2', name: 'TypeScript' }, { id: '3', name: 'Tailwind CSS' }
    ]
  });

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      personal: { ...data.personal, [e.target.name]: e.target.value }
    });
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsGenerating(true);
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [...data.experience, { id: Date.now().toString(), role: '', company: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setData({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    setData({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { id: Date.now().toString(), degree: '', school: '', year: '' }]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData({
      ...data,
      education: data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const removeEducation = (id: string) => {
    setData({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    setData({
      ...data,
      skills: [...data.skills, { id: Date.now().toString(), name: 'New Skill' }]
    });
  };

  const updateSkill = (id: string, value: string) => {
    setData({
      ...data,
      skills: data.skills.map(skill => skill.id === id ? { ...skill, name: value } : skill)
    });
  };

  const removeSkill = (id: string) => {
    setData({
      ...data,
      skills: data.skills.filter(skill => skill.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <Helmet>
        <title>Free Resume Builder | FreeToolKit</title>
        <meta name="description" content="Create a professional, ATS-friendly resume in minutes. Download as PDF instantly. 100% free and client-side." />
      </Helmet>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-4">
          <FileText className="w-8 h-8 text-indigo-600" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Modern Resume Builder
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 max-w-2xl mx-auto">
          Build a beautiful, professional resume that gets you hired. Data stays on your device.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left panel - Editor */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-[800px]">
            {/* Tabs */}
            <div className="flex bg-slate-50 p-2 gap-2 overflow-x-auto no-scrollbar border-b border-slate-100">
              <button onClick={() => setActiveTab('personal')} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'personal' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
                <User className="w-4 h-4" /> Personal
              </button>
              <button onClick={() => setActiveTab('experience')} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'experience' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
                <Briefcase className="w-4 h-4" /> Experience
              </button>
              <button onClick={() => setActiveTab('education')} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'education' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
                <GraduationCap className="w-4 h-4" /> Education
              </button>
              <button onClick={() => setActiveTab('skills')} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'skills' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
                <Wrench className="w-4 h-4" /> Skills
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'personal' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                      <input type="text" name="fullName" value={data.personal.fullName} onChange={handlePersonalChange} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Title</label>
                      <input type="text" name="jobTitle" value={data.personal.jobTitle} onChange={handlePersonalChange} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                      <input type="email" name="email" value={data.personal.email} onChange={handlePersonalChange} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</label>
                      <input type="text" name="phone" value={data.personal.phone} onChange={handlePersonalChange} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Address / Location</label>
                    <input type="text" name="address" value={data.personal.address} onChange={handlePersonalChange} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Professional Summary</label>
                    <textarea name="summary" value={data.personal.summary} onChange={handlePersonalChange} rows={4} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 transition-all resize-none"></textarea>
                  </div>
                </motion.div>
              )}

              {activeTab === 'experience' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl relative group">
                      <button onClick={() => removeExperience(exp.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Role/Title</label>
                          <input type="text" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Company</label>
                          <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Start Date</label>
                          <input type="text" value={exp.startDate} placeholder="e.g. Jan 2020" onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">End Date</label>
                          <input type="text" value={exp.endDate} placeholder="e.g. Present" onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                        <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={3} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm resize-none"></textarea>
                      </div>
                    </div>
                  ))}
                  <button onClick={addExperience} className="w-full py-4 border-2 border-dashed border-indigo-200 rounded-2xl text-indigo-600 font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                    <Plus className="w-5 h-5" /> Add Employment
                  </button>
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl relative group">
                      <button onClick={() => removeEducation(edu.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Degree/Course</label>
                          <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">School</label>
                          <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Graduation Year</label>
                        <input type="text" value={edu.year} placeholder="e.g. 2022" onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEducation} className="w-full py-4 border-2 border-dashed border-indigo-200 rounded-2xl text-indigo-600 font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                    <Plus className="w-5 h-5" /> Add Education
                  </button>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-2">
                        <input 
                          type="text" 
                          value={skill.name} 
                          onChange={(e) => updateSkill(skill.id, e.target.value)}
                          className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-24 text-slate-800"
                        />
                        <button onClick={() => removeSkill(skill.id)} className="text-slate-400 hover:text-red-500 text-lg leading-none">&times;</button>
                      </div>
                    ))}
                    <button onClick={addSkill} className="flex items-center gap-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full px-4 py-2 text-sm font-semibold hover:bg-indigo-100 transition-colors">
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="w-full lg:w-1/2 flex flex-col h-[800px]">
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="text-xl font-bold text-slate-800">Live Preview</h2>
              <button 
                onClick={downloadPDF}
                disabled={isGenerating}
                className={`flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isGenerating ? (
                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
            
            <div className="flex-1 bg-slate-200 rounded-3xl p-6 overflow-y-auto no-scrollbar shadow-inner drop-shadow-sm flex justify-center">
              {/* Actual A4 Sized Preview Wrapper */}
              <div 
                ref={resumeRef}
                className="bg-white shadow-xl shadow-slate-300 w-[210mm] max-w-full flex-shrink-0 origin-top "
                style={{ minHeight: '297mm', padding: '12mm' }}
              >
                {/* PDF CSS Design */}
                <div className="border-b-2 border-slate-800 pb-6 mb-6">
                  <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-1">{data.personal.fullName || 'FULL NAME'}</h1>
                  <h2 className="text-xl font-semibold text-indigo-600 tracking-wide mb-3">{data.personal.jobTitle || 'Job Title'}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 font-medium">
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.email && data.personal.phone && <span>•</span>}
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.address && <span>•</span>}
                    {data.personal.address && <span>{data.personal.address}</span>}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-slate-700 leading-relaxed font-serif">
                    {data.personal.summary || 'Your professional summary.'}
                  </p>
                </div>

                {data.experience.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">Experience</h3>
                    <div className="space-y-4">
                      {data.experience.map(exp => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="text-base font-bold text-slate-800">{exp.role || 'Role'}</h4>
                            <span className="text-xs font-semibold text-slate-500">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <div className="text-sm font-medium text-indigo-600 mb-1.5">{exp.company || 'Company'}</div>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">Education</h3>
                    <div className="space-y-3">
                      {data.education.map(edu => (
                        <div key={edu.id} className="flex justify-between items-baseline">
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">{edu.degree || 'Degree'}</h4>
                            <div className="text-xs text-slate-600">{edu.school || 'School'}</div>
                          </div>
                          <span className="text-xs font-semibold text-slate-500">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">Technical Skills</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {data.skills.map(skill => (
                        <span key={skill.id} className="text-sm text-slate-700">• {skill.name}</span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Informative Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-sans">Build an ATS-Friendly Resume in Minutes</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-600 mb-4 leading-relaxed font-sans">
                Our free, professional resume builder provides the exact structure that modern Applicant Tracking Systems (ATS) and recruiters look for. Enter your details into our easy-to-use editor, and instantly preview how it will look. You don’t need to fiddle with Word documents or battle with page margins ever again.
              </p>
              <h3 className="text-xl font-bold text-slate-800 mb-3 mt-8 font-sans">Why use this builder?</h3>
              <ul className="space-y-3 text-slate-600 mb-4 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span> <strong>100% Free:</strong> No hidden paywalls right before you download.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span> <strong>Privacy First:</strong> Your personal data is rendered locally in your web browser. None of your data—experience, contacts, or summary—is uploaded or stored on our servers.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span> <strong>Instant Download:</strong> Generate a clean, high-resolution PDF with the click of a button.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span> <strong>Professional Layout:</strong> Uses simple, elegant, data-dense layouts preferred by top industry recruiters.
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-sans">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Tips for a Winning Resume</h3>
              <p className="text-slate-600 text-sm mb-3">
                <strong>1. Keep it relevant:</strong> Only include experience that highlights skills requested in the job description.
              </p>
              <p className="text-slate-600 text-sm mb-3">
                <strong>2. Use metrics:</strong> Instead of "improved performance," use "accelerated data processing by 40%."
              </p>
              <p className="text-slate-600 text-sm mb-3">
                <strong>3. Write a sharp summary:</strong> Hook the recruiter in 3 lines. Emphasize what value you bring to the company immediately.
              </p>
              <p className="text-slate-600 text-sm">
                <strong>4. Proofread:</strong> The simplest mistakes can cost you an interview. Double-check your spelling and dates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
