# Robo Creative Engine - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js Frontend (React)                  │ │
│  │                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │  FormPanel   │  │ ResultPanel  │  │   History   │ │ │
│  │  │              │  │              │  │    Panel    │ │ │
│  │  │ • Brand Name │  │ • Tagline    │  │             │ │ │
│  │  │ • Product    │  │ • Description│  │ • Last 3    │ │ │
│  │  │ • Audience   │  │ • Social     │  │   Packs     │ │ │
│  │  │ • Voice      │  │ • Hashtags   │  │             │ │ │
│  │  │ • Goal       │  │ • Email      │  │             │ │ │
│  │  │ • Platforms  │  │ • Images     │  │             │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                        │ │
│  │                    app/page.tsx                        │ │
│  │              (State Management & Logic)                │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│                              │ HTTP POST                     │
│                              ▼                               │
└─────────────────────────────────────────────────────────────┘
                               │
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                              │                               │
│                    VERCEL SERVERLESS                         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js API Route (Backend)                  │ │
│  │                                                        │ │
│  │              app/api/generate/route.ts                 │ │
│  │                                                        │ │
│  │  1. Receive CreativePackInput                         │ │
│  │  2. Validate required fields                          │ │
│  │  3. Call generateCreativePack()                       │ │
│  │  4. Return CreativePackOutput                         │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│                              │                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              AI Integration Layer                      │ │
│  │                                                        │ │
│  │                    lib/ai.ts                           │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  buildPrompt(input)                              │ │ │
│  │  │  • Constructs structured prompt                  │ │ │
│  │  │  • Includes JSON schema                          │ │ │
│  │  │  • Adds context and instructions                 │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                      │                                 │ │
│  │                      ▼                                 │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  callLLM(prompt)                                 │ │ │
│  │  │  • HTTP POST to Hugging Face                     │ │ │
│  │  │  • Authorization: Bearer ${HF_API_KEY}           │ │ │
│  │  │  • Parameters: temp, top_p, max_tokens           │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                      │                                 │ │
│  │                      ▼                                 │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  generateCreativePack(input)                     │ │ │
│  │  │  • Orchestrates AI call                          │ │ │
│  │  │  • Parses JSON response                          │ │ │
│  │  │  • Handles errors                                │ │ │
│  │  │  • Returns typed output                          │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│                              │ HTTPS                         │
│                              ▼                               │
└─────────────────────────────────────────────────────────────┘
                               │
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                              │                               │
│                    HUGGING FACE API                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Qwen/Qwen2.5-7B-Instruct Model                 │ │
│  │                                                        │ │
│  │  • 7 billion parameter LLM                            │ │
│  │  • Optimized for instruction following                │ │
│  │  • JSON output capable                                │ │
│  │  • Fast inference (~5-10s)                            │ │
│  │                                                        │ │
│  │  Input: Structured prompt with JSON schema            │ │
│  │  Output: JSON with creative content                   │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User Input                    API Request                  AI Processing
─────────────────────────────────────────────────────────────────────────

┌──────────┐                ┌──────────┐                ┌──────────┐
│  Brand   │                │          │                │          │
│  Product │───────────────▶│   POST   │───────────────▶│  Build   │
│ Audience │                │   /api/  │                │  Prompt  │
│  Voice   │                │ generate │                │          │
│   Goal   │                │          │                │          │
│Platforms │                └──────────┘                └──────────┘
└──────────┘                                                   │
                                                               │
                                                               ▼
                                                        ┌──────────┐
                                                        │  Call    │
                                                        │ Hugging  │
                                                        │  Face    │
                                                        │   API    │
                                                        └──────────┘
                                                               │
                                                               │
Response                   API Response                       ▼
─────────────────────────────────────────────────────────────────────────

┌──────────┐                ┌──────────┐                ┌──────────┐
│ Display  │                │          │                │  Parse   │
│ Results  │◀───────────────│   JSON   │◀───────────────│   JSON   │
│          │                │ Response │                │ Response │
│ • Cards  │                │          │                │          │
│ • Copy   │                │ success: │                │ Extract  │
│ • History│                │   true   │                │  Fields  │
└──────────┘                │ data: {} │                └──────────┘
                            └──────────┘
```

## Component Hierarchy

```
app/page.tsx (Main Container)
│
├─ FormPanel
│  ├─ Brand Name Input
│  ├─ Product Name Input
│  ├─ Target Audience Textarea
│  ├─ Brand Voice Input
│  ├─ Campaign Goal Select
│  ├─ Platform Checkboxes
│  └─ Submit Button (with loading state)
│
├─ ResultPanel (conditional render)
│  ├─ Tagline Card
│  │  └─ Gradient Display
│  │
│  ├─ Product Description Card
│  │  └─ CopyButton
│  │
│  ├─ Campaign Concept Card
│  │
│  ├─ Image Prompts Card
│  │  ├─ Prompt 1 + CopyButton
│  │  ├─ Prompt 2 + CopyButton
│  │  └─ Prompt 3 + CopyButton
│  │
│  ├─ Social Posts Card
│  │  ├─ Instagram Posts + CopyButtons
│  │  ├─ Website Posts + CopyButtons
│  │  ├─ Amazon Posts + CopyButtons
│  │  ├─ Email Posts + CopyButtons
│  │  └─ Other Posts + CopyButtons
│  │
│  ├─ Hashtag Sets Card
│  │  ├─ Set 1 + CopyButton
│  │  ├─ Set 2 + CopyButton
│  │  └─ Set 3 + CopyButton
│  │
│  └─ Email Campaign Card
│     ├─ Subject Lines + CopyButtons
│     └─ Email Snippet + CopyButton
│
└─ HistoryPanel (collapsible)
   ├─ History Item 1 (clickable)
   ├─ History Item 2 (clickable)
   └─ History Item 3 (clickable)
