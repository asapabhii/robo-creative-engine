# Robo Creative Engine

AI-powered workflow automation for customized merch and marketing campaigns. Generate complete creative packs including taglines, product descriptions, social media posts, image prompts, hashtags, and email content in one click.

## Features

- **Complete Creative Packs**: Generate taglines, descriptions, social posts, hashtags, email content, and image prompts
- **Multi-Platform Support**: Tailored content for Instagram, Website, Amazon, Email, and more
- **Real AI Integration**: Powered by Hugging Face's LLM models (Qwen/Qwen2.5-7B-Instruct by default)
- **Modern UI**: Dark-mode interface with gradient accents and smooth animations
- **Session History**: Keep track of your last 3 generated creative packs
- **Copy-to-Clipboard**: Easy copying of any generated content

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Provider**: Hugging Face Inference API
- **Icons**: Lucide React
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- A Hugging Face account and API key (free tier available)

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:asapabhii/robo-creative-engine.git
cd robo-creative-engine
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Hugging Face API key:

```env
HF_API_KEY=your_huggingface_api_key_here
HF_MODEL=Qwen/Qwen2.5-7B-Instruct
```

To get a Hugging Face API key:
1. Go to https://huggingface.co/
2. Sign up or log in
3. Go to Settings → Access Tokens
4. Create a new token with read permissions

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `HF_API_KEY`: Your Hugging Face API key
   - `HF_MODEL`: `Qwen/Qwen2.5-7B-Instruct`
6. Click "Deploy"

### Connect Custom Domain (asapabhi.me)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain: `asapabhi.me`
3. Vercel will provide DNS configuration instructions
4. Go to your domain registrar's DNS settings
5. Add the following records (values provided by Vercel):
   - **A Record**: `@` → Vercel's IP address
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
6. Wait for DNS propagation (can take up to 48 hours, usually much faster)
7. Vercel will automatically provision an SSL certificate

## Project Structure

```
robo-creative-engine/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for AI generation
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main page component
│   └── globals.css               # Global styles
├── components/
│   ├── FormPanel.tsx             # Input form component
│   ├── ResultPanel.tsx           # Results display component
│   ├── HistoryPanel.tsx          # Session history component
│   └── CopyButton.tsx            # Copy-to-clipboard button
├── lib/
│   ├── ai.ts                     # Hugging Face integration
│   └── types.ts                  # TypeScript type definitions
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Usage

1. Fill in the campaign details:
   - Brand name (required)
   - Product name/type (required)
   - Target audience
   - Brand voice/tone
   - Campaign goal
   - Target platforms

2. Click "Generate Workflow Assets"

3. Wait 10-30 seconds for AI generation

4. Review and copy generated content:
   - Tagline
   - Product description
   - Campaign concept
   - Image generation prompts
   - Platform-specific social posts
   - Hashtag sets
   - Email subject lines and snippet

5. Access previous generations from the History panel

## AI Model Configuration

The default model is `Qwen/Qwen2.5-7B-Instruct`, which provides good quality and speed. You can change the model by updating the `HF_MODEL` environment variable.

Alternative models to try:
- `meta-llama/Llama-2-7b-chat-hf`
- `tiiuae/falcon-7b-instruct`
- `HuggingFaceH4/zephyr-7b-beta`

Note: Some models may require additional permissions or have different rate limits.

## Troubleshooting

### API Key Issues
- Ensure your `HF_API_KEY` is correctly set in `.env.local`
- Verify the key has read permissions on Hugging Face

### Model Loading Errors
- Some models may take 20-30 seconds to "warm up" on first request
- Try again if you get a timeout error

### JSON Parsing Errors
- The AI model occasionally returns malformed JSON
- The app includes fallback parsing logic
- If errors persist, try a different model

## Git Setup

```bash
git init
git add .
git commit -m "Initial commit: Robo Creative Engine"
git branch -M main
git remote add origin git@github.com:asapabhii/robo-creative-engine.git
git push -u origin main
```

## License

MIT

## Author

Built by [asapabhii](https://github.com/asapabhii) for the Robo Customized AI + Full-Stack Engineering Internship challenge.
