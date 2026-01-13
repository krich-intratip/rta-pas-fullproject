'use server';

export async function testConnection(provider: string, apiKey: string, model: string) {
    try {
        if (provider === 'gemini') {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: 'Say "API Connected" in Thai' }] }],
                    generationConfig: { maxOutputTokens: 50 }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || response.statusText);
            }
            return { success: true };
        } else {
            // OpenRouter
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'https://rta-pas.vercel.app', // Placeholder
                    'X-Title': 'RTA.PAS API Test'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: 'user', content: 'Say "API Connected" in Thai' }],
                    max_tokens: 50
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || response.statusText);
            }
            return { success: true };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function generateContent(config: { provider: string; apiKey: string; model: string }, prompt: string) {
    try {
        if (config.provider === 'gemini') {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 4096
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || response.statusText);
            }

            const data = await response.json();
            return { success: true, text: data.candidates[0].content.parts[0].text };
        } else {
            // OpenRouter
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`,
                    'HTTP-Referer': 'https://rta-pas.vercel.app',
                    'X-Title': 'RTA.PAS Assessment'
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 4096
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || response.statusText);
            }

            const data = await response.json();
            return { success: true, text: data.choices[0].message.content };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
