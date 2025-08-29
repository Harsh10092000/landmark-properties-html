"use client"
import React, { useEffect, useRef } from 'react';

// Usage: <Map formatted_address={...} />
const Map = ({ formatted_address }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!formatted_address) return;

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLzo_eOh509ONfCjn1XQp0ZM2pacPdnWc&libraries=places`;
    
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.body.appendChild(script);
    } else {
      initializeMap();
    }
    // eslint-disable-next-line
  }, [formatted_address]);

  const initializeMap = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: formatted_address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15,
        });
        // Property marker
        new window.google.maps.Marker({
          map: googleMapRef.current,
          position: location,
          label: 'P',
          title: 'Property Location',
        });
        // Find best nearby places
        const service = new window.google.maps.places.PlacesService(googleMapRef.current);
        const request = {
          location,
          radius: 1500, // meters
          type: [
            'school', 'hospital', 'restaurant', 'supermarket', 'park', 'atm', 'bank', 'pharmacy', 'shopping_mall', 'bus_station', 'train_station', 'subway_station', 'university', 'movie_theater', 'gym', 'police', 'fire_station', 'post_office', 'library', 'museum', 'tourist_attraction'
          ],
        };
        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length) {
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = results.slice(0, 10).map(place => {
              const marker = new window.google.maps.Marker({
                map: googleMapRef.current,
                position: place.geometry.location,
                label: place.name[0],
                title: place.name,
              });
              const infowindow = new window.google.maps.InfoWindow({
                content: `<div><strong>${place.name}</strong><br/>${place.vicinity || ''}<br/>${place.types[0]}</div>`
              });
              marker.addListener('click', () => {
                infowindow.open(googleMapRef.current, marker);
              });
              return marker;
            });
          }
        });
      }
    });
  };

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} ref={mapRef} />
  );
};

export default Map;
// NOTE: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key above.
