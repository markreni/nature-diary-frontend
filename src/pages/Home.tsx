import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import type { ObservationType } from "../types/types";
import SingleObservation from "../components/SingleObservation";
import { Link } from "react-router-dom";

import observationsService from "../services/observationService.ts";

const Home = () => {
  const [observations, setObservations] = useState<ObservationType[]>([]);

  const [loading, setLoading] = useState(false);

  /** Load observations from backend */
  const loadObservations = async () => {
    try {
      setLoading(true);

      const data = await observationsService.getAll(1, 10, false);

      const randomThree = [...data.observations]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setObservations(randomThree);
      console.log(randomThree);
    } catch (err) {
      console.error("Failed to fetch observations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObservations();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {observations.map((obs) => (
            <Col key={obs.id}>
              <Link
                to={`/observations/${obs.id}`}
                style={{ textDecoration: "none" }}
              >
                <SingleObservation obs={obs} />
              </Link>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
    </div>
  );
};

export default Home;
