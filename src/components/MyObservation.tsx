import { Button, Card, Col, Row } from "react-bootstrap";
import type { ObservationType } from "../types/types";
import "../assets/styles/global.css";
import baseURL from "../services/config";
import { FaTrash } from "react-icons/fa";

const MyObservation = ({ obs }: { obs: ObservationType }) => {
  const imgSrc =
    obs.images && obs.images.length > 0
      ? `${baseURL}images/${obs.images[0].imageName}`
      : "/placeholder.jpg"; // fallback if no image

  return (
    <div>
      <Card className="observation-card shadow-sm border-0 position-relative">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
          {obs.common_name != "" ? (
            <Card.Title className="fw-bold text-success">
              {obs.common_name}
            </Card.Title>
          ) : (
            <Card.Title className="fw-bold text-success">
              I am unidentified :(
            </Card.Title>
          )}

          <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>
            {obs.scientific_name}
          </Card.Text>

          {obs.images && obs.images.length > 0 && (
            <div className="my-2">
              <img
                src={imgSrc}
                alt={`${obs.common_name} preview`}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="badge bg-success bg-opacity-25 text-success px-3 py-2">
              {obs.date}
            </span>
            <span className="badge bg-light text-secondary px-3 py-2">
              {obs.discovery}
            </span>
          </div>
          </Col>
          <Col xs="auto" className="position-absolute top-0 end-0 p-2">
            <Button
                variant="outline-danger"
                size="sm"
                onClick={(e) => {
                // prevent the click from bubbling to parent links/handlers
                e.stopPropagation();
                e.preventDefault();
                if (window.confirm("Delete this observation?")) {
                  console.log("delete confirmed", obs.id);
                  // TODO: call API handler to delete
                }
              }}
                aria-label={`Delete observation ${obs.id}`}
                 title="Delete"
              >
                <FaTrash />
            </Button>
          </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyObservation;

