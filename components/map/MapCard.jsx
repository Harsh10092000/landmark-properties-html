"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MapCard = ({ map_sub_category, map_image, map_id }) => {
const map_url = map_image.replace('.webp', '');
  const imageUrl = `https://adminapi.landmarkplots.com/mapImages/${map_image}`;
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/kurukshetra-maps/${map_url}`)}
      style={{
        display: 'block',
        border: '1px solid #e3e6ee',
        borderRadius: '16px',
        padding: '20px 18px 18px 18px',
        margin: '18px',
        boxShadow: '0 4px 18px rgba(2, 165, 80, 0.10)',
        background: '#fff',
        maxWidth: '340px',
        minWidth: '260px',
        textDecoration: 'none',
        transition: 'box-shadow 0.2s, transform 0.2s',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '16px', gap: '8px' }}>
        <span style={{ color: '#02a550', fontSize: '24px', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#02a550" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 6.13 12.32 6.4 12.6.37.38.97.38 1.34 0C12.87 21.32 19 14.25 19 9c0-3.87-3.13-7-7-7zm0 16.88C10.14 16.09 7 12.28 7 9a5 5 0 1110 0c0 3.28-3.14 7.09-5 9.88z"></path><circle cx="12" cy="9" r="2.5" fill="#02a550"/></svg>
        </span>
        <span style={{ fontWeight: 700, fontSize: '20px', color: '#222', letterSpacing: '0.2px', textShadow: '0 1px 0 #f3f3f3', textAlign: 'left' }}>{map_sub_category}</span>
      </div>
      <div style={{ marginBottom: '22px', background: '#f8f8f8', borderRadius: '10px', padding: '10px', boxShadow: '0 2px 8px rgba(2, 165, 80, 0.07)', width: '100%' }}>
        <img
          src={imageUrl}
          alt={map_sub_category}
          style={{ width: '100%', maxHeight: '220px', objectFit: 'contain', borderRadius: '8px', background: '#f8f8f8', boxShadow: '0 1px 6px rgba(2, 165, 80, 0.07)' }}
        />
      </div>
    </div>
  );
};

export default MapCard;
