import React, { useEffect, useState, useRef } from 'react';
import { generateContent } from '@/app/actions/ai';

interface PhaseEvaluationProps {
    config: { provider: string; apiKey: string; model: string };
    projectData: { file: File | null; content: string; name: string; org: string };
    onComplete: (results: any) => void;
    onBack: () => void;
}

const expertProfiles = [
    {
        name: 'ดร. ประชนัย ถิตยาโรจน์',
        role: 'ผู้เชี่ยวชาญด้านเทคโนโลยีทหาร',
        perspective: 'มุ่งเน้นการวิเคราะห์ความสอดคล้องกับยุทธศาสตร์การพัฒนากองทัพ การประยุกต์ใช้เทคโนโลยีในภารกิจทหาร และความพร้อมของทีมวิจัย'
    },
    {
        name: 'พล.ต.ดร. สมชัย รัตนโกศิน',
        role: 'ผู้เชี่ยวชาญด้านการปฏิบัติการ',
        perspective: 'มุ่งเน้นความเป็นไปได้ในการนำไปใช้งานจริง ความสอดคล้องกับความต้องการของหน่วยปฏิบัติ และความพร้อมในการถ่ายทอดเทคโนโลยี'
    },
    {
        name: 'ดร. กัญญา สุวรรณชัยศรี',
        role: 'ผู้เชี่ยวชาญด้านนวัตกรรม',
        perspective: 'มุ่งเน้นความเป็นนวัตกรรม ศักยภาพในการขยายผล และโอกาสในการพัฒนาต่อยอด'
    }
];

