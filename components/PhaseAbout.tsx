import React from 'react';
import { Info, Code, ShieldCheck, Target, User, Cpu } from 'lucide-react';

export default function PhaseAbout() {
    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <h2 className="text-2xl font-bold text-primary-dark flex items-center justify-center gap-3 mb-6">
                    <Info /> เกี่ยวกับโปรแกรม
                </h2>

                <div className="py-8">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Emblem_of_the_Royal_Thai_Army.svg/500px-Emblem_of_the_Royal_Thai_Army.svg.png"
                        alt="Royal Thai Army Logo"
                        className="w-48 h-auto mx-auto animate-bounce-slow"
                    />
                    <h2 className="text-2xl font-bold text-primary-blue mt-6">Royal Thai Army Project Assessment System</h2>
                    <p className="text-text-secondary mt-2">ระบบประเมินโครงการวิจัยทางทหาร</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Developer */}
                <div className="bg-gradient-to-br from-pastel-blue to-pastel-purple p-6 rounded-2xl text-center shadow-sm">
                    <div className="text-4xl mb-4 flex justify-center"><User size={48} className="text-primary-dark" /></div>
                    <h3 className="font-bold text-lg text-primary-dark">ผู้พัฒนา</h3>
                    <p className="font-semibold mt-3 text-lg">พล.ท.ดร.กริช อินทราทิพย์</p>
                    <p className="text-sm text-text-secondary">Dr. Krich Intratip</p>
                    <p className="mt-2 text-sm text-primary-blue underline">
                        <a href="mailto:krich.intratip@gmail.com">krich.intratip@gmail.com</a>
                    </p>
                </div>

                {/* System Info */}
                <div className="bg-gradient-to-br from-pastel-blue to-pastel-purple p-6 rounded-2xl text-center shadow-sm">
                    <div className="text-4xl mb-4 flex justify-center"><Cpu size={48} className="text-primary-dark" /></div>
                    <h3 className="font-bold text-lg text-primary-dark">ข้อมูลระบบ</h3>
                    <div className="text-sm text-text-secondary mt-3 space-y-1">
                        <p><strong>Version:</strong> 1.0.0 (Project Closure Edition)</p>
                        <p><strong>Update:</strong> 14 มกราคม 2569</p>
                        <p><strong>License:</strong> Demo/Educational</p>
                        <p className="text-green-600 font-bold mt-2">✅ Active</p>
                    </div>
                </div>

                {/* Objective */}
                <div className="bg-gradient-to-br from-pastel-blue to-pastel-purple p-6 rounded-2xl text-center shadow-sm">
                    <div className="text-4xl mb-4 flex justify-center"><Target size={48} className="text-primary-dark" /></div>
                    <h3 className="font-bold text-lg text-primary-dark">วัตถุประสงค์</h3>
                    <div className="text-sm text-text-secondary mt-3 space-y-1">
                        <p>Web Application ตัวอย่าง</p>
                        <p>สำหรับประกอบการบรรยาย</p>
                        <p className="font-semibold text-primary-dark mt-2">สำนักงานวิจัยและพัฒนาการทางทหารกองทัพบก</p>
                        <p>(สวพ.ทบ.)</p>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-pastel-blue p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-primary-dark mb-4 flex items-center gap-2"><Code /> Technology Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {['Next.js 14', 'Tailwind CSS v4', 'TypeScript', 'Google Gemini API', 'OpenRouter API', 'PDF.js'].map((tech, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl text-center font-medium text-sm text-primary-blue shadow-sm">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="bg-pastel-green p-6 rounded-2xl shadow-sm text-center">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2"><ShieldCheck /> Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-green-900 font-medium">
                    <div className="bg-white/60 p-2 rounded-lg">✅ AI-Powered Assessment</div>
                    <div className="bg-white/60 p-2 rounded-lg">✅ PDF Upload (20 MB)</div>
                    <div className="bg-white/60 p-2 rounded-lg">✅ 3 Expert Perspectives</div>
                    <div className="bg-white/60 p-2 rounded-lg">✅ Export HTML Report</div>
                    <div className="bg-white/60 p-2 rounded-lg">✅ Responsive Design</div>
                    <div className="bg-white/60 p-2 rounded-lg">✅ Next.js Performance</div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-br from-pastel-purple to-pastel-pink p-8 rounded-2xl text-center shadow-sm">
                <p className="text-xl font-bold text-primary-dark">© 2026 Dr. Krich Intratip</p>
                <p className="text-text-secondary">All Rights Reserved</p>
                <p className="text-sm text-slate-500 mt-2">Developed for Royal Thai Army Research & Development</p>
            </div>

        </div>
    );
}
