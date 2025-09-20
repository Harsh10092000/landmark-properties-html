import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const {
      adType,
      userType,
      propertyType,
      propertySubType,
      amount,
      areaSize,
      areaUnit,
      state,
      city,
      subDistrict,
      locality,
      facing,
      description,
      images,
      listingId,
      url,
      userId,
      userEmail
    } = await req.json();

    // Validate required fields
    if (!adType || !propertyType || !amount || !areaSize || !city || !locality || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get current date for expiry calculation
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(expiryDate.getDate() + 30); // Default 30 days expiry

    // Insert property into database
    const insertQuery = `
      INSERT INTO property_module (
        pro_listing_id, pro_url, pro_ad_type, pro_type, pro_sub_type,
        pro_amount, pro_area_size, pro_area_size_unit, pro_state, pro_city,
        pro_sub_district, pro_locality, pro_facing, pro_description,
        pro_images, pro_user_id, pro_user_email, pro_status, expiry_date,
        reminder_sent, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, 0, NOW(), NOW())
    `;

    const imageString = images && images.length > 0 ? images.join(',') : '';
    
    const [result] = await pool.query(insertQuery, [
      listingId,
      url,
      adType,
      propertyType,
      propertySubType,
      amount,
      areaSize,
      areaUnit,
      state,
      city,
      subDistrict,
      locality,
      facing,
      description,
      imageString,
      userId,
      userEmail,
      expiryDate
    ]);

    const propertyId = result.insertId;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Failed to create property listing' },
        { status: 500 }
      );
    }

    // Update the property URL in the database
    await pool.query(
      'UPDATE property_module SET pro_url = ? WHERE pro_id = ?',
      [url, propertyId]
    );

    return NextResponse.json({
      success: true,
      propertyId,
      listingId,
      url,
      message: 'Property listed successfully'
    });

  } catch (error) {
    console.error('Error creating quick listing:', error);
    return NextResponse.json(
      { error: 'Failed to create property listing' },
      { status: 500 }
    );
  }
}

