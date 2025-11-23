# Quick Start Guide

Get Robo Creative Engine running in 5 minutes.

## Step 1: Get Hugging Face API Key (2 minutes)

1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Name it "robo-creative-engine"
4. Select "Read" permission
5. Click "Generate"
6. Copy the token (starts with `hf_...`)

## Step 2: Clone and Setup (1 minute)

```bash
# Clone the repo
git clone git@github.com:asapabhii/robo-creative-engine.git
cd robo-creative-engine

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

## Step 3: Configure Environment (30 seconds)

Edit `.env.local` and paste your API key:

```env
HF_API_KEY=hf_your_actual_token_here
HF_MODEL=Qwen/Qwen2.5-7B-Instruct
```

## Step 4: Run (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000

## Step 5: Test (1 minute)

Fill in the form:
- Brand Name: "Robo Customized"
- Product: "Custom T-Shirts"
- Target Audience: "Young professionals"
- Brand Voice: "playful"
- Campaign Goal: "Product Launch"
- Platforms: Check "Instagram" and "Website"

Click "Generate Workflow Assets" and wait 10-30 seconds.

## Troubleshooting

### "HF_API_KEY is not configured"
- Make sure `.env.local` exists in the root directory
- Verify the API key is correct (starts with `hf_`)
- Restart the dev server after creating `.env.local`

### "Model is loading"
- First request can take 20-30 seconds
- Try again after waiting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

## Deploy to Vercel (5 minutes)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:asapabhii/robo-creative-engine.git
git push -u origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Add environment variables:
   - `HF_API_KEY`: Your Hugging Face token
   - `HF_MODEL`: `Qwen/Qwen2.5-7B-Instruct`
5. Click "Deploy"
6. Wait 2-3 minutes
7. Your app is live!

## Connect Custom Domain

1. In Vercel dashboard → Settings → Domains
2. Add `asapabhi.me`
3. Follow DNS instructions from Vercel
4. Add A record and CNAME to your domain registrar
5. Wait for DNS propagation (5 minutes to 48 hours)

Done! 🚀
