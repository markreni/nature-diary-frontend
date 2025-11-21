import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Carousel, Row, Col } from "react-bootstrap";
import type { ObservationWithLocation, ObservationImage } from "../types/types";
import "../assets/styles/global.css";
import ObservationMap from "../components/ObservationMap";
import observationsService from "../services/observationService";
import baseURL from "../services/config";

const ObservationPage = ({ isOwner }: { isOwner: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const [obs, setObs] = useState<ObservationWithLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        if (id) {
          const data = await observationsService.getById(Number(id));
          setObs(data.observation);
        }
      } catch (err) {
        console.error("Failed to fetch observation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchObservation();
  }, [id]);

  if (loading) return <p>Loading observation...</p>;
  if (!obs) return <p>Observation not found.</p>;

  const getImageUrl = (img: ObservationImage | string) => {
    if (!img) return "/placeholder.jpg";
    if (typeof img === "string") return img;
    if ("imageName" in img && img.imageName)
      return `${baseURL}images/${img.imageName}`;
    return "/placeholder.jpg";
  };

  return (
    <Card>
      <Card.Header>
        <b>{obs.common_name || "I am unidentified :("}</b>
      </Card.Header>

      {obs.images && obs.images.length > 0 && (
        <Carousel controls={true}>
          {obs.images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <Image
                src={getImageUrl(img)}
                className="d-block w-100"
                style={{
                  height: "400px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <Card.Body className="border-bottom">
        <Row>
          <Col md={7} className="border-end">
            <Row>
              <Col sm={3} className="fw-bold">
                Scientific name
              </Col>
              <Col>{obs.scientific_name || "N/A"}</Col>
            </Row>
            <Row className="mt-2">
              <Col sm={3} className="fw-bold">
                Observed date
              </Col>
              <Col>{obs.date || "N/A"}</Col>
            </Row>
            <Row className="mt-2">
              <Col sm={3} className="fw-bold">
                Location
              </Col>
              <Col>
                {obs.location
                  ? `Lat: ${obs.location.lat}, Lng: ${obs.location.lng}`
                  : "Unknown"}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={3} className="fw-bold">
                Description
              </Col>
              <div className="border rounded p-3 bg-light">
                <Card.Text>
                  {obs.description || "No description provided"}
                </Card.Text>
              </div>
            </Row>
            <Row className="mt-2">
              <Col className="ps-0">
                {obs.location ? <ObservationMap obs={obs} /> : null}
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            {isOwner ? <p>Owner controls</p> : <p>Visitor controls</p>}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ObservationPage;
