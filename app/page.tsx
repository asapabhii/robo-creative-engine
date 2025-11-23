'use client';

import { useState } from 'react';
import FormPanel from '@/components/FormPanel';
import ResultPanel from '@/components/ResultPanel';
import HistoryPanel from '@/components/HistoryPanel';
import { CreativePackInput, CreativePackOutput, GenerateResponse, HistoryItem } from '@/lib/types';
import { Zap } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CreativePackOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = async (input: CreativePackInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data: GenerateResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to generate creative pack');
      }

      setResult(data.data);
      
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        input,
        output: data.data,
      };
      setHistory((prev) => [historyItem, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setResult(item.output);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Robo Creative Engine
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            AI-powered workflow automation for merch & marketing campaigns
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Campaign Details</h2>
            <FormPanel onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          <div>
            {isLoading && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xl text-purple-400 font-semibold">
                  Synthesizing your creative pack...
                </p>
                <p className="text-gray-400 mt-2">This may take 10-30 seconds</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
                <p className="text-gray-300">{error}</p>
              </div>
            )}

            {result && !isLoading && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Generated Assets</h2>
                <ResultPanel result={result} />
              </div>
            )}

            {!result && !isLoading && !error && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
                <Zap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Fill in the form and click Generate to create your creative pack
                </p>
              </div>
            )}
          </div>
        </div>

        <HistoryPanel history={history} onSelect={handleHistorySelect} />
      </div>
    </main>
  );
}
