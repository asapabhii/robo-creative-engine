# Robo Creative Engine - Complete Project Structure

## File Tree

```
robo-creative-engine/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD pipeline
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts              # POST /api/generate - AI generation endpoint
│   ├── globals.css                   # Global Tailwind styles
│   ├── layout.tsx                    # Root layout with metadata
│   └── page.tsx                      # Main application page
├── components/
│   ├── CopyButton.tsx                # Reusable copy-to-clipboard button
│   ├── FormPanel.tsx                 # Campaign input form
│   ├── HistoryPanel.tsx              # Session history display
│   └── ResultPanel.tsx               # Generated content display
├── lib/
│   ├── ai.ts                         # Hugging Face API integration
│   └── types.ts                      # TypeScript type definitions
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore configuration
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies and scripts
├── postcss.config.js                 # PostCSS configuration
├── README.md                         # Complete setup and usage guide
├── SUBMISSION.md                     # Job submission write-up
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

## Key Files Explained

### Frontend Components

- **app/page.tsx**: Main application logic, state management, API calls
- **components/FormPanel.tsx**: Form with brand/product inputs, platform selection
- **components/ResultPanel.tsx**: Displays all generated creative assets in organized cards
- **components/HistoryPanel.tsx**: Collapsible history of last 3 generations
- **components/CopyButton.tsx**: Copy-to-clipboard with visual feedback

### Backend & AI

- **app/api/generate/route.ts**: Next.js API route handling POST requests
- **lib/ai.ts**: 
  - `callLLM()`: Makes HTTP requests to Hugging Face API
  - `buildPrompt()`: Constructs structured prompts for the LLM
  - `generateCreativePack()`: Orchestrates AI call and JSON parsing

### Type Safety

- **lib/types.ts**: TypeScript interfaces for:
  - `CreativePackInput`: Form data structure
  - `CreativePackOutput`: AI response structure
  - `GenerateResponse`: API response wrapper
  - `HistoryItem`: Session history item

## Data Flow

1. User fills form → FormPanel
2. FormPanel calls onSubmit → page.tsx
3. page.tsx sends POST to /api/generate
4. route.ts calls generateCreativePack()
5. ai.ts builds prompt and calls Hugging Face
6. Response parsed as JSON
7. Data returned to frontend
8. ResultPanel displays content
9. HistoryPanel stores in session state

## Environment Variables

Required in `.env.local`:
- `HF_API_KEY`: Hugging Face API token
- `HF_MODEL`: Model identifier (default: Qwen/Qwen2.5-7B-Instruct)

## API Endpoints

### POST /api/generate

**Request Body:**
```json
{
  "brandName": "string",
  "productName": "string",
  "targetAudience": "string",
  "brandVoice": "string",
  "campaignGoal": "string",
  "platforms": ["string"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tagline": "string",
    "productDescription": "string",
    "campaignConceptName": "string",
    "imagePrompts": ["string"],
    "socialPosts": {
      "instagram": ["string"],
      "website": ["string"],
      "amazon": ["string"],
      "email": ["string"],
      "other": ["string"]
    },
    "hashtagSets": ["string"],
    "emailSubjects": ["string"],
    "emailSnippet": "string"
  }
}
```

## Styling Approach

- Dark theme with purple/pink gradient accents
- Tailwind utility classes for rapid development
- Responsive grid layout (2-column desktop, stacked mobile)
- Loading states with animated spinners
- Hover effects and smooth transitions
- Card-based content organization


## Next Steps After Setup

1. Get Hugging Face API key
2. Run `npm install`
3. Create `.env.local` with API key
4. Run `npm run dev`
5. Test locally at localhost:3000


## Performance Considerations

- API route runs on serverless functions (fast cold starts)
- Client-side state management (no database needed)
- Optimized bundle size with Next.js 14
- Lazy loading of components
- Efficient re-renders with React state

## Security

- API keys stored in environment variables
- No client-side exposure of secrets
- Server-side API calls only
- Input validation on backend
- Error messages don't leak sensitive info
