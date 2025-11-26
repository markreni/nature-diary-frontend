import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { ObservationWithLocation } from '../types/types';
import '../assets/styles/global.css';
import 'leaflet/dist/leaflet.css';


const ObservationMap = ({obs}: {obs: ObservationWithLocation}) => {
    //uses default position if coordinates missing
    const position: [number, number] = obs.location 
        ? [obs.location.lat, obs.location.lng]
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
            {obs.location &&( 
                <Marker position={position}>
                    <Popup>
                        {!obs.identified ?
                            <strong>{obs.common_name}</strong> :
                        <strong>Unidentified</strong>
                        }
                    </Popup>
                </Marker>
    
            )}
            
        </MapContainer>
    );
    
}

export default ObservationMap;