import React, { useState } from 'react';
import { Search, Globe, Check, AlertCircle, Loader2 } from 'lucide-react';
import { testConnection } from '@/app/actions/ai';

interface PhaseSettingsProps {
    config: { provider: string; apiKey: string; model: string };
    setConfig: (config: { provider: string; apiKey: string; model: string }) => void;
    onApiTested: (success: boolean) => void;
    onNext: () => void;
}

export default function PhaseSettings({ config, setConfig, onApiTested, onNext }: PhaseSettingsProps) {
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

    // Legacy Model List
    const providerModels = {
        gemini: [
            { id: 'gemini-2.5-flash', name: '✨ Gemini 2.5 Flash (แนะนำ - เร็ว คุ้มค่า)' },
            { id: 'gemini-2.5-pro', name: '✨ Gemini 2.5 Pro (ฉลาดสุด - Thinking)' },
            { id: 'gemini-2.5-flash-lite', name: '✨ Gemini 2.5 Flash-Lite (ประหยัดสุด)' },
            { id: 'gemini-2.0-flash', name: '✨ Gemini 2.0 Flash' }
        ],
        openrouter: [
            { id: 'google/gemini-2.5-flash-preview-05-20:free', name: '🔷 Gemini 2.5 Flash Preview (ฟรี)', free: true },
            { id: 'deepseek/deepseek-r1-0528:free', name: '🔵 DeepSeek R1 (ฟรี - แนะนำ)', free: true },
            { id: 'deepseek/deepseek-chat-v3-0324:free', name: '🔵 DeepSeek V3 Chat (ฟรี)', free: true },
            { id: 'deepseek/deepseek-r1-distill-llama-70b:free', name: '🔵 DeepSeek R1 Distill 70B (ฟรี)', free: true },
            { id: 'qwen/qwen3-235b-a22b:free', name: '🟣 Qwen 3 235B (ฟรี)', free: true },
            { id: 'qwen/qwen3-30b-a3b:free', name: '🟣 Qwen 3 30B (ฟรี)', free: true },
            { id: 'meta-llama/llama-4-maverick:free', name: '🦙 Llama 4 Maverick (ฟรี)', free: true },
            { id: 'meta-llama/llama-4-scout:free', name: '🦙 Llama 4 Scout (ฟรี)', free: true },
            { id: 'meta-llama/llama-3.3-70b-instruct:free', name: '🦙 Llama 3.3 70B (ฟรี)', free: true },
            { id: 'microsoft/phi-4:free', name: '🟦 Microsoft Phi-4 (ฟรี)', free: true },
            { id: 'nvidia/llama-3.1-nemotron-70b-instruct:free', name: '🟩 NVIDIA Nemotron 70B (ฟรี)', free: true },
            { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: '🟠 Mistral Small 3.1 (ฟรี)', free: true },
            { id: 'anthropic/claude-sonnet-4', name: '🟠 Claude Sonnet 4', free: false },
            { id: 'anthropic/claude-3.5-haiku', name: '🟠 Claude Haiku 3.5', free: false },
            { id: 'openai/gpt-4o', name: '🟢 GPT-4o', free: false }
        ]
    };

    const handleTestConnection = async () => {
        if (!config.apiKey) {
            alert('กรุณาใส่ API Key');
            return;
        }
        if (!config.provider) {
            alert('กรุณาเลือก AI Provider');
            return;
        }

        setIsTesting(true);
        setTestResult(null);

        const result = await testConnection(config.provider, config.apiKey, config.model);

        setIsTesting(false);
        if (result.success) {
            setTestResult({ success: true, message: '✅ การเชื่อมต่อสำเร็จ!' });
            onApiTested(true);
            alert('✅ การเชื่อมต่อสำเร็จ!\n\nProvider: ' + (config.provider === 'gemini' ? 'Google Gemini' : 'OpenRouter') + '\nModel: ' + config.model + '\n\nสามารถกด "ถัดไป" เพื่อไปขั้นตอนต่อไป');
        } else {
            setTestResult({ success: false, message: '❌ การเชื่อมต่อล้มเหลว: ' + result.error });
            onApiTested(false);
            alert('❌ การเชื่อมต่อล้มเหลว!\n\nError: ' + result.error);
        }
    };

    const handleProviderChange = (provider: string) => {
        // Reset model when provider changes to default valid one
        const defaultModel = provider === 'gemini' ? 'gemini-2.5-flash' : 'google/gemini-2.5-flash-preview-05-20:free';
        setConfig({ ...config, provider, model: defaultModel });
        setTestResult(null);
        onApiTested(false);
    };

    return (
        <div className="bg-bg-card p-8 rounded-2xl shadow-md animate-scale-in max-w-4xl mx-auto">
            <div className="text-2xl font-semibold mb-6 flex items-center gap-3 text-primary-blue">
                <span>&#9881;</span> ตั้งค่า AI Provider
            </div>

            {/* Provider Selection */}
            <div className="mb-6">
                <label className="block font-medium mb-3 text-text-primary">เลือก AI Provider</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`
            cursor-pointer p-6 border-2 rounded-xl flex flex-col items-center transition-all duration-300 relative bg-white
            ${config.provider === 'gemini'
                            ? 'border-primary-blue bg-pastel-blue shadow-md scale-[1.02]'
                            : 'border-slate-200 hover:border-blue-300 hover:-translate-y-1 hover:shadow-md'}
          `}>
                        <input
                            type="radio"
                            name="provider"
                            value="gemini"
                            checked={config.provider === 'gemini'}
                            onChange={() => handleProviderChange('gemini')}
                            className="absolute opacity-0"
                        />
                        <Search className="w-10 h-10 mb-3 text-primary-dark" />
                        <div className="font-semibold text-lg">Google Gemini</div>
                    </label>

                    <label className={`
            cursor-pointer p-6 border-2 rounded-xl flex flex-col items-center transition-all duration-300 relative bg-white
            ${config.provider === 'openrouter'
                            ? 'border-primary-blue bg-pastel-blue shadow-md scale-[1.02]'
                            : 'border-slate-200 hover:border-blue-300 hover:-translate-y-1 hover:shadow-md'}
          `}>
                        <input
                            type="radio"
                            name="provider"
                            value="openrouter"
                            checked={config.provider === 'openrouter'}
                            onChange={() => handleProviderChange('openrouter')}
                            className="absolute opacity-0"
                        />
                        <Globe className="w-10 h-10 mb-3 text-primary-dark" />
                        <div className="font-semibold text-lg">OpenRouter</div>
                    </label>
                </div>
            </div>

            {/* API Key & Model Input Section (Visible only when provider selected) */}
            {config.provider && (
                <div className="animate-fade-in space-y-6">
                    <div>
                        <label className="block font-medium mb-2 text-text-primary">API Key</label>
                        <input
                            type="password"
                            value={config.apiKey}
                            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                            placeholder="ใส่ API Key"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-blue-100 transition-all font-sans"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2 text-text-primary">Model</label>
                        <div className="relative">
                            <select
                                value={config.model}
                                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-blue-100 transition-all font-sans appearance-none bg-white"
                            >
                                {config.provider === 'gemini' ? (
                                    <optgroup label="✨ Google Gemini">
                                        {providerModels.gemini.map((model) => (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                ) : (
                                    <>
                                        <optgroup label="🆓 โมเดลฟรี (OpenRouter)">
                                            {providerModels.openrouter.filter(model => model.free).map((model) => (
                                                <option key={model.id} value={model.id}>
                                                    {model.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="💰 โมเดลมีค่าใช้จ่าย">
                                            {providerModels.openrouter.filter(model => !model.free).map((model) => (
                                                <option key={model.id} value={model.id}>
                                                    {model.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    </>
                                )}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                ▼
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            onClick={handleTestConnection}
                            disabled={isTesting || !config.apiKey}
                            className={`
                px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                ${isTesting || !config.apiKey
                                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                    : 'bg-primary-blue text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg'}
              `}
                        >
                            {isTesting ? (
                                <><Loader2 className="animate-spin" /> กำลังทดสอบ...</>
                            ) : (
                                <><Check /> ทดสอบการเชื่อมต่อ</>
                            )}
                        </button>

                        <button
                            onClick={onNext}
                            disabled={!testResult?.success}
                            className={`
                 px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border-2
                 ${!testResult?.success
                                    ? 'bg-bg-card text-slate-400 border-slate-200 cursor-not-allowed'
                                    : 'bg-white text-primary-blue border-primary-blue hover:bg-pastel-blue hover:-translate-y-1'}
               `}
                        >
                            ถัดไป &#8594;
                        </button>
                    </div>

                    {testResult && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 animate-fade-in ${testResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {testResult.success ? <Check size={20} /> : <AlertCircle size={20} />}
                            {testResult.message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
