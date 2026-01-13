import React, { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle, Loader } from 'lucide-react';

interface PhaseUploadProps {
    projectData: { file: File | null; content: string; name: string; org: string };
    setProjectData: (data: any) => void;
    onFileProcessed: (ready: boolean) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PhaseUpload({ projectData, setProjectData, onFileProcessed, onNext, onBack }: PhaseUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewText, setPreviewText] = useState<string>(
        projectData.content ? projectData.content.substring(0, 200) + '...' : ''
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = async (file: File) => {
        if (file.type !== 'application/pdf') {
            alert('❌ กรุณาอัปโหลดไฟล์ PDF เท่านั้น');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            alert('❌ ไฟล์ต้องมีขนาดไม่เกิน 20 MB');
            return;
        }

        setIsProcessing(true);
        setPreviewText('กำลังอ่านไฟล์ PDF...');

        try {
            // Dynamic import for client-side execution only
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n';
            }

            setProjectData({ ...projectData, file: file, content: fullText });

            const preview = fullText.trim().substring(0, 200) + (fullText.length > 200 ? '...' : '');
            setPreviewText(preview || 'ไม่สามารถแสดงตัวอย่างได้ (PDF อาจเป็นรูปภาพ)');

            onFileProcessed(true);
        } catch (error: any) {
            console.error('PDF Error:', error);
            alert('❌ ไม่สามารถอ่านไฟล์ PDF ได้: ' + error.message);
            setPreviewText('เกิดข้อผิดพลาดในการอ่านไฟล์');
            onFileProcessed(false);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files?.[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-md animate-fade-in max-w-4xl mx-auto">
            <div className="text-2xl font-semibold mb-6 flex items-center gap-3 text-primary-dark">
                <span>&#128203;</span> อัปโหลดข้อเสนอโครงการ
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block font-medium mb-2 text-text-primary">ชื่อโครงการ (ถ้ามี)</label>
                    <input
                        type="text"
                        value={projectData.name}
                        onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                        placeholder="ระบุชื่อโครงการ (ไม่บังคับ)"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2 text-text-primary">หน่วยงาน (ถ้ามี)</label>
                    <input
                        type="text"
                        value={projectData.org}
                        onChange={(e) => setProjectData({ ...projectData, org: e.target.value })}
                        placeholder="ระบุหน่วยงาน (ไม่บังคับ)"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2 text-text-primary">อัปโหลดไฟล์ PDF ข้อเสนอโครงการ *</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf"
                        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                        className="hidden"
                    />

                    {!projectData.file ? (
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                ${isDragOver
                                    ? 'border-primary-blue bg-pastel-blue scale-[1.02]'
                                    : 'border-slate-300 bg-slate-50 hover:border-primary-blue hover:bg-white'}
              `}
                        >
                            <Upload className={`w-16 h-16 mx-auto mb-4 text-primary-blue ${isDragOver ? 'animate-bounce' : ''}`} />
                            <div className="text-xl font-semibold text-primary-dark mb-2">ลากไฟล์ PDF มาวางที่นี่</div>
                            <div className="text-sm text-text-secondary mb-4">หรือ คลิกเพื่อเลือกไฟล์</div>
                            <div className="text-orange-600 font-medium flex items-center justify-center gap-2 bg-orange-50 py-2 px-4 rounded-full inline-block">
                                <AlertCircle size={16} /> รองรับไฟล์ PDF เท่านั้น (ขนาดไม่เกิน 20 MB)
                            </div>
                        </div>
                    ) : (
                        <div className="bg-pastel-green p-6 rounded-xl animate-fade-in relative border border-green-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <FileText className="w-8 h-8 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-primary-dark">{projectData.file.name}</h4>
                                    <p className="text-text-secondary text-sm">{(projectData.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setProjectData({ ...projectData, file: null, content: '' });
                                        onFileProcessed(false);
                                    }}
                                    className="ml-auto bg-white border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
                                >
                                    <X size={18} /> ลบไฟล์
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                <h5 className="font-medium text-primary-dark mb-2 flex items-center gap-2">
                                    {isProcessing ? <Loader className="animate-spin" size={16} /> : <FileText size={16} />}
                                    ตัวอย่างเนื้อหา (200 ตัวอักษรแรก)
                                </h5>
                                <p className="text-text-secondary text-sm leading-relaxed font-mono bg-slate-50 p-4 rounded border border-slate-100">
                                    {isProcessing ? '⏳ กำลังอ่านไฟล์...' : previewText}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-6 justify-center">
                    <button
                        onClick={onBack}
                        className="px-8 py-3 rounded-xl font-bold border-2 border-slate-200 text-text-secondary hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        &#8592; ย้อนกลับ
                    </button>
                    <button
                        onClick={onNext}
                        disabled={!projectData.file || isProcessing}
                        className={`
                    px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-2
                    ${!projectData.file || isProcessing
                                ? 'bg-slate-300 text-white cursor-not-allowed shadow-none'
                                : 'bg-primary-blue text-white hover:bg-primary-dark hover:-translate-y-1'}
                `}
                    >
                        {isProcessing ? '⏳ กำลังประมวลผล...' : 'เริ่มประเมิน \u2192'}
                    </button>
                </div>
            </div>
        </div>
    );
}
