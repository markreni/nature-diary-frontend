import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import type { ObservationType } from '../types/types';
import '../assets/styles/global.css';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const ObservationsMap = ({observations}: {observations: ObservationType[]}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedIdentified, setSelectedIdentified] = useState<string[]>([])

    const observationsWithCoords = observations.filter(obs => obs.coordinates);
    
    const initialPosition: [number, number] = [60.184230669318474, 24.83009157017735] //Otaniemi

    const handleCategoryChange = (values: string[]) => {
        setSelectedCategories(values);
    };
    const handleIdentifiedChange = (values: string[]) => {
        setSelectedIdentified(values);
    };
    const filteredObservations = observationsWithCoords.filter(obs => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(obs.category);
        const identifiedStatus = obs.identified ? 'identified' : 'unidentified';
        const identificationMatch = selectedIdentified.length === 0 || selectedIdentified.includes(identifiedStatus);
        return categoryMatch && identificationMatch;
        
    });

    return (
        /* DEBUG*/
        <>
            <ToggleButtonGroup 
            type="checkbox" 
            value={selectedCategories} 
            onChange={handleCategoryChange}
            className="mb-2"
        >
            <ToggleButton id="tbg-check-1" value={'flora'} variant="outline-primary">
                Flora
            </ToggleButton>
            <ToggleButton id="tbg-check-2" value={'fauna'} variant="outline-primary">
                Fauna
            </ToggleButton>
            <ToggleButton id="tbg-check-3" value={'funga'} variant="outline-primary">
                Funga
            </ToggleButton>
        </ToggleButtonGroup>
            <ToggleButtonGroup
            type="checkbox"
            value={selectedIdentified}
            onChange={handleIdentifiedChange}
            className="mb-2"
        >
            <ToggleButton id="tbg-check-4" value={'identified'} variant="outline-primary">
                Identified
            </ToggleButton>
            <ToggleButton id="tbg-check-5" value={'unidentified'} variant="outline-primary">
                Unidentified
            </ToggleButton>

        </ToggleButtonGroup>

        <MapContainer 
            center={initialPosition} 
            zoom={13} 
            style={{ height: '80vh', width: '100%', borderRadius: '8px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredObservations.map((obs) => (
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
        
        </>
        
    );
    
}

export default ObservationsMap;