# Robo Creative Engine

Robo Creative Engine is a full-stack, AI-powered application that generates complete creative campaign packages for customised merchandise brands. It is built specifically to automate repetitive creative work required in product launches, seasonal campaigns, and e-commerce merchandising.

Live Demo: https://roboengine.asapabhi.me/
Repository: https://github.com/asapabhii/robo-creative-engine

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
- **AI Provider**: Mistral-7B-Instruct via Hugging Face Inference Router
- **Icons**: Lucide React
- **Runtime**: Node
- **Deployment**: Vercel
- **CI – GitHub**: Actions

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

## Author

Built by [asapabhii](https://github.com/asapabhii)
