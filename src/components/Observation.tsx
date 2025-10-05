import { Card } from "react-bootstrap";
import type { Observation_type } from '../types/types';
import '../assets/styles/global.css'

const Observation = ({ obs }: { obs: Observation_type }) => {
    return(
        <div>
            <Card className="observation-card shadow-sm border-0">
                <Card.Body>
                    <Card.Title className="fw-bold text-success">{obs.common_name}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '0.95rem' }}>
                        {obs.scientific_name}
                    </Card.Text>
                    <Card.Text>
                        {obs.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="badge bg-success bg-opacity-25 text-success px-3 py-2">
                            {obs.date}
                        </span>
                        <span className="badge bg-light text-secondary px-3 py-2">
                            {obs.location}
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </div>);
}

export default Observation