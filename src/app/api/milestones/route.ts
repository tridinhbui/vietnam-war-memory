import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema for milestone data validation
const MilestoneSchema = z.object({
  year: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  source: z.string(),
});

const MilestonesArraySchema = z.array(MilestoneSchema);

// Zod schema for query parameters
const QuerySchema = z.object({
  lang: z.enum(['vi', 'en']).default('vi'),
});

// Revalidate every hour
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'vi';

    // Validate query parameters
    const validationResult = QuerySchema.safeParse({ lang });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid language parameter', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const validatedLang = validationResult.data.lang;

    // Import the appropriate milestones file based on language
    const milestonesData = validatedLang === 'vi'
      ? await import('../../../data/milestones.vi.json')
      : await import('../../../data/milestones.en.json');

    // Validate the data structure
    const milestonesValidation = MilestonesArraySchema.safeParse(milestonesData.default);

    if (!milestonesValidation.success) {
      console.error('Milestones data validation failed:', milestonesValidation.error);
      return NextResponse.json(
        { error: 'Data validation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: milestonesValidation.data,
      language: validatedLang,
      total: milestonesValidation.data.length,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

