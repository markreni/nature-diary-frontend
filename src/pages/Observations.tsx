import { Col, Row } from 'react-bootstrap';
import type { Observation_type } from '../types/types';
import Observation from '../components/Observation';

const Observations = ({ observations }: { observations: Observation_type[] }) => {
    return(
        <div>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {observations.map(obs => (
                    <Col key={obs.id}>
                        <Observation obs={obs} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Observations