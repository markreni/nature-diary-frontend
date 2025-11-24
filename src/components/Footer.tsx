import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-light text-muted mt-5">
      <Container className="py-4">
        <Row className="align-items-start">
          <Col md={4} className="mb-3">
            <h6 className="fw-bold">NatureDiary</h6>
            <p className="small mb-0">
              Record, share and identify nature observations — community-driven and open.
            </p>
          </Col>

          <Col md={2} className="mb-3">
            <h6 className="fw-bold">Explore</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/observations">Observations</Link></li>
              <li><Link to="/map">Map</Link></li>
            </ul>
          </Col>

          <Col md={3} className="mb-3">
            <h6 className="fw-bold">Resources</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </Col>

          <Col md={3} className="mb-3 text-md-end">
            <h6 className="fw-bold">Get Involved</h6>
            <div className="d-flex gap-2 justify-content-md-end">
              <a href="https://github.com/markreni/nature-diary-frontend" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </Col>
        </Row>

        <Row className="pt-3 border-top">
          <Col className="small text-muted">
            © {new Date().getFullYear()} NatureDiary — Built with care. <span className="mx-2">|</span> v1.0.0
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;