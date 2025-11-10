import { Card } from "react-bootstrap";
import type { ObservationType } from '../types/types';
import '../assets/styles/global.css'

const SingleObservation = ({ obs }: { obs: ObservationType }) => {
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

}

export default SingleObservation;