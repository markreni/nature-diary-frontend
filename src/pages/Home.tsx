import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import type { ObservationType } from "../types/types";
import SingleObservation from "../components/SingleObservation";
import { Link } from "react-router-dom";
import { getRandomThreeObservations } from "../utils/helperFunctions.ts";

import observationsService from "../services/observationService.ts";
import Footer from "../components/Footer.tsx";

const Home = () => {
  const [observations, setObservations] = useState<ObservationType[]>([]);
  const [loading, setLoading] = useState(false);
  const user: string | null = window.localStorage.getItem("user");

  /** Load observations from backend */
  const loadObservations = async () => {
    try {
      setLoading(true);
      const data = await observationsService.getAllObservations(1, 1000);
      setObservations(data.observations);
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
                    <p className="h4 mb-4">Observation statistics</p>
                  </div>
                </Col>
              </Row>
              <Col>
                <Row className="g-3 mb-3">
                  <Col>
                    <div className="text-muted">Public</div>
                    <h3 className="mb-0">{observations.filter((obs) => obs.public).length}</h3>
                  </Col>
                  <Col>
                    <div className="text-muted">Private</div>
                    <h3 className="mb-0">{observations.filter((obs) => !obs.public).length}</h3>
                  </Col>
                  <Col>
                    <div className="text-muted">Wildlife</div>
                    <h3 className="mb-0">{observations.filter((obs) => obs.discovery == "wildlife").length}</h3>
                  </Col>
                  <Col>
                    <div className="text-muted">Domestic</div>
                    <h3 className="mb-0">{observations.filter((obs) => obs.discovery == "domestic").length}</h3>
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col>
                    <div className="text-muted">Flora </div>
                    <h3 className="mb-0">{observations.filter((obs) => obs.category == "flora").length}</h3>
                  </Col>
                  <Col>
                    <div className="text-muted">Fauna</div>
                    <h3 className="mb-0">{observations.filter((obs) => obs.category == "fauna").length}</h3>
                  </Col>
                  <Col>
                    <div className="text-muted">Funga</div>
                    <h3 className="mb-0">{observations.filter((obs) => obs.category == "funga").length}</h3>
                  </Col>
                  <Col> </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <div className="p-4 mb-4 bg-light rounded-3">
              <Row>
                <Col>
                  <div className="mb-4 bg-transparent">
                    <p className="h4 mb-0">Random Observations by Our Community</p>
                  </div>
                </Col>
              </Row>
              <Row xs={1} sm={2} md={2} lg={3} className="h5 mb-0 g-3">
                {getRandomThreeObservations(observations.filter(obs => obs.public && !obs.identified)).map((obs) => (
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
          </div>
          <Footer />
        </Col>
      )}

      {/* Pagination */}
    </div>
  );
};

export default Home;
