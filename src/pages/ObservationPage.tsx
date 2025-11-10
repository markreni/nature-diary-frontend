import { Card, Image, Carousel, Row, Col } from "react-bootstrap";
import type { ObservationType } from '../types/types';
import '../assets/styles/global.css'
import ObservationMap from '../components/ObservationMap';

const ObservationPage = ({obs, isOwner}: {obs: ObservationType, isOwner: boolean}) => {




    return (
            <Card>
                <Card.Header>
                    <b>{obs.common_name}</b>
                </Card.Header>
                    <Carousel controls={true}>
                        {obs.images.map((imgUrl, idx) => (
                            <Carousel.Item key={idx}>
                            <Image
                                src={imgUrl}
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
                        <       Col>{obs.scientific_name}</Col>
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
                            <p>Conditionally rendered content</p>
                            {isOwner ? (<p>Owner controls</p>) : (<p>Visitor controls</p>)}
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        );
    
    
}

export default ObservationPage;