```

## State Management

```
app/page.tsx State:
┌─────────────────────────────────────────┐
│ isLoading: boolean                      │
│ result: CreativePackOutput | null       │
│ error: string | null                    │
│ history: HistoryItem[]                  │
└─────────────────────────────────────────┘
         │
         ├─ handleSubmit(input)
         │  • Sets isLoading = true
         │  • Calls /api/generate
         │  • Updates result or error
         │  • Adds to history
         │  • Sets isLoading = false
         │
         └─ handleHistorySelect(item)
            • Sets result = item.output
            • Clears error
```

## API Contract

### Request
```typescript
POST /api/generate
Content-Type: application/json

{
  brandName: string;        // Required
  productName: string;      // Required
  targetAudience: string;
  brandVoice: string;
  campaignGoal: string;
  platforms: string[];
}
```

### Response (Success)
```typescript
200 OK
Content-Type: application/json

{
  success: true,
  data: {
    tagline: string;
    productDescription: string;
    campaignConceptName: string;
    imagePrompts: string[];
    socialPosts: {
      instagram?: string[];
      website?: string[];
      amazon?: string[];
      email?: string[];
      other?: string[];
    };
    hashtagSets: string[];
    emailSubjects: string[];
    emailSnippet: string;
  }
}
```

### Response (Error)
```typescript
400/500 Error
Content-Type: application/json

{
  success: false,
  error: string;
}
```

## Environment Configuration

```
Development (.env.local):
┌─────────────────────────────────────────┐
│ HF_API_KEY=hf_xxxxxxxxxxxxx             │
│ HF_MODEL=Qwen/Qwen2.5-7B-Instruct       │
└─────────────────────────────────────────┘

Production (Vercel):
┌─────────────────────────────────────────┐
│ Environment Variables:                  │
│ • HF_API_KEY (secret)                   │
│ • HF_MODEL (plain text)                 │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
Developer                 GitHub                  Vercel
──────────────────────────────────────────────────────────

┌──────────┐            ┌──────────┐            ┌──────────┐
│          │   git push │          │  webhook   │          │
│  Local   │───────────▶│  GitHub  │───────────▶│  Vercel  │
│   Dev    │            │   Repo   │            │  Build   │
│          │            │          │            │          │
└──────────┘            └──────────┘            └──────────┘
                                                      │
                                                      │ deploy
                                                      ▼
                                                ┌──────────┐
                                                │  Vercel  │
                                                │  Edge    │
                                                │ Network  │
                                                └──────────┘
                                                      │
                                                      │
                                                      ▼
                                                asapabhi.me
```

## Security Model

```
Client Side                Server Side              External API
────────────────────────────────────────────────────────────────

┌──────────┐            ┌──────────┐            ┌──────────┐
│          │            │          │            │          │
│ No API   │            │ API Key  │            │ Hugging  │
│   Keys   │───────────▶│  Stored  │───────────▶│   Face   │
│          │   HTTPS    │   in     │   HTTPS    │   API    │
│ Visible  │            │   Env    │            │          │
│          │            │  Vars    │            │          │
└──────────┘            └──────────┘            └──────────┘

• Client never sees HF_API_KEY
• All AI calls go through backend
• Environment variables not in git
• HTTPS encryption end-to-end
```

## Performance Optimization

```
Request Flow with Timing:
────────────────────────────────────────

User Click
   │
   ├─ Form Validation (instant)
   │
   ├─ API Call (100-200ms network)
   │
   ├─ Prompt Building (1-2ms)
   │
   ├─ Hugging Face API (5-30s)
   │  ├─ Model Loading (first time: 20-30s)
   │  └─ Inference (subsequent: 5-10s)
   │
   ├─ JSON Parsing (1-2ms)
   │
   ├─ Response Return (100-200ms network)
   │
   └─ UI Update (instant)

Total: 5-30 seconds (mostly AI inference)
```

## Scalability Considerations

```
Current (Free Tier):
• 1000 requests/day (Hugging Face)
• Unlimited bandwidth (Vercel)
• 10s function timeout (Vercel)

Scaling Options:
• Upgrade to Hugging Face Pro ($9/mo)
  → 10,000 requests/day
  → Faster inference
• Add response caching
  → Redis or Vercel KV
  → Cache common queries
• Switch to OpenAI API
  → Higher rate limits
  → Faster responses
  → $0.002 per request
```

This architecture is production-ready, scalable, and maintainable!
