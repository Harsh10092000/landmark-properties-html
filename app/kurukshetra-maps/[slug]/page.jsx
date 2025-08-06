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
