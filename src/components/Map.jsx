import React from 'react';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Tooltip,
} from 'react-leaflet';
import data from '../data/camping-spots.json';
import markerRed from '../assets/marker_red.svg';
import { LocationDetails } from './LocationDetails';
import L from 'leaflet';

export default function Map() {
  const [location, setLocation] = React.useState(null);
  const [showDetails, setShowDetails] = React.useState(false);

  const markerForMembers = L.icon({
    iconUrl: markerRed,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const markerClicked = (location) => {
    setLocation(location);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  return (
    <div onClick={() => console.log('click')}>
      <MapContainer
        center={[61.367400001, 25.454300001]}
        zoom={12}
        markerZoomAnimation={true}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          className={'mapTiles'}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {data.map((campingSpot, index) => {
          return (
            <div
              className='marker-wrapper'
              onClick={() => console.log('marker clicked')}
              key={campingSpot.name}
            >
              {campingSpot.membersOnly == 'true' ? (
                <Marker
                  key={index}
                  icon={markerForMembers}
                  position={campingSpot.latlong}
                  eventHandlers={{
                    click: () => {
                      markerClicked(campingSpot);
                    },
                  }}
                >
                  {' '}
                  <Tooltip>{campingSpot.name}</Tooltip>
                </Marker>
              ) : (
                <Marker
                  key={index}
                  position={campingSpot.latlong}
                  tooltipPermanent={true}
                  eventHandlers={{
                    click: () => {
                      markerClicked(campingSpot);
                    },
                  }}
                >
                  <Tooltip>{campingSpot.name}</Tooltip>
                </Marker>
              )}
            </div>
          );
        })}
      </MapContainer>
      {showDetails && (
        <div className='location-details'>
          <LocationDetails location={location} closeHandler={closeDetails} />
        </div>
      )}
    </div>
  );
}
