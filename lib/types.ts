export interface CreativePackInput {
  brandName: string;
  productName: string;
  targetAudience: string;
  brandVoice: string;
  campaignGoal: string;
  platforms: string[];
}

export interface SocialPosts {
  instagram?: string[];
  website?: string[];
  amazon?: string[];
  email?: string[];
  other?: string[];
}

export interface CreativePackOutput {
  tagline: string;
  productDescription: string;
  campaignConceptName: string;
  imagePrompts: string[];
  socialPosts: SocialPosts;
  hashtagSets: string[];
  emailSubjects: string[];
  emailSnippet: string;
}

export interface GenerateResponse {
  success: boolean;
  data?: CreativePackOutput;
  error?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: CreativePackInput;
  output: CreativePackOutput;
}
