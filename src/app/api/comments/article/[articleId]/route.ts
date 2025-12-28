import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await params;

    const response = await fetch(`${STRAPI_URL}/api/comments/article/${articleId}`, {
      next: { revalidate: 60 },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { data: [], error: 'Failed to get comments' },
      { status: 500 }
    );
  }
}
