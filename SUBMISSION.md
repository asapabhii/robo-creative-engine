# SUBMISSION WRITE-UP (≤200 WORDS)

## Robo Creative Engine - AI-Powered Merch Workflow Automation

Robo Creative Engine is a full-stack web application that automates creative workflow generation for customized merch and branding companies. Users input brand details, product information, target audience, and campaign goals, then receive a comprehensive creative pack in one click.

The app generates taglines, product descriptions, campaign concepts, image generation prompts (for tools like Midjourney/DALL·E), platform-specific social media posts, hashtag sets, and email campaign content. This directly addresses the "automation of creative workflows" challenge and is highly relevant to Robo Customized's merch business.

Built with Next.js 14 (App Router) and TypeScript, the frontend features a modern dark-mode UI with Tailwind CSS. The backend uses Next.js API routes to integrate with Hugging Face's Router API, specifically leveraging Qwen/Qwen2.5-7B-Instruct, a powerful open-source LLM optimized for instruction-following tasks.

The AI integration uses carefully crafted prompts that instruct the model to return structured JSON containing all creative assets. The backend parses this response, handles errors gracefully, and returns typed data to the frontend. Session history allows users to revisit previous generations without re-running the AI.

This demonstrates end-to-end full-stack development, real AI model integration, production-ready code quality, and practical utility for merch companies needing rapid creative asset generation.

**Live Demo**: asapabhi.me (after deployment)
**GitHub**: github.com/asapabhii/robo-creative-engine
