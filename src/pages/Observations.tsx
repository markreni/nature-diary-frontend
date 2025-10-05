import { Card, Col, Row } from 'react-bootstrap';
import type { Observation } from '../types/types';

type ObservationsProps = {
    observations: Observation[];
};

const Observations = ({ observations }: ObservationsProps) => {
    return(
        <div>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {observations.map(obs => (
                    <Col key={obs.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{obs.common_name}</Card.Title>
                                {/* Add more fields as needed */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Observations