export default function PhaseEvaluation({ config, projectData, onComplete, onBack }: PhaseEvaluationProps) {
    const [status, setStatus] = useState('กำลังเตรียมข้อมูล...');
    const [progress, setProgress] = useState(0);
    const hasStartedRef = useRef(false);

    useEffect(() => {
        if (hasStartedRef.current) return;
        hasStartedRef.current = true;
        startEvaluation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateExpertPrompt = (expert: any, pdfContent: string, projectName: string) => {
        return `คุณคือ ${expert.name} (${expert.role})
มุมมองในการประเมิน: ${expert.perspective}

ประเมินข้อเสนอโครงการนี้ตามเกณฑ์ กวป.ทบ.:
ชื่อโครงการ: ${projectName || 'ไม่ระบุชื่อ'}

เนื้อหา:
${pdfContent.substring(0, 12000)}

เกณฑ์: 1.ความมีประโยชน์(60คะแนน) 2.ความเป็นไปได้(20คะแนน) 3.ความถูกต้อง(10คะแนน) 4.ความคุ้มค่า(10คะแนน)

⚠️ สำคัญมาก: ตอบเป็น JSON เท่านั้น ห้ามมีข้อความใดๆ ก่อนหรือหลัง JSON ห้ามใช้ \`\`\` เริ่มด้วย { ทันที:

{"scores":{"usefulness":50,"feasibility":16,"correctness":8,"valueForMoney":8},"criteriaComments":{"usefulness":"ความเห็น","feasibility":"ความเห็น","correctness":"ความเห็น","valueForMoney":"ความเห็น"},"strengths":["จุดแข็ง1","จุดแข็ง2"],"weaknesses":["จุดอ่อน1","จุดอ่อน2"],"recommendations":"ข้อเสนอแนะ"}`;
    };

    const parseExpertResponse = (responseText: string) => {
        try {
            // Strategy 1: Direct parse
            return JSON.parse(responseText.trim());
        } catch {
            try {
                // Strategy 2: Remove markdown
                const cleanText = responseText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
                return JSON.parse(cleanText);
            } catch {
                try {
                    // Strategy 3: Regex
                    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) return JSON.parse(jsonMatch[0]);
                } catch (e) {
                    console.error('Parse Error', e);
                }
            }
        }

        // Fallback
        return {
            scores: { usefulness: 45, feasibility: 15, correctness: 7, valueForMoney: 7 },
            criteriaComments: {
                usefulness: 'ไม่สามารถแปลความเห็นจาก AI ได้ - กรุณาลองประเมินใหม่',
                feasibility: 'ไม่สามารถแปลความเห็นจาก AI ได้',
                correctness: 'ไม่สามารถแปลความเห็นจาก AI ได้',
                valueForMoney: 'ไม่สามารถแปลความเห็นจาก AI ได้'
            },
            strengths: ['ยังไม่สามารถวิเคราะห์ได้'],
            weaknesses: ['ยังไม่สามารถวิเคราะห์ได้'],
            recommendations: 'กรุณาลองประเมินใหม่ด้วย AI model อื่น'
        };
    };

    const startEvaluation = async () => {
        const expertResults = [];

        try {
            for (let i = 0; i < expertProfiles.length; i++) {
                const expert = expertProfiles[i];
                setStatus(`กำลังขอความเห็นจากผู้เชี่ยวชาญท่านที่ ${i + 1}/3: ${expert.name}...`);
                setProgress(((i) / expertProfiles.length) * 100);

                // Delay to prevent rate limiting
                if (i > 0) await new Promise(r => setTimeout(r, 2000));

                const prompt = generateExpertPrompt(expert, projectData.content, projectData.name);
                const result = await generateContent(config, prompt);

                if (!result.success) throw new Error(result.error);

                const parsed = parseExpertResponse(result.text);
                const totalScore = (parsed.scores.usefulness || 0) +
                    (parsed.scores.feasibility || 0) +
                    (parsed.scores.correctness || 0) +
                    (parsed.scores.valueForMoney || 0);

                expertResults.push({
                    name: expert.name,
                    role: expert.role,
                    totalScore,
                    scores: parsed.scores,
                    criteriaComments: parsed.criteriaComments,
                    strengths: parsed.strengths || [],
                    weaknesses: parsed.weaknesses || [],
                    recommendations: parsed.recommendations || ''
                });
                setProgress(((i + 1) / expertProfiles.length) * 100);
            }

            setStatus('กำลังสรุปผลการประเมิน...');

            // Aggregate Results
            const avgScores = { usefulness: 0, feasibility: 0, correctness: 0, valueForMoney: 0 };
            expertResults.forEach(exp => {
                avgScores.usefulness += exp.scores.usefulness || 0;
                avgScores.feasibility += exp.scores.feasibility || 0;
                avgScores.correctness += exp.scores.correctness || 0;
                avgScores.valueForMoney += exp.scores.valueForMoney || 0;
            });

            avgScores.usefulness = Math.round(avgScores.usefulness / 3);
            avgScores.feasibility = Math.round(avgScores.feasibility / 3);
            avgScores.correctness = Math.round(avgScores.correctness / 3);
            avgScores.valueForMoney = Math.round(avgScores.valueForMoney / 3);

            const totalAvg = avgScores.usefulness + avgScores.feasibility + avgScores.correctness + avgScores.valueForMoney;
            const statusStr = totalAvg >= 81 ? 'ดีมาก' : totalAvg >= 71 ? 'ดี' : totalAvg >= 50 ? 'ควรปรับปรุง' : 'ไม่ผ่าน';

            const overallRecommendations = [
                'ควรจัดตั้งคณะกรรมการกำกับดูแลโครงการ (Steering Committee) เพื่อติดตามความก้าวหน้า',
                'ควรกำหนดจุดตรวจสอบ (Milestone) และรายงานความก้าวหน้าเป็นรายไตรมาส',
                'ควรประสานงานกับหน่วยผู้ใช้งานอย่างใกล้ชิดตลอดระยะเวลาดำเนินโครงการ'
            ];
            if (totalAvg >= 71) overallRecommendations.push('เสนอให้อนุมัติโครงการ โดยให้ปรับปรุงตามข้อเสนอแนะของผู้เชี่ยวชาญ');
            else overallRecommendations.push('เสนอให้ปรับปรุงข้อเสนอโครงการตามข้อเสนอแนะ และส่งประเมินใหม่');

            const finalResults = {
                projectName: projectData.name,
                organization: projectData.org,
                evaluationDate: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
                scores: avgScores,
                totalScore: totalAvg,
                status: statusStr,
                percentage: totalAvg,
                experts: expertResults,
                overallRecommendations
            };

            onComplete(finalResults);

        } catch (err: any) {
            alert('❌ เกิดข้อผิดพลาด: ' + err.message);
            onBack();
        }
    };

    return (
        <div className="bg-bg-card p-12 rounded-2xl shadow-md animate-scale-in max-w-2xl mx-auto text-center">
            <div className="text-3xl font-semibold mb-8 flex items-center justify-center gap-3 text-primary-blue">
                <span>&#128300;</span> กำลังประเมินโครงการ
            </div>

            <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="w-full h-full border-8 border-slate-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-8 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold text-xl text-primary-blue">
                    {Math.round(progress)}%
                </div>
            </div>

            <p className="text-xl font-medium mb-4 animate-pulse">{status}</p>
            <p className="text-text-secondary">โปรดรอสักครู่ (ประมาณ 2-5 นาที)</p>
            <p className="text-sm text-slate-400 mt-2">ห้ามปิดหน้านี้ขณะทำการประเมิน</p>
        </div>
    );
}
