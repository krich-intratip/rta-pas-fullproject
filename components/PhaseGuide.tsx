import React, { useState } from 'react';
import { BookOpen, ChevronDown, CheckCircle, AlertTriangle, Lightbulb, HelpCircle, AlertCircle } from 'lucide-react';

export default function PhaseGuide() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
                <h2 className="text-2xl font-bold text-primary-dark flex items-center gap-3">
                    <BookOpen /> คู่มือการใช้งาน
                </h2>
            </div>

            <div className="space-y-4">
                {/* Step-by-Step */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <div
                        onClick={() => toggleAccordion(0)}
                        className={`p-5 cursor-pointer flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition-colors ${activeAccordion === 0 ? 'bg-pastel-blue text-primary-dark' : 'text-text-primary'}`}
                    >
                        <span>&#128640; วิธีการใช้งาน Step-by-Step</span>
                        <ChevronDown className={`transform transition-transform ${activeAccordion === 0 ? 'rotate-180' : ''}`} />
                    </div>
                    {activeAccordion === 0 && (
                        <div className="p-6 animate-fade-in space-y-4">
                            <h3 className="font-bold text-lg text-primary-dark mb-4">ขั้นตอนการใช้งานระบบ</h3>
                            <div className="bg-pastel-blue p-4 rounded-xl">
                                <strong className="block text-primary-dark mb-1">&#10102; ตั้งค่า AI Provider</strong>
                                <p className="text-text-secondary">เลือก Google Gemini หรือ OpenRouter แล้วใส่ API Key</p>
                            </div>
                            <div className="bg-pastel-green p-4 rounded-xl">
                                <strong className="block text-green-800 mb-1">&#10103; อัปโหลดไฟล์ PDF</strong>
                                <p className="text-text-secondary">ลากไฟล์ PDF ข้อเสนอโครงการมาวาง หรือคลิกเพื่อเลือกไฟล์</p>
                                <p className="mt-2 text-red-600 font-medium text-sm">⚠️ สำคัญ: ไฟล์ต้องเป็น PDF และขนาดไม่เกิน 20 MB</p>
                            </div>
                            <div className="bg-pastel-purple p-4 rounded-xl">
                                <strong className="block text-purple-800 mb-1">&#10104; กดปุ่ม "เริ่มประเมิน"</strong>
                                <p className="text-text-secondary">ระบบจะส่งเนื้อหาไปยัง AI 3 ท่าน พร้อมกัน</p>
                            </div>
                            <div className="bg-pastel-orange p-4 rounded-xl">
                                <strong className="block text-orange-800 mb-1">&#10105; ดูผลการประเมิน</strong>
                                <p className="text-text-secondary">รอประมาณ 2-5 นาที แล้วดูคะแนนและคำแนะนำ</p>
                            </div>
                            <div className="bg-pastel-yellow p-4 rounded-xl">
                                <strong className="block text-orange-900 mb-1">&#10106; Export รายงาน</strong>
                                <p className="text-text-secondary">กดปุ่ม "ดาวน์โหลดรายงาน HTML" เพื่อบันทึกผลลัพธ์</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* PDF Specs */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <div
                        onClick={() => toggleAccordion(1)}
                        className={`p-5 cursor-pointer flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition-colors ${activeAccordion === 1 ? 'bg-pastel-blue text-primary-dark' : 'text-text-primary'}`}
                    >
                        <span>&#128196; ข้อกำหนดไฟล์ PDF</span>
                        <ChevronDown className={`transform transition-transform ${activeAccordion === 1 ? 'rotate-180' : ''}`} />
                    </div>
                    {activeAccordion === 1 && (
                        <div className="p-6 animate-fade-in space-y-6">
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-green-700 flex items-center gap-2 mb-2"><CheckCircle size={18} /> ไฟล์ที่รองรับ</h4>
                                <ul className="list-disc list-inside text-sm text-green-900 space-y-1">
                                    <li>รูปแบบ: <strong>.pdf</strong> เท่านั้น</li>
                                    <li>ขนาด: <strong>ไม่เกิน 20 MB</strong></li>
                                    <li>ภาษา: รองรับ <strong>ภาษาไทย</strong> และ <strong>ภาษาอังกฤษ</strong></li>
                                    <li>จำนวนหน้า: ไม่จำกัด</li>
                                </ul>
                            </div>

                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-orange-700 flex items-center gap-2 mb-2"><AlertTriangle size={18} /> ข้อจำกัด</h4>
                                <ul className="list-disc list-inside text-sm text-orange-900 space-y-1">
                                    <li>ไม่รองรับ Word (.docx), PowerPoint (.pptx)</li>
                                    <li>ไม่รองรับ PDF ที่มีรหัสผ่าน</li>
                                    <li>ไม่รองรับ PDF ที่เป็นรูปภาพทั้งหมด (scan)</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2"><Lightbulb size={18} /> เคล็ดลับ</h4>
                                <p className="text-sm text-yellow-900 mb-2">ถ้า PDF ของคุณเป็นไฟล์ขนาดใหญ่ ({'>'}20 MB):</p>
                                <ul className="list-disc list-inside text-sm text-yellow-900 space-y-1">
                                    <li>ลองบีบอัดด้วย <strong>Adobe Acrobat</strong> หรือ <strong>iLovePDF</strong></li>
                                    <li>ลดคุณภาพรูปภาพในเอกสาร</li>
                                    <li>แยกเอาเฉพาะส่วนที่สำคัญ</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* AI Providers Info */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <div
                        onClick={() => toggleAccordion(2)}
                        className={`p-5 cursor-pointer flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition-colors ${activeAccordion === 2 ? 'bg-pastel-blue text-primary-dark' : 'text-text-primary'}`}
                    >
                        <span>&#129302; AI Providers คืออะไร?</span>
                        <ChevronDown className={`transform transition-transform ${activeAccordion === 2 ? 'rotate-180' : ''}`} />
                    </div>
                    {activeAccordion === 2 && (
                        <div className="p-6 animate-fade-in space-y-6">
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-yellow-800 mb-2">Google Gemini (4 models)</h4>
                                <p className="text-sm text-yellow-900 mb-1"><strong>ข้อดี:</strong> เร็ว, รองรับภาษาไทยดี, มี quota ฟรี</p>
                                <p className="text-sm text-yellow-900 mb-2"><strong>ข้อเสีย:</strong> จำกัด API calls ต่อวัน</p>
                                <ul className="list-disc list-inside text-sm text-yellow-900 ml-2">
                                    <li>Gemini 2.5 Flash (แนะนำ)</li>
                                    <li>Gemini 2.5 Pro (Thinking)</li>
                                    <li>Gemini 2.5 Flash-Lite</li>
                                    <li>Gemini 2.0 Flash</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-green-700 mb-2">OpenRouter - โมเดลฟรี (14 models)</h4>
                                <p className="text-sm text-green-900 mb-2"><strong>ข้อดี:</strong> ฟรี 100% ไม่มีค่าใช้จ่าย</p>
                                <ul className="text-sm text-green-900 ml-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                                    <li>🔵 DeepSeek R1 / V3 / Distill</li>
                                    <li>🟣 Qwen 3 / 30B</li>
                                    <li>🦙 Llama 4 / 3.3</li>
                                    <li>🟦 Microsoft Phi-4</li>
                                    <li>🟩 NVIDIA Nemotron</li>
                                    <li>🟠 Mistral Small 3.1</li>
                                </ul>
                            </div>

                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-orange-700 mb-2">OpenRouter - โมเดลมีค่าใช้จ่าย (4 models)</h4>
                                <p className="text-sm text-orange-900 mb-2"><strong>ข้อเสีย:</strong> เสียค่าใช้จ่าย (pay-per-use)</p>
                                <ul className="list-disc list-inside text-sm text-orange-900 ml-2">
                                    <li>Claude Sonnet 4 / Haiku 3.5</li>
                                    <li>GPT-4o</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* API Key Guide */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <div
                        onClick={() => toggleAccordion(3)}
                        className={`p-5 cursor-pointer flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition-colors ${activeAccordion === 3 ? 'bg-pastel-blue text-primary-dark' : 'text-text-primary'}`}
                    >
                        <span>&#128273; วิธีขอ API Key</span>
                        <ChevronDown className={`transform transition-transform ${activeAccordion === 3 ? 'rotate-180' : ''}`} />
                    </div>
                    {activeAccordion === 3 && (
                        <div className="p-6 animate-fade-in space-y-8">
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-3">Google Gemini API Key</h3>
                                <ol className="list-decimal pl-5 space-y-2 text-text-secondary">
                                    <li>เข้าไปที่ <a href="https://ai.google.dev/" target="_blank" className="text-primary-blue underline">https://ai.google.dev/</a></li>
                                    <li>คลิก "Get API Key in Google AI Studio"</li>
                                    <li>เลือก "Create API key" หรือใช้ key เดิม</li>
                                    <li>คัดลอก API Key แล้วนำมาวางในระบบ</li>
                                </ol>
                                <div className="mt-3 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm inline-block">
                                    <strong>⚠️ คำเตือน:</strong> อย่าแชร์ API Key ของคุณกับผู้อื่น
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-3">OpenRouter API Key</h3>
                                <ol className="list-decimal pl-5 space-y-2 text-text-secondary">
                                    <li>เข้าไปที่ <a href="https://openrouter.ai/" target="_blank" className="text-primary-blue underline">https://openrouter.ai/</a></li>
                                    <li>สมัครบัญชี (Login) แล้วไปที่ "Keys"</li>
                                    <li>คลิก "Create new key"</li>
                                    <li>คัดลอก API Key แล้วเติมเครดิต (ขั้นต่ำ $5) หากต้องการใช้โมเดลเสียเงิน</li>
                                </ol>
                            </div>
                        </div>
                    )}
                </div>

                {/* Criteria */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <div
                        onClick={() => toggleAccordion(4)}
                        className={`p-5 cursor-pointer flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition-colors ${activeAccordion === 4 ? 'bg-pastel-blue text-primary-dark' : 'text-text-primary'}`}
                    >
                        <span>&#128200; เกณฑ์การประเมิน 4 ด้าน</span>
                        <ChevronDown className={`transform transition-transform ${activeAccordion === 4 ? 'rotate-180' : ''}`} />
                    </div>
                    {activeAccordion === 4 && (
                        <div className="p-6 animate-fade-in">
                            <h3 className="font-bold text-lg text-primary-dark mb-4">เกณฑ์มาตรฐาน กวป.ทบ.</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-pastel-blue p-4 rounded-xl text-center">
                                    <h4 className="font-semibold text-primary-dark mb-2">ความมีประโยชน์</h4>
                                    <div className="text-3xl font-bold text-primary-blue">60</div>
                                    <p className="text-xs text-slate-500">น้ำหนัก 60%</p>
                                </div>
                                <div className="bg-pastel-green p-4 rounded-xl text-center">
                                    <h4 className="font-semibold text-green-800 mb-2">ความเป็นไปได้</h4>
                                    <div className="text-3xl font-bold text-green-600">20</div>
                                    <p className="text-xs text-slate-500">น้ำหนัก 20%</p>
                                </div>
                                <div className="bg-pastel-purple p-4 rounded-xl text-center">
                                    <h4 className="font-semibold text-purple-800 mb-2">ความถูกต้อง</h4>
                                    <div className="text-3xl font-bold text-purple-600">10</div>
                                    <p className="text-xs text-slate-500">น้ำหนัก 10%</p>
                                </div>
                                <div className="bg-pastel-orange p-4 rounded-xl text-center">
                                    <h4 className="font-semibold text-orange-800 mb-2">ความคุ้มค่า</h4>
                                    <div className="text-3xl font-bold text-orange-600">10</div>
                                    <p className="text-xs text-slate-500">น้ำหนัก 10%</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-green-700 mb-2">เกณฑ์ผ่าน</h4>
                                <ul className="space-y-1 text-sm text-green-900">
                                    <li><strong>81-100 คะแนน:</strong> ดีมาก (อนุมัติ)</li>
                                    <li><strong>71-80 คะแนน:</strong> ดี (อนุมัติมีเงื่อนไข)</li>
                                    <li><strong>50-70 คะแนน:</strong> ควรปรับปรุง (แก้ไขส่งใหม่)</li>
                                    <li><strong>ต่ำกว่า 50:</strong> พอใช้ (ไม่อนุมัติ)</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <div
                        onClick={() => toggleAccordion(5)}
                        className={`p-5 cursor-pointer flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition-colors ${activeAccordion === 5 ? 'bg-pastel-blue text-primary-dark' : 'text-text-primary'}`}
                    >
                        <span>&#10067; คำถามที่พบบ่อย (FAQ)</span>
                        <ChevronDown className={`transform transition-transform ${activeAccordion === 5 ? 'rotate-180' : ''}`} />
                    </div>
                    {activeAccordion === 5 && (
                        <div className="p-6 animate-fade-in space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-primary-dark mb-1">Q: ทำไมต้อง Upload PDF ไม่ให้กรอกข้อความ?</h4>
                                <p className="text-sm text-text-secondary">A: เพื่อให้ AI วิเคราะห์จากเอกสารต้นฉบับจริง ครบถ้วน และแม่นยำที่สุด</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-primary-dark mb-1">Q: PDF ที่ Scan มาเป็นรูปภาพใช้ได้ไหม?</h4>
                                <p className="text-sm text-text-secondary">A: ระบบจะพยายามอ่าน แต่อาจไม่สมบูรณ์ แนะนำให้ใช้ PDF ที่เป็นข้อความ</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-primary-dark mb-1">Q: ข้อมูลปลอดภัยไหม?</h4>
                                <p className="text-sm text-text-secondary">A: ปลอดภัย ไฟล์ PDF จะอยู่ในเบราว์เซอร์ของคุณเท่านั้น ไม่ถูกเก็บบนเซิร์ฟเวอร์</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-primary-dark mb-1">Q: ใช้เวลานานแค่ไหน?</h4>
                                <p className="text-sm text-text-secondary">A: ประมาณ 2-5 นาที ขึ้นอยู่กับขนาดไฟล์และความเร็ว API</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Troubleshooting */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <div
                        onClick={() => toggleAccordion(6)}
                        className={`p-5 cursor-pointer flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition-colors ${activeAccordion === 6 ? 'bg-pastel-blue text-primary-dark' : 'text-text-primary'}`}
                    >
                        <span>&#128736; แก้ปัญหาเบื้องต้น</span>
                        <ChevronDown className={`transform transition-transform ${activeAccordion === 6 ? 'rotate-180' : ''}`} />
                    </div>
                    {activeAccordion === 6 && (
                        <div className="p-6 animate-fade-in space-y-4">
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-red-700 mb-1">❌ อัปโหลด PDF ไม่ได้</h4>
                                <p className="text-sm text-red-900 mb-2">สาเหตุ: ไฟล์ไม่ใช่ PDF หรือขนาดเกิน 20 MB</p>
                                <ul className="list-disc list-inside text-sm text-red-900">
                                    <li>ตรวจสอบว่าไฟล์เป็น .pdf</li>
                                    <li>ตรวจสอบขนาดไฟล์</li>
                                    <li>ลองบีบอัดไฟล์ให้เล็กลง</li>
                                </ul>
                            </div>
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-red-700 mb-1">❌ ระบบอ่าน PDF ไม่ได้</h4>
                                <p className="text-sm text-red-900 mb-2">สาเหตุ: PDF เป็นรูปภาพ หรือมีการป้องกัน</p>
                                <ul className="list-disc list-inside text-sm text-red-900">
                                    <li>ลองใช้ PDF ที่เป็นข้อความ (ไม่ใช่ scan)</li>
                                    <li>ปลดล็อก PDF ถ้ามีรหัสผ่าน</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <h4 className="font-bold text-green-700 mb-1">📞 ต้องการความช่วยเหลือ?</h4>
                                <p className="text-sm text-green-900">ติดต่อ: <strong>krich.intratip@gmail.com</strong></p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
