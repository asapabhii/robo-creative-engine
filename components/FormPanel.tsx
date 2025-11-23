'use client';

import { useState } from 'react';
import { CreativePackInput } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface FormPanelProps {
  onSubmit: (input: CreativePackInput) => void;
  isLoading: boolean;
}

const CAMPAIGN_GOALS = [
  'Product Launch',
  'Sale/Offer',
  'Brand Awareness',
  'UGC Push',
  'Retention/Email',
];

const PLATFORMS = [
  'Instagram',
  'Website',
  'Amazon',
  'Email',
  'Other',
];

export default function FormPanel({ onSubmit, isLoading }: FormPanelProps) {
  const [formData, setFormData] = useState<CreativePackInput>({
    brandName: '',
    productName: '',
    targetAudience: '',
    brandVoice: '',
    campaignGoal: 'Product Launch',
    platforms: ['Instagram'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Brand Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.brandName}
          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g., Robo Customized"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Product Name / Type <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g., Custom T-Shirts, Personalized Mugs"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Target Audience
        </label>
        <textarea
          value={formData.targetAudience}
          onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          rows={3}
          placeholder="e.g., Young professionals, corporate gifting, millennials"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Brand Voice / Tone
        </label>
        <input
          type="text"
          value={formData.brandVoice}
          onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g., playful, minimal, luxury, edgy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Campaign Goal
        </label>
        <select
          value={formData.campaignGoal}
          onChange={(e) => setFormData({ ...formData, campaignGoal: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {CAMPAIGN_GOALS.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Platforms
        </label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => togglePlatform(platform)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formData.platforms.includes(platform)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Workflow Assets
          </>
        )}
      </button>
    </form>
  );
}
