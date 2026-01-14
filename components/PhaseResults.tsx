import React, { useState } from 'react';
import { Download, RefreshCw, BarChart2, User, CheckCircle, AlertTriangle, Lightbulb, Target, TrendingUp, ShieldCheck } from 'lucide-react';

interface PhaseResultsProps {
    results: any;
    onRestart: () => void;
}

export default function PhaseResults({ results, onRestart }: PhaseResultsProps) {
    const [expandedExpert, setExpandedExpert] = useState<number | null>(null);

    const exportReport = () => {
        const bgColors = ['#E3F2FD', '#E8F5E9', '#F3E5F5'];

        let reportHTML = `<!DOCTYPE html><html lang="th"><head><meta charset="UTF-8"><title>รายงานการประเมิน - ${results.projectName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
    body{font-family:"Prompt",sans-serif;max-width:1000px;margin:40px auto;padding:20px;background:#fafafa;line-height:1.6;}
    .header{background:linear-gradient(135deg,#E3F2FD,#E8F5E9);padding:40px;border-radius:16px;text-align:center;margin-bottom:30px;}
    .score-card{background:linear-gradient(135deg,#E3F2FD,#E8F5E9);padding:40px;border-radius:16px;text-align:center;margin:20px 0;}
    .score-large{font-size:4em;font-weight:700;color:#1565C0;}
    .status-badge{display:inline-block;padding:10px 25px;border-radius:25px;font-weight:600;margin-top:15px;background:#81C784;color:white;}
    .card{background:white;padding:30px;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.1);margin:20px 0;}
    .criteria-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0;}
    .criteria-item{padding:20px;border-radius:12px;text-align:center;}
    .criteria-score{font-size:2em;font-weight:700;color:#1565C0;}
    .expert-card{padding:25px;border-radius:16px;margin-bottom:20px;page-break-inside:avoid;}
    .expert-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;}
    .expert-score-badge{background:#1565C0;color:white;padding:10px 20px;border-radius:25px;font-weight:600;font-size:1.2em;}
    .criteria-box{padding:12px;border-radius:8px;margin-bottom:10px;}
    .strengths-weaknesses{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;}
    .sw-box{background:white;padding:15px;border-radius:12px;}
    .recommendation-box{background:white;padding:15px;border-radius:12px;border-left:4px solid #1565C0;margin-top:15px;}
    @media print{.card{box-shadow:none;border:1px solid #ddd;}}
    </style></head><body>
    <div class="header"><h1>&#127894; รายงานการประเมินโครงการ</h1><h2>${results.projectName}</h2><p>${results.organization}</p>
    <p style="margin-top:15px;color:#666;">วันที่ประเมิน: ${results.evaluationDate}</p></div>`;

        reportHTML += `<div class="score-card"><div class="score-large">${results.totalScore}<small style="font-size:0.5em;">/100</small></div>
    <div class="status-badge" style="background:${results.percentage >= 81 ? '#4CAF50' : results.percentage >= 71 ? '#66BB6A' : results.percentage >= 50 ? '#FFA726' : '#EF5350'}">${results.status}</div>
    <p style="margin-top:15px;font-size:1.2em;">คะแนนเฉลี่ย: ${results.percentage}%</p></div>`;

        reportHTML += `<div class="card"><h3>&#128202; คะแนนเฉลี่ยแยกตามเกณฑ์</h3><div class="criteria-grid">
    <div class="criteria-item" style="background:#E3F2FD;"><h4>การบรรลุวัตถุประสงค์</h4><div class="criteria-score">${results.scores.achievement}</div><p>/50</p></div>
    <div class="criteria-item" style="background:#E8F5E9;"><h4>ความมีประโยชน์</h4><div class="criteria-score" style="color:#2E7D32;">${results.scores.usefulness}</div><p>/30</p></div>
    <div class="criteria-item" style="background:#F3E5F5;"><h4>ความถูกต้อง</h4><div class="criteria-score" style="color:#7B1FA2;">${results.scores.correctness}</div><p>/10</p></div>
    <div class="criteria-item" style="background:#FFF3E0;"><h4>ความคุ้มค่า</h4><div class="criteria-score" style="color:#E65100;">${results.scores.valueForMoney}</div><p>/10</p></div>
    </div></div>`;

        reportHTML += `<div class="card"><h3>&#128100; ความเห็นผู้เชี่ยวชาญ</h3>`;

        results.experts.forEach((expert: any, index: number) => {
            reportHTML += `<div class="expert-card" style="background:${bgColors[index % 3]};">
      <div class="expert-header"><div><h4 style="font-size:1.3em;margin:0 0 5px 0;">${expert.name}</h4><p style="color:#666;margin:0;">${expert.role}</p></div>
      <div class="expert-score-badge">${expert.totalScore}/100</div></div>
      <div style="background:white;padding:20px;border-radius:12px;margin-bottom:15px;">
      <h5 style="color:#1565C0;margin-bottom:15px;">&#128202; คะแนนและความเห็นตามเกณฑ์</h5>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;">
      <div style="background:#E3F2FD;padding:10px;border-radius:8px;text-align:center;"><strong style="color:#1565C0;">การบรรลุวัตถุประสงค์</strong><div style="font-size:1.5em;font-weight:700;color:#1565C0;">${expert.scores?.achievement || 0}</div><small>/50</small></div>
      <div style="background:#E8F5E9;padding:10px;border-radius:8px;text-align:center;"><strong style="color:#2E7D32;">ความมีประโยชน์</strong><div style="font-size:1.5em;font-weight:700;color:#2E7D32;">${expert.scores?.usefulness || 0}</div><small>/30</small></div>
      <div style="background:#F3E5F5;padding:10px;border-radius:8px;text-align:center;"><strong style="color:#7B1FA2;">ความถูกต้อง</strong><div style="font-size:1.5em;font-weight:700;color:#7B1FA2;">${expert.scores?.correctness || 0}</div><small>/10</small></div>
      <div style="background:#FFF3E0;padding:10px;border-radius:8px;text-align:center;"><strong style="color:#E65100;">ความคุ้มค่า</strong><div style="font-size:1.5em;font-weight:700;color:#E65100;">${expert.scores?.valueForMoney || 0}</div><small>/10</small></div>
      </div>
      <div class="criteria-box" style="background:#E3F2FD;"><strong style="color:#1565C0;">&#128309; การบรรลุวัตถุประสงค์:</strong><p style="margin:5px 0 0 0;">${expert.criteriaComments?.achievement || '-'}</p></div>
      <div class="criteria-box" style="background:#E8F5E9;"><strong style="color:#2E7D32;">&#128994; ความมีประโยชน์:</strong><p style="margin:5px 0 0 0;">${expert.criteriaComments?.usefulness || '-'}</p></div>
      <div class="criteria-box" style="background:#F3E5F5;"><strong style="color:#7B1FA2;">&#128995; ความถูกต้อง:</strong><p style="margin:5px 0 0 0;">${expert.criteriaComments?.correctness || '-'}</p></div>
      <div class="criteria-box" style="background:#FFF3E0;"><strong style="color:#E65100;">&#128992; ความคุ้มค่า:</strong><p style="margin:5px 0 0 0;">${expert.criteriaComments?.valueForMoney || '-'}</p></div>
      </div>
      <div class="strengths-weaknesses">
      <div class="sw-box"><h5 style="color:#2E7D32;margin-bottom:10px;">&#10004; จุดแข็ง</h5><ul style="margin:0;padding-left:20px;">
      ${(expert.strengths || []).map((s: string) => `<li>${s}</li>`).join('')}
      </ul></div>
      <div class="sw-box"><h5 style="color:#F57C00;margin-bottom:10px;">&#9888; จุดที่ควรปรับปรุง</h5><ul style="margin:0;padding-left:20px;">
      ${(expert.weaknesses || []).map((w: string) => `<li>${w}</li>`).join('')}
      </ul></div></div>
      <div class="recommendation-box"><h5 style="color:#1565C0;margin-bottom:10px;">&#128161; ข้อเสนอแนะ</h5><p style="margin:0;">${expert.recommendations || '-'}</p></div>
      </div>`;
        });

        reportHTML += `</div><div class="card" style="background:linear-gradient(135deg,#FFF9C4,#FFECB3);">
    <h3>&#128220; สรุปข้อเสนอแนะโดยรวม</h3><div style="background:white;padding:20px;border-radius:12px;"><ol style="margin:0;padding-left:25px;">
    ${(results.overallRecommendations || []).map((rec: string) => `<li style="margin-bottom:8px;">${rec}</li>`).join('')}
    </ol></div></div>
    <div style="text-align:center;margin-top:40px;padding:20px;background:#F3E5F5;border-radius:12px;">
    <p>&#169; 2026 Dr. Krich Intratip</p><p>Royal Thai Army Project Assessment System (RTA.PAS)</p>
    <p style="font-size:0.9em;color:#666;margin-top:10px;">สร้างโดย AI • รายงานนี้เป็นผลจากการประเมินอัตโนมัติ</p></div></body></html>`;

        const blob = new Blob([reportHTML], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `RTA_Assessment_Report_${Date.now()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('✅ ดาวน์โหลดรายงานสำเร็จ!');
    };

    const statusColor = results.percentage >= 81 ? 'bg-green-500' :
        results.percentage >= 71 ? 'bg-green-400' :
            results.percentage >= 50 ? 'bg-orange-400' : 'bg-red-500';

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header & Overall Score */}
            <div className="bg-gradient-to-br from-pastel-blue to-pastel-green p-8 rounded-3xl shadow-lg text-center transform hover:scale-[1.01] transition-all">
                <h2 className="text-2xl font-bold text-primary-dark mb-2">{results.projectName}</h2>
                <p className="text-text-secondary mb-6">{results.organization}</p>

                <div className="relative inline-block">
                    <div className="text-8xl font-bold text-primary-blue drop-shadow-sm">{Math.round(results.totalScore)}<span className="text-2xl text-slate-400">/100</span></div>
                    <div className={`absolute -right-4 top-0 ${statusColor} text-white px-4 py-1 rounded-full text-lg font-bold shadow-md`}>
                        {results.status}
                    </div>
                </div>

                <div className="mt-4 text-xl font-medium text-text-primary">
                    คะแนนเฉลี่ย: {results.percentage}%
                </div>
                <div className="mt-2 text-sm text-text-secondary">
                    วันที่ประเมิน: {results.evaluationDate}
                </div>
            </div>

            {/* Criteria Grid */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
                    <BarChart2 /> คะแนนเฉลี่ยแยกตามเกณฑ์
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Items */}
                    <div className="bg-pastel-blue p-6 rounded-xl text-center">
                        <div className="font-semibold text-primary-dark mb-2">การบรรลุวัตถุประสงค์</div>
                        <div className="text-4xl font-bold text-primary-blue">{results.scores.achievement}</div>
                        <div className="text-xs text-slate-500">/50 คะแนน</div>
                    </div>
                    <div className="bg-pastel-green p-6 rounded-xl text-center">
                        <div className="font-semibold text-green-800 mb-2">ความมีประโยชน์</div>
                        <div className="text-4xl font-bold text-green-600">{results.scores.usefulness}</div>
                        <div className="text-xs text-slate-500">/30 คะแนน</div>
                    </div>
                    <div className="bg-pastel-purple p-6 rounded-xl text-center">
                        <div className="font-semibold text-purple-800 mb-2">ความถูกต้อง</div>
                        <div className="text-4xl font-bold text-purple-600">{results.scores.correctness}</div>
                        <div className="text-xs text-slate-500">/10 คะแนน</div>
                    </div>
                    <div className="bg-pastel-orange p-6 rounded-xl text-center">
                        <div className="font-semibold text-orange-800 mb-2">ความคุ้มค่า</div>
                        <div className="text-4xl font-bold text-orange-600">{results.scores.valueForMoney}</div>
                        <div className="text-xs text-slate-500">/10 คะแนน</div>
                    </div>
                </div>
            </div>

            {/* Experts Accordion */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary-dark ml-2 flex items-center gap-2">
                    <User /> ความเห็นผู้เชี่ยวชาญ ({results.experts.length} ท่าน)
                </h3>

                {results.experts.map((expert: any, index: number) => {
                    const isExpanded = expandedExpert === index;
                    const bgColor = ['bg-pastel-blue', 'bg-pastel-green', 'bg-pastel-purple'][index % 3];

                    return (
                        <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
                            <div
                                onClick={() => setExpandedExpert(isExpanded ? null : index)}
                                className={`${bgColor} p-6 cursor-pointer flex justify-between items-center transition-all hover:brightness-95`}
                            >
                                <div>
                                    <h4 className="font-bold text-lg text-primary-dark">{expert.name}</h4>
                                    <p className="text-sm text-text-secondary">{expert.role}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/50 px-4 py-2 rounded-xl font-bold text-primary-dark">
                                        {expert.totalScore}/100
                                    </div>
                                    <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</div>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="p-6 animate-fade-in space-y-6">
                                    {/* Expert Detail Content */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Strengths */}
                                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                            <h5 className="font-semibold text-green-700 mb-3 flex items-center gap-2"><CheckCircle size={18} /> จุดแข็ง</h5>
                                            <ul className="space-y-2 text-sm text-green-900">
                                                {expert.strengths.map((s: string, i: number) => <li key={i} className="flex gap-2"><span>•</span> {s}</li>)}
                                            </ul>
                                        </div>
                                        {/* Weaknesses */}
                                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                            <h5 className="font-semibold text-orange-700 mb-3 flex items-center gap-2"><AlertTriangle size={18} /> จุดที่ควรปรับปรุง</h5>
                                            <ul className="space-y-2 text-sm text-orange-900">
                                                {expert.weaknesses.map((w: string, i: number) => <li key={i} className="flex gap-2"><span>•</span> {w}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Criteria Comments */}
                                    <div className="space-y-3">
                                        <div className="p-3 bg-pastel-blue rounded-lg text-sm">
                                            <strong className="text-primary-dark block mb-1"><Target size={16} className="inline mr-1" /> การบรรลุวัตถุประสงค์ ({expert.scores.achievement}/50)</strong>
                                            {expert.criteriaComments.achievement}
                                        </div>
                                        <div className="p-3 bg-pastel-green rounded-lg text-sm">
                                            <strong className="text-green-800 block mb-1"><TrendingUp size={16} className="inline mr-1" /> ความมีประโยชน์ ({expert.scores.usefulness}/30)</strong>
                                            {expert.criteriaComments.usefulness}
                                        </div>
                                        <div className="p-3 bg-pastel-purple rounded-lg text-sm">
                                            <strong className="text-purple-800 block mb-1"><ShieldCheck size={16} className="inline mr-1" /> ความถูกต้อง ({expert.scores.correctness}/10)</strong>
                                            {expert.criteriaComments.correctness}
                                        </div>
                                        <div className="p-3 bg-pastel-orange rounded-lg text-sm">
                                            <strong className="text-orange-800 block mb-1"><Lightbulb size={16} className="inline mr-1" /> ความคุ้มค่า ({expert.scores.valueForMoney}/10)</strong>
                                            {expert.criteriaComments.valueForMoney}
                                        </div>
                                    </div>

                                    {/* Recommendation */}
                                    <div className="bg-white border-l-4 border-primary-blue p-4 rounded-r-lg shadow-sm">
                                        <h5 className="font-semibold text-primary-dark mb-2 flex items-center gap-2"><Lightbulb size={18} /> ข้อเสนอแนะ</h5>
                                        <p className="text-text-primary text-sm">{expert.recommendations}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Overall Recommendations */}
            <div className="bg-gradient-to-br from-pastel-yellow to-pastel-orange p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <Lightbulb /> สรุปข้อเสนอแนะโดยรวม
                </h3>
                <div className="bg-white/80 p-6 rounded-xl">
                    <ol className="list-decimal pl-5 space-y-2 text-orange-900 font-medium">
                        {results.overallRecommendations.map((rec: string, i: number) => (
                            <li key={i}>{rec}</li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
                <button
                    onClick={exportReport}
                    className="px-8 py-4 bg-primary-blue text-white rounded-xl shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all font-bold text-lg flex items-center gap-2"
                >
                    <Download /> ดาวน์โหลดรายงาน HTML
                </button>
                <button
                    onClick={onRestart}
                    className="px-8 py-4 bg-white text-text-secondary border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-lg flex items-center gap-2"
                >
                    <RefreshCw /> ประเมินโครงการอื่น
                </button>
            </div>
        </div>
    );
}
