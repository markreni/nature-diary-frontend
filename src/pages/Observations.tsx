import { Col, Row, Form, InputGroup } from 'react-bootstrap';
import type { ObservationType } from '../types/types';
import Observation from '../components/Observation';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';

const Observations = ({ observations }: { observations: ObservationType[] }) => {
    const [searchText, searchTextQuery] = useState('');

    const handleSearch = (query: string) => {
        searchTextQuery(query);
    }

    const filteredObservations = observations.filter(obs => 
        obs.scientific_name.toLowerCase().includes(searchText.toLowerCase()) ||
        obs.common_name.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return(
        <div>
            <Row>
                <Col>
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
                <Col>
                </Col>
            </Row>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {filteredObservations.map(obs => (
                    <Col key={obs.id}>
                        <LinkContainer to={`/observations/${obs.id}`}  style={{ textDecoration: 'none' }} >
                           <Link to={``}><Observation obs={obs} singlePage={false}/></Link>
                        </LinkContainer>
                    </Col>
                ))}
            </Row>  
        </div>
    )
}

export default Observations