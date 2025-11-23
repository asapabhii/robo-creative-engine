import { NextRequest, NextResponse } from 'next/server';
import { generateCreativePack } from '@/lib/ai';
import { CreativePackInput, GenerateResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreativePackInput = await request.json();
    
    if (!body.brandName || !body.productName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Brand name and product name are required',
        } as GenerateResponse,
        { status: 400 }
      );
    }
    
    const result = await generateCreativePack(body);
    
    return NextResponse.json({
      success: true,
      data: result,
    } as GenerateResponse);
  } catch (error) {
    console.error('Generation error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate creative pack',
      } as GenerateResponse,
      { status: 500 }
    );
  }
}
