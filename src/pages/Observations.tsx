import { useState } from 'react';
import { Col, Row, Form, InputGroup, Dropdown } from 'react-bootstrap';
import type { CategoryType, DiscoveryType, ObservationType } from '../types/types';
//import Observation from '../components/Observation';
import SingleObservation from '../components/SingleObservation';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";

const Observations = ({ observations }: { observations: ObservationType[] }) => {
    const [searchText, searchTextQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(['fauna', 'flora', 'funga']);
    const [selectedDiscoveries, setSelectedDiscoveries] = useState<DiscoveryType[]>(['domestic', 'wildlife']);

    const handleSearch = (query: string) => {
        searchTextQuery(query);
    }   

     const handleCategoryToggle = (category: CategoryType) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleDiscoveryToggle = (discovery: DiscoveryType) => {
        if (selectedDiscoveries.includes(discovery)) {
            setSelectedDiscoveries(selectedDiscoveries.filter(d => d !== discovery));
        } else {
            setSelectedDiscoveries([...selectedDiscoveries, discovery]);
        }
    };

    const filteredObservations = observations.filter(obs => 
        (obs.scientific_name.toLowerCase().includes(searchText.toLowerCase()) ||
        obs.common_name.toLowerCase().includes(searchText.toLowerCase())) &&
        selectedCategories.includes(obs.category) &&
        selectedDiscoveries.includes(obs.discovery)
    );
    
    return(
        <div>
            <Row>
                <Col>
                {/* Empty column for spacing */}
                </Col>
                <Col>
                    <Form className="mb-4">
                        <InputGroup>
                            <InputGroup.Text>
                                <IoSearch />
                            </InputGroup.Text>
                            <Form.Control
                                type="search"
                                placeholder="Search observations..."
                                aria-label="Search"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                         </InputGroup>
                    </Form>
                </Col>
                {/* Empty column for spacing */}
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="category-dropdown">
                            <FaFilter />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                <Form.Check 
                                    type="checkbox"
                                    id="fauna-checkbox"
                                    label="Fauna"
                                    checked={selectedCategories.includes('fauna')}
                                    onChange={() => handleCategoryToggle('fauna')}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                <Form.Check 
                                    type="checkbox"
                                    id="flora-checkbox"
                                    label="Flora"
                                    checked={selectedCategories.includes('flora')}
                                    onChange={() => handleCategoryToggle('flora')}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                <Form.Check 
                                    type="checkbox"
                                    id="funga-checkbox"
                                    label="Funga"
                                    checked={selectedCategories.includes('funga')}
                                    onChange={() => handleCategoryToggle('funga')}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                <Form.Check 
                                    type="checkbox"
                                    id="domestic-checkbox"
                                    label="Domestic"
                                    checked={selectedDiscoveries.includes('domestic')}
                                    onChange={() => handleDiscoveryToggle('domestic')}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                <Form.Check 
                                    type="checkbox"
                                    id="wildlife-checkbox"
                                    label="Wildlife"
                                    checked={selectedDiscoveries.includes('wildlife')}
                                    onChange={() => handleDiscoveryToggle('wildlife')}
                                />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {filteredObservations.map(obs => (
                    <Col key={obs.id}>
                        <Link to={`/observations/${obs.id}`} style={{ textDecoration: 'none' }}>
                            <SingleObservation obs={obs} />
                        </Link>
                    </Col>
                ))}
            </Row>  
        </div>
    )
}

export default Observations