"use client";
import React from 'react';

function parseArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export default function PropertiesAmenities({ data }) {
  const otherRooms = parseArray(data?.pro_other_rooms);
  const nearByFacilities = parseArray(data?.pro_near_by_facilities);

  if (otherRooms.length === 0 && nearByFacilities.length === 0) return null;

  return (
    <div className="listing__details--content__step properties__amenities mb-80">
      <h3 className="listing__details--content__title mb-40">Properties Amenities</h3>
      <div className="properties__amenities--wrapper d-flex" style={{ gap: 40 }}>
        {otherRooms.length > 0 && (
          <div style={{ minWidth: 220 }}>
            <div className="step1-label" style={{ fontWeight: 700, marginBottom: 12 }}>Other Rooms</div>
            <ul className="properties__amenities--step">
              {otherRooms.map((item, idx) => (
                <li className="properties__amenities--list d-flex align-items-center" key={item + idx}>
                  <span className="properties__amenities--mark__icon">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span className="properties__amenities--text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {nearByFacilities.length > 0 && (
          <div style={{ minWidth: 220 }}>
            <div className="step1-label" style={{ fontWeight: 700, marginBottom: 12 }}>Near By Facilities</div>
            <ul className="properties__amenities--step">
              {nearByFacilities.map((item, idx) => (
                <li className="properties__amenities--list d-flex align-items-center" key={item + idx}>
                  <span className="properties__amenities--mark__icon">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span className="properties__amenities--text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
