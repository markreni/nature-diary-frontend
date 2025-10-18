import { Col, Row } from 'react-bootstrap';
import type { ObservationType } from '../types/types';
import Observation from '../components/Observation';

const Unidentified = ({ observations }: { observations: ObservationType[] }) => {
    return(
        <div>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {observations.map(obs => (
                    <Col key={obs.id}>
                        <Observation obs={obs} singlePage={false} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Unidentified;