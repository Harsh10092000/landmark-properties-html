import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { step, data, propertyId } = await req.json();
    
    if (!step || !data) {
      return NextResponse.json(
        { error: 'Step and data are required' },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    let result;

    switch (step) {
      case 1:
        // Save basic details
        if (propertyId) {
          result = await pool.query(
            `UPDATE property_module SET 
             pro_user_type = ?, 
             pro_ad_type = ?, 
             pro_type = ?, 
             pro_sub_cat = ?
             WHERE pro_id = ? AND pro_user_id = ?`,
            [data.userType, data.adType, data.propertyType, data.propertySubType, propertyId, userId]
          );
        } else {
          // Generate unique listing_id: LM-XXXXXXX
          let listingId;
          let isUnique = false;
          while (!isUnique) {
            const randomNum = Math.floor(1000000 + Math.random() * 9000000); // 7 digits
            listingId = `LM-${randomNum}`;
            const [rows] = await pool.query('SELECT COUNT(*) as cnt FROM property_module WHERE listing_id = ?', [listingId]);
            if (rows[0].cnt === 0) isUnique = true;
          }
          result = await pool.query(
            `INSERT INTO property_module 
             (pro_user_type, pro_ad_type, pro_type, pro_sub_cat, pro_user_id, pro_listed, listing_id) 
             VALUES (?, ?, ?, ?, ?, 0, ?)`,
            [data.userType, data.adType, data.propertyType, data.propertySubType, userId, listingId]
          );
        }
        break;

      case 2:
        // Save location details
        if (propertyId) {
          result = await pool.query(
            `UPDATE property_module SET 
             pro_plot_no = ?, 
             pro_state = ?, 
             pro_city = ?, 
             pro_sub_district = ?, 
             pro_locality = ?, 
             pro_street = ?, 
             pro_pincode = ?
             WHERE pro_id = ? AND pro_user_id = ?`,
            [data.plotNumber, data.state, data.city, data.subDistrict, data.locality, data.completeAddress, data.pinCode, propertyId, userId]
          );
        } else {
          return NextResponse.json(
            { error: 'Property ID required for step 2' },
            { status: 400 }
          );
        }
        break;

      case 3:
        // Save property details
        if (propertyId) {
          result = await pool.query(
            `UPDATE property_module SET 
             pro_bedroom = ?, 
             pro_washrooms = ?, 
             pro_balcony = ?, 
             pro_parking = ?, 
             pro_floor = ?, 
             pro_area_size = ?, 
             pro_area_size_unit = ?, 
             pro_facing = ?, 
             pro_furnishing = ?, 
             pro_possession = ?, 
             pro_open_sides = ?,
             pro_plot_no = ?,
             pro_length = ?,
             pro_width = ?,
             pro_age = ?,
             pro_facing_road_width = ?,
             pro_facing_road_unit = ?
             WHERE pro_id = ? AND pro_user_id = ?`,
            [
              data.bedrooms, data.washrooms, data.balconies, data.parking, 
              data.floors, data.areaSize, data.areaUnit, data.facing, 
              data.furnishing, data.possession, data.sides,
              data.plotNumber, data.plotLength, data.plotWidth,
              data.age, data.roadWidth, data.roadWidthUnit,
              propertyId, userId
            ]
          );
        } else {
          return NextResponse.json(
            { error: 'Property ID required for step 3' },
            { status: 400 }
          );
        }
        break;

      case 4:
        // Save cover image and other images
        if (propertyId) {
          result = await pool.query(
            `UPDATE property_module SET 
             pro_cover_image = ?,
             pro_other_images = ?
             WHERE pro_id = ? AND pro_user_id = ?`,
            [
              data.coverImage,
              JSON.stringify(data.otherImages),
              propertyId, userId
            ]
          );
        } else {
          return NextResponse.json(
            { error: 'Property ID required for step 4' },
            { status: 400 }
          );
        }
        break;

      case 5:
        // Save pricing and other details
        if (propertyId) {
          const isComplete = data.isComplete || false;
          result = await pool.query(
            `UPDATE property_module SET 
             pro_amt = ?, 
             pro_amt_unit = ?, 
             pro_negotiable = ?, 
             pro_rental_status = ?,
             pro_ownership_type = ?,
             pro_approval = ?,
             pro_desc = ?,
             pro_near_by_facilities = ?,
             pro_corner = ?,
             pro_other_rooms = ?,
             pro_listed = ?
             WHERE pro_id = ? AND pro_user_id = ?`,
            [
              data.price, data.priceUnit, data.negotiable, data.rentalStatus,
              data.ownership, data.authority, data.desc, 
              JSON.stringify(data.facilities), data.corner ? "Yes" : "No",
              JSON.stringify(data.otherRooms) || null,
              isComplete ? 1 : 0, propertyId, userId
            ]
          );

          if (isComplete) {
            await pool.query(
              `UPDATE users SET 
               name = COALESCE(?, name), 
               phone = COALESCE(?, phone)
               WHERE id = ?`,
              [data.contactName || session.user.name, data.contactPhone || session.user.phone, userId]
            );
          }
        } else {
          return NextResponse.json(
            { error: 'Property ID required for step 5' },
            { status: 400 }
          );
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid step number' },
          { status: 400 }
        );
    }

    const propertyIdToReturn = propertyId || result[0].insertId;
    // Return listing_id in response for step 1
    let listingIdToReturn = null;
    if (step === 1) {
      if (propertyId) {
        // Fetch existing listing_id
        const [rows] = await pool.query('SELECT listing_id FROM property_module WHERE pro_id = ?', [propertyIdToReturn]);
        listingIdToReturn = rows[0]?.listing_id || null;
      } else {
        listingIdToReturn = result[0].insertId ? (typeof listingId !== 'undefined' ? listingId : null) : null;
        // If not set, fetch from DB
        if (!listingIdToReturn) {
          const [rows] = await pool.query('SELECT listing_id FROM property_module WHERE pro_id = ?', [propertyIdToReturn]);
          listingIdToReturn = rows[0]?.listing_id || null;
        }
      }
    }
    return NextResponse.json({ 
      success: true, 
      propertyId: propertyIdToReturn,
      listingId: listingIdToReturn,
      message: step === 5 && data.isComplete ? 'Property published successfully!' : `Step ${step} data saved successfully` 
    });

  } catch (error) {
    console.error('Save step error:', error);
    return NextResponse.json(
      { error: 'Failed to save step data' },
      { status: 500 }
    );
  }
} 