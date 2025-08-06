import MapCard from '../../components/map/MapCard';

const MapList = ({ data = [] }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'center',
      marginTop: '24px',
    }}>
      {data.map((item, idx) => (
        <MapCard
          key={item.map_id || idx}
          map_sub_category={item.map_sub_category}
          map_image={item.map_image}
          map_id={item.map_id}
        />
      ))}
    </div>
  );
};

export default MapList;