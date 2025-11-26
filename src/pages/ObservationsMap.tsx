import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import type { ObservationType, ObservationWithLocation } from '../types/types';
import '../assets/styles/global.css';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton, Form, InputGroup } from 'react-bootstrap';
import observationsService  from '../services/observationService.ts';
import { IoSearch } from "react-icons/io5";

const ObservationsMap = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedIdentified, setSelectedIdentified] = useState<string[]>([]);
    const [observations, setObservations] = useState<ObservationType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const loadObservations = async () => {
        try {
          setLoading(true);
          const data = await observationsService.getAllObservations(1, 1000); 
          console.log(data);
          setObservations(data.observations);
          console.log(observations);
          
        } catch (err) {
          console.error("Failed to fetch observations:", err);
        } finally {
          setLoading(false);
        }
    };
    
    useEffect(() =>{
        loadObservations();
    }, []);

    const observationsWithCoords = observations.filter(obs => obs.location);
    
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
        const nameMatch = searchQuery === "" ||
            obs.common_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            obs.scientific_name?.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && identificationMatch && nameMatch;
        
    });

    return (
        <>
        {loading ? <p>Loading...</p> :
            <>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-2">
                <div className="mb-2" style={{ maxWidth: '300px' }}>
                    <InputGroup>
                    <InputGroup.Text>
                        <IoSearch />
                    </InputGroup.Text>
                    <Form.Control 
                        type="text"
                        placeholder="Search by species name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    </InputGroup>
                </div>
                <ToggleButtonGroup 
                type="checkbox" 
                value={selectedCategories} 
                onChange={handleCategoryChange}
                className="mb-2 me-2"
                >
                    <ToggleButton id="tbg-check-1" value={'flora'} variant="outline-success">
                        Flora
                    </ToggleButton>
                    <ToggleButton id="tbg-check-2" value={'fauna'} variant="outline-success">
                        Fauna
                    </ToggleButton>
                    <ToggleButton id="tbg-check-3" value={'funga'} variant="outline-success">
                        Funga
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    type="checkbox"
                    value={selectedIdentified}
                    onChange={handleIdentifiedChange}
                    className="mb-2"
                    >
                    {/* Reverse logic here because of backend*/}
                    <ToggleButton id="tbg-check-4" value={'unidentified'} variant="outline-success"> 
                        Identified
                    </ToggleButton>
                    <ToggleButton id="tbg-check-5" value={'identified'} variant="outline-success">
                        Unidentified
                    </ToggleButton>
            </ToggleButtonGroup>
        </div>
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
                    position={[obs?.location?.lat, obs?.location?.lng]}
                >
                {/*Observation can be identified or unidentified*/}
                {obs.identified ?
                    <Popup>
                        <strong>Unidentified</strong><br />
                        Category: {obs.category}<br />
                        <Link to={`/observations/${obs.id}`}>View details</Link>
                    </Popup>
                    :
                    <Popup>
                        <strong>{obs.common_name}</strong><br />
                        Category: {obs.category}<br />
                        <Link to={`/observations/${obs.id}`}>View details</Link>
                    </Popup>

                }
                </Marker>
            ))}
        </MapContainer>
        </>
        }
        </>
    );
    
}

export default ObservationsMap;
