import { Card, Image, Carousel, Row, Col } from "react-bootstrap";
import type { ObservationType } from '../types/types';
import '../assets/styles/global.css'

const Observation = ({ obs, singlePage }: { obs: ObservationType, singlePage: boolean }) => {
    if (!singlePage) {
    return(
        <div>
            <Card className="observation-card shadow-sm border-0">
                <Card.Body>
                    <Card.Title className="fw-bold text-success">{obs.common_name}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '0.95rem' }}>
                        {obs.scientific_name}
                    </Card.Text>
                    <Card.Text>
                        {obs.category}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="badge bg-success bg-opacity-25 text-success px-3 py-2">
                            {obs.date}
                        </span>
                        <span className="badge bg-light text-secondary px-3 py-2">
                            {obs.discovery}
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </div>);
    } else {
        return (
            <Card>
                <Card.Header>
                    <b>{obs.common_name}</b>
                </Card.Header>
                    <Carousel>
                        <Carousel.Item>
                            <Image
                                src={obs.image}
                                className="d-block w-100"
                                style={{
                                    height: '400px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    padding: '1rem'
                                }}
                            />
                        </Carousel.Item>
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
                                    <p>Placeholder map image</p>
                                <Image
                                    src="https://gisgeography.com/wp-content/uploads/2023/03/Helsinki-Map-Finland.jpg"
                                    style={{
                                    height: '400px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    padding: '1rem'
                                }}
                                />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <p>Conditionally rendered content</p>
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        );
    }
}

export default Observation