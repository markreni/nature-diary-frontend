import { Col, Row } from 'react-bootstrap';
import type { ObservationType } from '../types/types';
import Observation from '../components/Observation';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Observations = ({ observations }: { observations: ObservationType[] }) => {
    return(
        <div>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {observations.map(obs => (
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