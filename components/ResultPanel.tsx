'use client';

import { CreativePackOutput } from '@/lib/types';
import CopyButton from './CopyButton';
import { Sparkles, FileText, Image, Hash, Mail, Megaphone } from 'lucide-react';

interface ResultPanelProps {
  result: CreativePackOutput;
}

export default function ResultPanel({ result }: ResultPanelProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Tagline</h3>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-6 text-center">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {result.tagline}
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Product Description</h3>
          </div>
          <CopyButton text={result.productDescription} />
        </div>
        <p className="text-gray-300 leading-relaxed">{result.productDescription}</p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="w-5 h-5 text-green-400" />
          <h3 className="text-xl font-bold text-white">Campaign Concept</h3>
        </div>
        <p className="text-xl font-semibold text-green-400">{result.campaignConceptName}</p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-5 h-5 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Image Generation Prompts</h3>
        </div>
        <div className="space-y-3">
          {result.imagePrompts.map((prompt, idx) => (
            <div key={idx} className="bg-gray-900/50 rounded-lg p-4 flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-xs font-semibold text-yellow-400 mb-1 block">
                  Prompt {idx + 1}
                </span>
                <p className="text-gray-300 text-sm">{prompt}</p>
              </div>
              <CopyButton text={prompt} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="w-5 h-5 text-pink-400" />
          <h3 className="text-xl font-bold text-white">Social Media Posts</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(result.socialPosts).map(([platform, posts]) => (
            posts && posts.length > 0 && (
              <div key={platform} className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-pink-400 mb-3 uppercase">
                  {platform}
                </h4>
                <div className="space-y-2">
                  {posts.map((post, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3 p-3 bg-gray-800/50 rounded">
                      <p className="text-gray-300 text-sm flex-1">{post}</p>
                      <CopyButton text={post} />
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Hashtag Sets</h3>
        </div>
        <div className="space-y-2">
          {result.hashtagSets.map((set, idx) => (
            <div key={idx} className="bg-gray-900/50 rounded-lg p-3 flex items-center justify-between gap-3">
              <p className="text-cyan-400 text-sm flex-1">{set}</p>
              <CopyButton text={set} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Email Campaign</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-orange-400 mb-2">Subject Lines</h4>
            <div className="space-y-2">
              {result.emailSubjects.map((subject, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-lg p-3 flex items-center justify-between gap-3">
                  <p className="text-gray-300 text-sm flex-1">{subject}</p>
                  <CopyButton text={subject} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-orange-400 mb-2">Email Snippet</h4>
            <div className="bg-gray-900/50 rounded-lg p-4 flex items-start justify-between gap-3">
              <p className="text-gray-300 text-sm flex-1">{result.emailSnippet}</p>
              <CopyButton text={result.emailSnippet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
