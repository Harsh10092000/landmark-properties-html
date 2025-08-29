import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';

export async function GET() {
  try {
    console.log('API: Starting to fetch property data...');
    const db = await pool;
    console.log('API: Database connection established');
    
    // Fetch all listed properties with essential details
    const q = `SELECT 
      pro_id,
      pro_ad_type,
      pro_amt,
      pro_locality,
      pro_washrooms,
      pro_bedroom,
      pro_area_size,
      pro_area_size_unit,
      pro_user_id,
      pro_user_type,
      pro_url,
      listing_id,
      pro_type,
      pro_sub_cat,
      pro_city,
      pro_sub_district,
      pro_state,
      pro_street,
      pro_cover_image,
      pro_creation_date,
      pro_views,
      pro_furnishing,
      pro_approval,
      pro_possession,
      pro_parking
    FROM property_module 
    WHERE pro_listed = 1 
    ORDER BY pro_id DESC`;
    
    console.log('API: Executing query:', q);
    const [rows] = await db.query(q);
    console.log('API: Query executed, rows count:', rows?.length || 0);
    
    if (!rows || rows.length === 0) {
      console.log('API: No properties found in database');
      return NextResponse.json([]);
    }
    
    console.log('API: Returning properties:', rows.length);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('API: Error fetching property data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property data', details: error.message },
      { status: 500 }
    );
  }
}
