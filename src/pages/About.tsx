import { Container, Row, Col, Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs="auto">
                <Button
                variant="link"
                onClick={() => navigate(-1)}
                aria-label="Go back"
                title="Go back"
                className="p-0"
                >
                <IoMdArrowRoundBack size={25} />
                </Button>
        </Col>
        <Col md={10} lg={8}>
          <div className="p-4 mb-4 bg-light rounded-3">
            <h1 className="display-6 mb-2">About NatureDiary</h1>
            <p className="lead text-muted">
              NatureDiary is a community-driven platform for recording and
              sharing observations of wildlife, plants and fungi. Contribute
              photos, pin exact locations on the map, request identification
              help from the community, and explore public discoveries near you.
            </p>

            <p className="text-muted">
              Our mission is to make it easy for everyone to connect with
              nature and help build an open record of biodiversity. We value
              accurate reporting, respectful collaboration, and privacy — you
              control which observations are public.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
