import { CreativePackInput, CreativePackOutput } from './types';

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function callLLM(prompt: string): Promise<string> {
  if (!HF_API_KEY) {
    throw new Error('HF_API_KEY is not configured');
  }

  // Using NEW Hugging Face Router Chat Completions API (OpenAI-compatible)
  const response = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: HF_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.8,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
  }

  const data: ChatCompletionResponse = await response.json();
  
  // Extract content from OpenAI-compatible response format
  if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
    return data.choices[0].message.content;
  }

  throw new Error('Unexpected response format from Hugging Face API');
}

export function buildPrompt(input: CreativePackInput): string {
  const platformsList = input.platforms.join(', ');
  
  // Build socialPosts schema dynamically based on selected platforms
  const platformsLower = input.platforms.map(p => p.toLowerCase());
  const socialPostsSchema: Record<string, string> = {};
  
  platformsLower.forEach(platform => {
    if (platform === 'instagram') {
      socialPostsSchema.instagram = '["Post 1 for Instagram", "Post 2 for Instagram"]';
    } else if (platform === 'website') {
      socialPostsSchema.website = '["Homepage banner text"]';
    } else if (platform === 'amazon') {
      socialPostsSchema.amazon = '["Marketplace listing highlight"]';
    } else if (platform === 'email') {
      socialPostsSchema.email = '["Email campaign teaser text"]';
    } else if (platform === 'other') {
      socialPostsSchema.other = '["General social media post"]';
    }
  });
  
  const socialPostsJson = Object.entries(socialPostsSchema)
    .map(([key, value]) => `    "${key}": ${value}`)
    .join(',\n');
  
  return `You are an expert merch & marketing strategist and copywriter for customized products and gifting companies.

Generate a complete creative pack for the following brand and product:

Brand Name: ${input.brandName}
Product: ${input.productName}
Target Audience: ${input.targetAudience}
Brand Voice: ${input.brandVoice}
Campaign Goal: ${input.campaignGoal}
Platforms: ${platformsList}

Return ONLY valid JSON with no additional text, explanations, or markdown. The JSON must follow this exact structure:

{
  "tagline": "A short, punchy tagline for the product (max 10 words)",
  "productDescription": "A compelling 3-4 sentence product description suitable for website or marketplace",
  "campaignConceptName": "A creative campaign name (2-4 words)",
  "imagePrompts": [
    "Detailed image generation prompt 1 for product mockup or campaign visual",
    "Detailed image generation prompt 2 for product mockup or campaign visual",
    "Detailed image generation prompt 3 for product mockup or campaign visual"
  ],
  "socialPosts": {
${socialPostsJson}
  },
  "hashtagSets": [
    "#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5",
    "#hashtag6 #hashtag7 #hashtag8 #hashtag9 #hashtag10",
    "#hashtag11 #hashtag12 #hashtag13 #hashtag14 #hashtag15"
  ],
  "emailSubjects": [
    "Email subject line 1",
    "Email subject line 2",
    "Email subject line 3"
  ],
  "emailSnippet": "A 2-3 sentence email body snippet that hooks the reader"
}

IMPORTANT: Generate social posts ONLY for these platforms: ${platformsList}. Do not include any other platforms in the socialPosts object.

Generate creative, engaging content that matches the brand voice "${input.brandVoice}" and achieves the goal "${input.campaignGoal}". Return ONLY the JSON object.`;
}

export async function generateCreativePack(
  input: CreativePackInput
): Promise<CreativePackOutput> {
  const prompt = buildPrompt(input);
  const rawResponse = await callLLM(prompt);
  
  let jsonText = rawResponse.trim();
  
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonText = jsonMatch[0];
  }
  
  jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  
  try {
    const parsed = JSON.parse(jsonText);
    
    // Filter socialPosts to only include selected platforms
    const platformsLower = input.platforms.map(p => p.toLowerCase());
    const filteredSocialPosts: Record<string, string[]> = {};
    
    if (parsed.socialPosts && typeof parsed.socialPosts === 'object') {
      platformsLower.forEach(platform => {
        if (parsed.socialPosts[platform] && Array.isArray(parsed.socialPosts[platform])) {
          filteredSocialPosts[platform] = parsed.socialPosts[platform];
        }
      });
    }
    
    const output: CreativePackOutput = {
      tagline: parsed.tagline || 'Your Perfect Merch',
      productDescription: parsed.productDescription || 'A high-quality customized product.',
      campaignConceptName: parsed.campaignConceptName || 'Brand Campaign',
      imagePrompts: Array.isArray(parsed.imagePrompts) ? parsed.imagePrompts : [],
      socialPosts: filteredSocialPosts,
      hashtagSets: Array.isArray(parsed.hashtagSets) ? parsed.hashtagSets : [],
      emailSubjects: Array.isArray(parsed.emailSubjects) ? parsed.emailSubjects : [],
      emailSnippet: parsed.emailSnippet || 'Check out our latest product!',
    };
    
    return output;
  } catch (error) {
    throw new Error(`Failed to parse AI response as JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
