import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { ObservationType } from '../types/types';
import '../assets/styles/global.css';
import 'leaflet/dist/leaflet.css';


const ObservationMap = ({obs}: {obs: ObservationType}) => {
    //uses default position if coordinates missing
    const position: [number, number] = obs.coordinates 
        ? [obs.coordinates.lat, obs.coordinates.lng]
        : [60.1699, 24.9384];
    
    return (
        <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '400px', width: '100%', borderRadius: '8px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    <strong>{obs.common_name}</strong><br />
                    {obs.location}
                </Popup>
            </Marker>
        </MapContainer>
    );
    
}

export default ObservationMap;