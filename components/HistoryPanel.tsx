'use client';

import { HistoryItem } from '@/lib/types';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export default function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">History ({history.length})</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-4 space-y-2">
          {history.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="w-full text-left p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <p className="text-white font-medium">{item.input.brandName} - {item.input.productName}</p>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
