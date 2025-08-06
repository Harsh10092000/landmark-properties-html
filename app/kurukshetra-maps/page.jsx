
import React from "react";
import pool from "../libs/mysql";
import MapList from "./MapList";

export const generateMetadata = () => ({
  title: 'Kurukshetra Maps - Download & View Kurukshetra City Maps Online | Landmark Plots',
  description: 'Explore and download high-quality maps of Kurukshetra city. Find location-wise Kurukshetra maps for planning, navigation, and property search. Updated and accurate maps by Landmark Plots.',
  openGraph: {
    type: 'website',
    url: 'https://landmarkplots.com/kurukshetra-maps',
    title: 'Kurukshetra Maps - Download & View Kurukshetra City Maps Online | Landmark Plots',
    description: 'Explore and download high-quality maps of Kurukshetra city. Find location-wise Kurukshetra maps for planning, navigation, and property search. Updated and accurate maps by Landmark Plots.',
    images: [
      {
        url: 'https://adminapi.landmarkplots.com/mapImages/landmark-properties-kurukshetra-map.webp',
        width: 1200,
        height: 630,
        alt: 'Kurukshetra Maps',
      },
    ],
  },
  alternates: {
    canonical: 'https://landmarkplots.com/kurukshetra-maps',
  },
});

const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT * FROM city_map_module where map_city = 'Kurukshetra' ORDER BY map_id DESC`;
    const [rows] = await db.query(q);
    return { row: rows };
  } catch (err) {
    return err;
  }
};

const page = async ({ searchParams }) => {
  const res = await getData();
  const data = res.row;

  return (
    <div className="container">
      <title>Landmark Plots - Kurukshetra Maps</title>
      <meta name="description" content="Kurukshetra Maps" />
      <meta name="author" content="Landmark Plots" />
      <link rel="canonical" href="https://landmarkplots.com/kurukshetra-maps" />

      <h1 style={{ textAlign: 'center', color: '#02a550', margin: '32px 0 12px', fontWeight: 700, fontSize: '2rem' }}>Kurukshetra Maps</h1>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '24px' }}>Explore maps by location below.</p>

      <div style={{ display: "none" }}>
        {data.map((item, index) => (
          <a key={index} href={`/${item.map_image}`}>
            {item.map_image}
          </a>
        ))}
      </div>

        <MapList data={data}  />
    </div>
  );
};

export default page;
