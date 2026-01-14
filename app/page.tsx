'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PhaseSettings from '@/components/PhaseSettings';
import PhaseUpload from '@/components/PhaseUpload';
import PhaseEvaluation from '@/components/PhaseEvaluation';
import PhaseResults from '@/components/PhaseResults';
import PhaseGuide from '@/components/PhaseGuide';
import PhaseAbout from '@/components/PhaseAbout';

export type Phase = 'settings' | 'upload' | 'evaluating' | 'results' | 'guide' | 'about';

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('settings');

  // App State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [aiConfig, setAiConfig] = useState({ provider: '', apiKey: '', model: '' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projectData, setProjectData] = useState<{ file: File | null; content: string; name: string; org: string }>({
    file: null, content: '', name: '', org: ''
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [evaluationResults, setEvaluationResults] = useState(null);

  // Status Flags
  const [apiReady, setApiReady] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1600px]">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-pastel-blue to-pastel-purple p-8 rounded-[20px] text-center mb-8 shadow-lg animate-fade-in-down">
        <h1 className="text-4xl font-bold mb-3 text-primary-blue flex items-center justify-center gap-4">
          <span className="text-5xl">🎖️</span>
          <span>RTA.PAS [Project Closure]</span>
        </h1>
        <p className="text-lg text-text-secondary mt-2">Royal Thai Army Project Assessment System</p>
        <p className="text-sm text-text-secondary mt-1">ระบบประเมินโครงการวิจัยทางทหาร - ประเมินปิดโครงการ</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-medium text-text-secondary opacity-80">
          <span className="bg-white/50 px-3 py-1 rounded-full border border-white/60 shadow-sm">
            v1.0.1
          </span>
          <span className="bg-white/50 px-3 py-1 rounded-full border border-white/60 shadow-sm">
            📅 Update: 14 มกราคม 2569
          </span>
        </div>
      </div>

      {/* Navigation */}
      <Navbar
        currentPhase={currentPhase}
        onPhaseChange={setCurrentPhase}
        apiReady={apiReady}
        fileReady={fileReady}
        resultsReady={resultsReady}
      />

      {/* Content Area */}
      <div className="min-h-[600px] transition-all duration-300">
        {currentPhase === 'settings' && (
          <PhaseSettings
            config={aiConfig}
            setConfig={setAiConfig}
            onApiTested={setApiReady}
            onNext={() => setCurrentPhase('upload')}
          />
        )}

        {currentPhase === 'upload' && (
          <PhaseUpload
            projectData={projectData}
            setProjectData={setProjectData}
            onFileProcessed={setFileReady}
            onNext={() => setCurrentPhase('evaluating')}
            onBack={() => setCurrentPhase('settings')}
          />
        )}

        {currentPhase === 'evaluating' && (
          <PhaseEvaluation
            config={aiConfig}
            projectData={projectData}
            onComplete={(results) => {
              setEvaluationResults(results);
              setResultsReady(true);
              setCurrentPhase('results');
            }}
            onBack={() => setCurrentPhase('upload')}
          />
        )}

        {currentPhase === 'results' && (
          <PhaseResults
            results={evaluationResults}
            onRestart={() => setCurrentPhase('settings')}
          />
        )}

        {currentPhase === 'guide' && (
          <PhaseGuide />
        )}

        {currentPhase === 'about' && (
          <PhaseAbout />
        )}
      </div>
    </div>
  );
}
