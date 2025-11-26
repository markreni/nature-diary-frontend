import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Carousel, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { ObservationWithLocation, ObservationImage } from '../types/types';
import '../assets/styles/global.css'
import ObservationMap from '../components/ObservationMap';
import  suggestionService  from "../services/suggestionService";
import { jwtDecode } from "jwt-decode";
import IdentificationSuggestions from "../components/IdentificationSuggestions";
import observationsService from "../services/observationService";
import baseURL from "../services/config";
import BackArrow from "../components/BackArrow";

interface TokenPayload {
  id: number;
  firstName: string;
}


const ObservationPage = () => {
    const { id } = useParams<{id: string}>();
    const [obs, setObs] = useState<ObservationWithLocation | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            suggestionService.setToken(storedToken);
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
    const fetchObservation = async () => {
      try {
        if (id) {
          const data = await observationsService.getById(Number(id));
          setObs(data.observation);
          console.log(data.observation)
        }
      } catch (err) {
        console.error("Failed to fetch observation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchObservation();
  }, [id]);

  const getImageUrl = (img: ObservationImage | string) => {
    if (!img) return "/placeholder.jpg";
    if (typeof img === "string") return img;
    if ("imageName" in img && img.imageName)
      return `${baseURL}images/${img.imageName}`;
    return "/placeholder.jpg";
  };

  
    // check if the current user is the owner
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        
        
        if (storedToken && obs?.user) {
            suggestionService.setToken(storedToken);
            try {
                const decoded = jwtDecode<TokenPayload>(storedToken);
                setCurrentUserId(decoded.id);
                if (decoded.id === obs.user.id) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            } catch (e) {
                console.error("Invalid token");
                setIsOwner(false);
            }
        } else{
            setIsOwner(false);
        }
    }, [obs?.user?.id]); 



    if (loading) return <p>Loading observation...</p>;
    if (!obs) return <p>Observation not found.</p>;
    return (
            <Card>
                <Card.Header>
                    <Row className="align-items-center">
                        <Col>
                            <b>{obs.common_name || "Unidentified species"}</b>
                        </Col>
                        <Col xs="auto">
                        <BackArrow formatting={"page-back-form"}/>
          </Col>
                    </Row>
                </Card.Header>

                {obs.images && obs.images.length > 0 ? (
                    <Carousel 
                    controls={true}
                    nextLabel="Next image"  
                    prevLabel="Previous image"
                    nextIcon={
                        <OverlayTrigger placement="top" overlay={<Tooltip id="next-tooltip">{obs.images.length != 1 ? "Next image" : "This observation has only one image"}</Tooltip>}>
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        </OverlayTrigger>
                    }
                    prevIcon={
                        <OverlayTrigger placement="top" overlay={<Tooltip id="prev-tooltip">{obs.images.length != 1 ? "Previous image" : "This observation has only one image"}</Tooltip>}>
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        </OverlayTrigger>
                    }
                    >
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
                ) : (
                    <div className="text-center p-4">No images available</div>
                )}
                <Card.Body className="border-bottom">
                    <Row>
                        <Col md={7} className="border-end">
                            <Row>
                                <Col sm={3} className="fw-bold">Scientific name</Col>
                        <       Col>{obs.scientific_name || <i>Scientific name missing</i>}</Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm={3} className="fw-bold">Observed date</Col>
                                <Col>{obs.date}</Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm={3} className="fw-bold">Discovery type</Col>
                                <Col>{obs.discovery
                                        ? `${obs.discovery}`
                                        : "Unknown"}
                                </Col>
                            </Row>
                            <Row className="mt-2">           
                                <Col sm={3} className="fw-bold">Description</Col>
                                <div className="border rounded p-3 bg-light"> 
                                    <Card.Text>{obs.description}</Card.Text>
                                </div>
                            </Row>
                            <Row className="mt-2">
                                <Col className="ps-0">
                                <ObservationMap 
                                    obs={obs}
                                />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <IdentificationSuggestions
                                observationId={obs.id}
                                isOwner={isOwner}
                                isIdentified={!obs.identified}
                                acceptedName={obs.common_name}
                                onUpdate={(updatedObs) => setObs(updatedObs)}
                                isLoggedIn={isLoggedIn}
                                currentUserId={currentUserId}

                            />
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        );
    
    
}

export default ObservationPage;
