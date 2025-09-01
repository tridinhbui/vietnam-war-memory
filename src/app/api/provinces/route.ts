import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema for province data
const ProvinceSchema = z.object({
  id: z.string(),
  name: z.string(),
  name_en: z.string(),
  region: z.enum(['north', 'central', 'south']),
  centroid: z.array(z.number()).length(2),
  population: z.number(),
  area: z.number(),
  fact: z.string(),
  fact_en: z.string(),
});

const ProvincesArraySchema = z.array(ProvinceSchema);

// Zod schema for query parameters
const QuerySchema = z.object({
  region: z.enum(['north', 'central', 'south']).optional(),
});

// Revalidate every hour
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');

    // Validate query parameters
    const validationResult = QuerySchema.safeParse({ region: region || undefined });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid region parameter', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // Import the provinces data
    const provincesData = await import('../../../data/provinces.json');

    // Validate the data structure
    const provincesValidation = ProvincesArraySchema.safeParse(provincesData.default);

    if (!provincesValidation.success) {
      console.error('Provinces data validation failed:', provincesValidation.error);
      return NextResponse.json(
        { error: 'Data validation failed' },
        { status: 500 }
      );
    }

    let filteredData = provincesValidation.data;

    // Filter by region if specified
    if (validationResult.data.region) {
      filteredData = provincesValidation.data.filter(
        province => province.region === validationResult.data.region
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      region: validationResult.data.region || 'all',
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

