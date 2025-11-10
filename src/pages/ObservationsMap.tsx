import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { ObservationType } from '../types/types';
import '../assets/styles/global.css';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

const ObservationsMap = ({observations}: {observations: ObservationType[]}) => {
    const observationsWithCoords = observations.filter(obs => obs.coordinates);
    
    const initialPosition: [number, number] = [60.184230669318474, 24.83009157017735] //Otaniemi
    return (
        <MapContainer 
            center={initialPosition} 
            zoom={13} 
            style={{ height: '80vh', width: '100%', borderRadius: '8px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {observationsWithCoords.map((obs) => (
                <Marker 
                    key={obs.id}
                    position={[obs.coordinates!.lat, obs.coordinates!.lng]}
                >
                    <Popup>
                        <strong>{obs.common_name}</strong><br />
                        {obs.scientific_name}<br />
                        {obs.location}<br />
                        <Link to={`/observations/${obs.id}`}>View details</Link>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
    
}

export default ObservationsMap;