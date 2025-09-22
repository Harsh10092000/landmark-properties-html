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
      pinCode,
      completeAddress,
      facing,
      ownership,
      otherRooms,
      negotiable,
      rented,
      corner,
      description,
      coverImage,
      otherImages,
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

    // Generate unique listing_id: LM-XXXXXXX (same as add-property)
    let listingId;
    let isUnique = false;
    while (!isUnique) {
      const randomNum = Math.floor(1000000 + Math.random() * 9000000); // 7 digits
      listingId = `LM-${randomNum}`;
      const [rows] = await pool.query('SELECT COUNT(*) as cnt FROM property_module WHERE listing_id = ?', [listingId]);
      if (rows[0].cnt === 0) isUnique = true;
    }

    // Helper to create URL-safe slug parts
    const sanitize = (input) =>
      (input || "")
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/[\s.,/]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    // Build property URL (same pattern as add-property)
    const builtUrl = `${sanitize(areaSize)}-${sanitize(areaUnit)}-${sanitize(propertyType)}-for-${sanitize(adType)}-in-${sanitize(city)}-${listingId}`;

    // Insert property into database
    const insertQuery = `
      INSERT INTO property_module (
         pro_user_type, pro_ad_type, pro_type, pro_sub_cat,
        pro_amt, pro_area_size, pro_area_size_unit, pro_state, pro_city,
        pro_sub_district, pro_locality, pro_street, pro_pincode, pro_facing, pro_desc,
        pro_cover_image, pro_other_images, pro_user_id, 
        pro_listed, pro_negotiable, pro_rental_status, pro_ownership_type,
        pro_corner, pro_other_rooms, listing_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
    `;

    const otherImagesString = otherImages && otherImages.length > 0 ? JSON.stringify(otherImages) : '';
    
    const [result] = await pool.query(insertQuery, [
      userType,
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
      completeAddress || '',
      pinCode,
      facing,
      description,
      coverImage || '',
      otherImagesString,
      userId,
      negotiable ? 'Yes' : 'No',
      rented ? 'Yes' : 'No',
      ownership || 'Freehold',
      corner ? 'Yes' : 'No',
      otherRooms ? JSON.stringify(otherRooms) : null,
      listingId
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
      [builtUrl, propertyId]
    );

    // Send notification emails (same behavior as add-property) - fire-and-forget
    try {
      // Build absolute base URL for server-side fetch
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

      // Fetch property details to include in email
      const [propertyRows] = await pool.query(
        `SELECT 
          pro_id, listing_id, pro_url, pro_type, pro_ad_type, 
          pro_city, pro_state, pro_area_size, pro_area_size_unit,
          pro_amt, pro_amt_unit, pro_cover_image, pro_sub_cat, pro_sub_district
        FROM property_module WHERE pro_id = ?`,
        [propertyId]
      );

      let userForEmail = null;
      try {
        const [userRows] = await pool.query('SELECT id, name, email, phone FROM users WHERE id = ? LIMIT 1', [userId]);
        if (userRows && userRows.length > 0) {
          userForEmail = userRows[0];
        }
      } catch (e) {
        // ignore lookup errors, fallback below
      }

      if (propertyRows && propertyRows.length > 0) {
        const p = propertyRows[0];
        const propertyData = {
          id: p.listing_id,
          title: `${p.pro_type || 'Property'} for ${p.pro_ad_type || 'Sale'} in ${p.pro_city || 'Haryana'}`,
          slug: p.listing_id,
          price: p.pro_amt,
          priceUnit: p.pro_amt_unit || 'Lakh',
          area: p.pro_area_size,
          areaUnit: p.pro_area_size_unit,
          city: p.pro_city,
          subDistrict: p.pro_sub_district,
          propertyType: p.pro_type,
          adType: p.pro_ad_type,
          coverImage: p.pro_cover_image,
          url: `https://landmarkplots.com/${p.pro_url}`
        };

        const userPayload = userForEmail || { id: userId, email: userEmail };

        fetch(`${baseUrl}/api/property/send-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: userPayload, property: propertyData })
        }).catch(() => {});
      }
    } catch (e) {
      // Do not block success on email failures
      console.error('Quick listing: failed to trigger notification emails', e);
    }

    return NextResponse.json({
      success: true,
      propertyId,
      listingId,
      url: builtUrl,
      message: 'Property published successfully!'
    });

  } catch (error) {
    console.error('Error creating quick listing:', error);
    return NextResponse.json(
      { error: 'Failed to create property listing' },
      { status: 500 }
    );
  }
}

