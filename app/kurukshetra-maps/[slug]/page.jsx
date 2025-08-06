import pool from '../../libs/mysql';

const getMapById = async (id) => {
  try {
    const db = await pool;
    const url = id + ".webp";
    const q = `SELECT * FROM city_map_module WHERE map_image = ? LIMIT 1`;
    const [rows] = await db.query(q, [url]);
    return rows && rows[0] ? rows[0] : null;
  } catch (err) {
    return null;
  }
};


export async function generateMetadata({ params }, parent) {
    const { slug } = params;
    if (!slug) {
      return <div>Invalid Property ID</div>;
    }
    const arrproId = slug.split("-");
    const proId = arrproId[arrproId.length - 1];
    const url = slug + ".webp";
    const db = await pool;
    const q1 = "SELECT map_image, map_sub_category from city_map_module WHERE map_image = ?";
    const [images] = await db.query(q1, [url]);
    const mapName = images[0]?.map_sub_category || slug.replace(/-/g, ' ');
    const title = `${mapName} Map - Kurukshetra City Map | Landmark Plots`;
    const desc = `View and download the map of ${mapName}, Kurukshetra. High-quality, updated city maps for navigation, planning, and property search by Landmark Plots.`;

    return {
      title,
      description: desc,
      openGraph: {
        type: "website",
        url: `https://landmarkplots.com/kurukshetra-maps/${slug}`,
        title,
        description: desc,
        images: [
          {
            url:
              images[0] !== undefined
                ? `https://adminapi.landmarkplots.com/mapImages/${images[0].map_image}`
                : "https://landmarkplots.com/uploads/default.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      metadataBase: new URL("https://landmarkplots.com"),
      alternates: {
        canonical: `https://landmarkplots.com/kurukshetra-maps/${slug}`,
      },
    };
  }

const MapDetailPage = async ({ params }) => {
  const { slug } = params;
  const map = await getMapById(slug);
  if (!map) {
    return <div style={{ textAlign: 'center', margin: '60px 0', color: '#e74c3c', fontWeight: 600 }}>Map not found.</div>;
  }
  const imageUrl = `https://adminapi.landmarkplots.com/mapImages/${map.map_image}`;
  return (
    <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <h1
          style={{
            color: '#02a550',
            fontWeight: 800,
            fontSize: '2.7rem',
            margin: 0,
            letterSpacing: '0.5px',
            textShadow: '0 2px 8px rgba(2,165,80,0.08)',
            textAlign: 'center',
            lineHeight: 1.15,
          }}
        >
          {map.map_sub_category}
        </h1>
        <div style={{
          width: 64,
          height: 5,
          background: 'linear-gradient(90deg, #02a550 60%, #3d787a 100%)',
          borderRadius: 3,
          marginTop: 10,
        }} />
      </div>
      <div style={{ background: '#f8f8f8', borderRadius: '14px', boxShadow: '0 2px 12px rgba(2, 165, 80, 0.10)', padding: 24, textAlign: 'center' }}>
        <img
          src={imageUrl}
          alt={map.map_sub_category}
          style={{ width: '100%', objectFit: 'contain', borderRadius: '10px', background: '#fff', boxShadow: '0 1px 8px rgba(2, 165, 80, 0.10)' }}
        />
      </div>
    </div>
  );
};

export default MapDetailPage;
