import React from 'react';
import { Settings, FileText, Activity, BarChart2, BookOpen, Info } from 'lucide-react';

type Phase = 'settings' | 'upload' | 'evaluating' | 'results' | 'guide' | 'about';

interface NavbarProps {
    currentPhase: Phase;
    onPhaseChange: (phase: Phase) => void;
    // Disable future phases if not ready (optional, based on logic)
    apiReady: boolean;
    fileReady: boolean;
    resultsReady: boolean;
}

export default function Navbar({ currentPhase, onPhaseChange, apiReady, fileReady, resultsReady }: NavbarProps) {

    const navItems: { id: Phase; label: string; icon: React.ReactNode; disabled: boolean }[] = [
        { id: 'settings', label: 'ตั้งค่า AI', icon: <Settings size={18} />, disabled: false },
        { id: 'upload', label: 'อัปโหลดโครงการ', icon: <FileText size={18} />, disabled: !apiReady }, // Disabled if API not tested
        { id: 'evaluating', label: 'ประเมิน', icon: <Activity size={18} />, disabled: !fileReady },   // Disabled if no file
        { id: 'results', label: 'ผลลัพธ์', icon: <BarChart2 size={18} />, disabled: !resultsReady },  // Disabled if no results
        { id: 'guide', label: 'คู่มือ', icon: <BookOpen size={18} />, disabled: false },
        { id: 'about', label: 'เกี่ยวกับ', icon: <Info size={18} />, disabled: false },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center animate-fade-in">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => !item.disabled && onPhaseChange(item.id)}
                    disabled={item.disabled}
                    className={`
            px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300
            ${currentPhase === item.id
                            ? 'bg-gradient-to-br from-primary-blue to-primary-dark text-white shadow-lg scale-105'
                            : 'bg-bg-card border-2 border-transparent hover:-translate-y-1 hover:shadow-md hover:border-primary-blue/50'
                        }
            ${item.disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
          `}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
}
