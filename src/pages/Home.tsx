import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import type { ObservationType } from "../types/types";
import SingleObservation from "../components/SingleObservation";
import { Link } from "react-router-dom";

import observationsService from "../services/observationService.ts";

const Home = () => {
  const [observations, setObservations] = useState<ObservationType[]>([]);
  const [loading, setLoading] = useState(false);
  const user: string | null = window.localStorage.getItem("user");

  /** Load observations from backend */
  const loadObservations = async () => {
    try {
      setLoading(true);

      const data = await observationsService.getAll(1, 10, false);

      const randomThree = [...data.observations]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setObservations(randomThree);
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
        <Col>
          <Row>
            <Col>
              <div className="p-4 mb-4 bg-light rounded-3">
                <h1 className="display-6 mb-2">Welcome to NatureDiary</h1>
                <p className="lead text-muted mb-3">
                  Record and explore observations of fauna, flora and funga.
                  Add photos, pin locations on the map, request identifications,
                  and browse public discoveries contributed by the community.
                </p>

                <div className="d-flex flex-wrap gap-2">
                  <Link to="/observations">
                    <Button variant="success">Explore Observations</Button>
                  </Link>
                   {user && (
                  <Link to="/questions">
                    <Button variant="outline-primary">Add Observation</Button>
                  </Link>
                  )}
                </div>

                {!user && (
                  <div className="mt-4 bg-light rounded-3">
                    <p className="lead text-muted">
                      Sign up or log in now to start contributing your own observations!
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                    <Link to="/signup">
                      <Button variant="outline-primary">Sign Up</Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline-primary">Log In</Button>
                    </Link>
                    </div>
                </div>
                )}

              </div>
            </Col>
          </Row>
          <div className="p-4 mb-4 bg-light rounded-3">
            <Row>
              <Row>
                <Col>
                  <div>
                    <p className="h4 mb-2">Statistics of our community</p>
                  </div>
                </Col>
              </Row>
              <Col>
                  <div>
                    <div className="text-muted">Total Observations</div>
                    <h3 className="mb-0">{5}</h3>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <div className="p-4 bg-transparent">
                  <p className="h4 mb-0">Random observations by Our Community</p>
                </div>
              </Col>
            </Row>
            <Row xs={1} sm={2} md={3} lg={4} className="h5 mb-0 g-3">
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
          </div>
        </Col>
      )}

      {/* Pagination */}
    </div>
  );
};

export default Home;
