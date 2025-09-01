import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema for indicator data points
const IndicatorPointSchema = z.object({
  year: z.number(),
  value: z.number(),
  label: z.string(),
});

const IndicatorArraySchema = z.array(IndicatorPointSchema);

// Zod schema for the full indicators object
const IndicatorsSchema = z.object({
  gdp_growth: IndicatorArraySchema,
  gdp_per_capita: IndicatorArraySchema,
  life_expectancy: IndicatorArraySchema,
  literacy_rate: IndicatorArraySchema,
});

// Revalidate every hour
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Import the indicators data
    const indicatorsData = await import('../../../data/indicators.json');

    // Validate the data structure
    const indicatorsValidation = IndicatorsSchema.safeParse(indicatorsData.default);

    if (!indicatorsValidation.success) {
      console.error('Indicators data validation failed:', indicatorsValidation.error);
      return NextResponse.json(
        { error: 'Data validation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: indicatorsValidation.data,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

