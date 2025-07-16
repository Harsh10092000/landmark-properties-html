import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';

export async function POST(req) {
  try {
    const { propertyId, url } = await req.json();
    if (!propertyId || !url) {
      return NextResponse.json({ error: 'propertyId and url are required' }, { status: 400 });
    }

    console.log("propertyId : ", propertyId);
    console.log("url : ", url);

    // Update the pro_url column in property_module
    await pool.query(
      'UPDATE property_module SET pro_url = ? WHERE pro_id = ?',
      [url, propertyId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating property URL:', error);
    return NextResponse.json({ error: 'Failed to update property URL' }, { status: 500 });
  }
} 