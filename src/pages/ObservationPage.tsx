import { Card, Image, Carousel, Row, Col } from "react-bootstrap";
import type { ObservationType } from '../types/types';
import '../assets/styles/global.css'
import ObservationMap from '../components/ObservationMap';
import { useState, useEffect} from 'react';
import  suggestionService  from "../services/suggestionService";
import { jwtDecode } from "jwt-decode";
import IdentificationSuggestions from "../components/IdentificationSuggestions";

interface TokenPayload {
  id: number;
  firstName: string;
}


const ObservationPage = ({obs: initialObs}: {obs: ObservationType}) => {
    const [obs, setObs] = useState<ObservationType>(initialObs);
    const [isOwner, setIsOwner] = useState(false);

    // check if the current user is the owner
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        
        if (storedToken) {
            suggestionService.setToken(storedToken);
            try {
                const decoded = jwtDecode<TokenPayload>(storedToken);
                if (decoded.id === initialObs.userId) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            } catch (e) {
                console.error("Invalid token");
                setIsOwner(false);
            }
        }
    }, [initialObs.userId]); 


    useEffect(() => {
        setObs(initialObs);
    }, [initialObs]);



    return (
            <Card>
                <Card.Header>
                    <b>{obs.common_name || "Unidentified species"}</b>
                </Card.Header>
                    <Carousel controls={true}>
                        {obs.images.map((imgUrl, idx) => (
                            <Carousel.Item key={idx}>
                            <Image
                                src={typeof imgUrl === 'string' ? imgUrl : URL.createObjectURL(imgUrl as unknown as Blob)}
                                className="d-block w-100"
                                style={{
                                    height: '400px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    padding: '1rem'
                                }}
                            />
                        </Carousel.Item>
                        ))}
                    </Carousel>
                <Card.Body className="border-bottom">
                    <Row>
                        <Col md={7} className="border-end">
                            <Row>
                                <Col sm={3} className="fw-bold">Scientific name</Col>
                        <       Col>{obs.scientific_name || <i>Identification needed</i>}</Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm={3} className="fw-bold">Observed date</Col>
                                <Col>{obs.date}</Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm={3} className="fw-bold">Location</Col>
                                <Col>{obs.location}</Col>
                            </Row>
                            <Row className="mt-2">           
                                <Col sm={3} className="fw-bold">Description</Col>
                                <div className="border rounded p-3 bg-light"> 
                                    <Card.Text>{obs.description}</Card.Text>
                                </div>
                            </Row>
                            <Row className="mt-2">
                                <Col className="ps-0">
                                <ObservationMap 
                                    obs={obs}
                                />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <IdentificationSuggestions
                                observationId={obs.id}
                                isOwner={isOwner}
                                isIdentified={obs.identified}
                                acceptedName={obs.common_name}
                                onUpdate={(updatedObs) => setObs(updatedObs)}

                            />
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        );
    
    
}

export default ObservationPage;