import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { useRef, useEffect } from 'react';

const MapController = ({ flyToCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (flyToCoords) {
      map.flyTo(flyToCoords, 8, { animate: true, duration: 2 });
    }
  }, [flyToCoords, map]);
  return null;
};

const MapView = ({ data, flyToCoords }) => {
  const createCustomIcon = (type) => {
    const typeClass = type === 'OSINT' ? 'marker-osint' : type === 'HUMINT' ? 'marker-humint' : 'marker-imint';
    return L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-targeting ${typeClass}"><div class="marker-pulse"></div></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#050505] overflow-hidden">
      {/* Visual Overlays */}
      <div className="scanlines"></div>
      <div className="radar-sweep"></div>
      
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-10"
      >
        <MapController flyToCoords={flyToCoords} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        
        {data.map((point) => (
          <Marker 
            key={point.id} 
            position={[point.latitude, point.longitude]}
            icon={createCustomIcon(point.type)}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              }
            }}
          >
            <Popup 
              className="premium-popup border-none bg-transparent m-0 p-0 shadow-none"
              closeButton={false}
            >
              <MarkerPopup point={point} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
