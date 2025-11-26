import { useState, useEffect } from "react";
import { Col, Row, Form, InputGroup, Dropdown, Button, ButtonGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; 
import type {
  CategoryType,
  DiscoveryType,
  ObservationType,
} from "../types/types";
import MyObservation from "../components/MyObservation";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import observationsService from "../services/observationService.ts";
import CustomAlert from "../components/CustomAlert.tsx";

const MyAccount = () => {
  const [observations, setObservations] = useState<ObservationType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedIdentified, setSelectedIdentified] = useState<string[]>([]);

  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([
    "fauna",
    "flora",
    "funga",
  ]);
  const [selectedDiscoveries, setSelectedDiscoveries] = useState<
    DiscoveryType[]
  >(["domestic", "wildlife"]);
  const [deleteMessage, setDeleteMessage] = useState<string[] | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');

  const limit = 8; // backend items per page

  /** Load observations from backend */
  const loadObservations = async () => {
    try {
      setLoading(true);

      const data = await observationsService.getByUser(page, limit);

      setObservations(data.observations);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch observations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObservations();
  }, [page]);

  /** Search handler */
  const handleSearch = (query: string) => setSearchText(query);

  /** Category filter */
  const handleCategoryToggle = (category: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  /** Discovery filter */
  const handleDiscoveryToggle = (discovery: DiscoveryType) => {
    setSelectedDiscoveries((prev) =>
      prev.includes(discovery)
        ? prev.filter((d) => d !== discovery)
        : [...prev, discovery]
    );
  };

  const handleIdentifiedChange = (values: string[]) => {
        setSelectedIdentified(values);
    };

  const initialPosition: [number, number] = [60.184230669318474, 24.83009157017735] //Otaniemi

  /** Client-side filtering (search, category, discovery) */
  const filteredObservations = observations.filter((obs) => {
    const sci = (obs.scientific_name ?? "").toLowerCase();
    const common = (obs.common_name ?? "").toLowerCase();
    const search = searchText.toLowerCase();
    const identifiedStatus = obs.identified ? 'identified' : 'unidentified';

    return (
      (sci.includes(search) || common.includes(search)) &&
      selectedCategories.includes(obs.category) &&
      selectedDiscoveries.includes(obs.discovery) &&
      (selectedIdentified.length === 0 || selectedIdentified.includes(identifiedStatus))
    );
  });

  return (
    <div>
      {/* Filters + Search */}
      {deleteMessage && <CustomAlert errorMsg={deleteMessage} type="success" />}
      <Row className="mb-4 align-items-center">
        <Col xs="auto">
          <ButtonGroup aria-label="View toggle">
            <Button
              variant={viewMode === 'cards' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'map' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('map')}
            >
              Map
            </Button>
          </ButtonGroup>
        </Col>

        <Col>
          <Form>
            <InputGroup>
              <InputGroup.Text>
                <IoSearch />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search observations..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Col>

        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="filter-dropdown">
              <FaFilter />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Category Filters */}
              {["fauna", "flora", "funga"].map((cat) => (
                <Dropdown.Item
                  key={cat}
                  as="div"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Form.Check
                    type="checkbox"
                    label={cat}
                    checked={selectedCategories.includes(cat as CategoryType)}
                    onChange={() => handleCategoryToggle(cat as CategoryType)}
                  />
                </Dropdown.Item>
              ))}

              {/* Discovery Filters */}
              {["domestic", "wildlife"].map((disc) => (
                <Dropdown.Item
                  key={disc}
                  as="div"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Form.Check
                    type="checkbox"
                    label={disc}
                    checked={selectedDiscoveries.includes(
                      disc as DiscoveryType
                    )}
                    onChange={() =>
                      handleDiscoveryToggle(disc as DiscoveryType)
                    }
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col> 
              <ToggleButtonGroup
                type="checkbox"
                value={selectedIdentified}
                onChange={handleIdentifiedChange}
                className="mb-2"
                >
                {/* Reverse logic here because of backend*/}
                    <ToggleButton id="tbg-check-4" value={'unidentified'} variant="outline-success"> 
                        Identified
                    </ToggleButton>
                    <ToggleButton id="tbg-check-5" value={'identified'} variant="outline-success">
                        Unidentified
                    </ToggleButton>

            </ToggleButtonGroup>
        </Col>

      </Row>

      {/* Observations Grid or Map depending on viewMode */}
      {viewMode === 'cards' ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Row xs={1} sm={1} md={2} lg={2} className="g-3">
              {filteredObservations.map((obs) => (
                <Col key={obs.id}>
                  <Link
                    to={`/observations/${obs.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MyObservation
                      obs={obs}
                      onDelete={async () => {
                        await loadObservations(); // refresh list

                        // Show success alert
                        setDeleteMessage(["Observation deleted successfully!"]);

                        // Hide after 3 sec
                        setTimeout(() => setDeleteMessage(null), 3000);
                      }}
                    />
                  </Link>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {observations.length !== 0 && !loading && (
              <Row className="mt-4 text-center">
                <Col>
                  <Button
                    variant="secondary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                </Col>

                <Col>
                  <strong>
                    Page {page} / {totalPages}
                  </strong>
                </Col>

                <Col>
                  <Button
                    variant="secondary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )
      ) : (
        <Row>
          <Col>
            <MapContainer
              center={initialPosition}
              zoom={13}
              style={{ height: '80vh', width: '100%', borderRadius: '8px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredObservations.map((obs) => (
                <Marker key={obs.id} position={[Number(obs?.location?.lat ?? 0), Number(obs?.location?.lng ?? 0)]}>
                  {obs.identified ? (
                    <Popup>
                      <strong>Unidentified</strong>
                      <br />
                      Category: {obs.category}
                      <br />
                      <Link to={`/observations/${obs.id}`}>View details</Link>
                    </Popup>
                  ) : (
                    <Popup>
                      <strong>{obs.common_name}</strong>
                      <br />
                      Category: {obs.category}
                      <br />
                      <Link to={`/observations/${obs.id}`}>View details</Link>
                    </Popup>
                  )}
                </Marker>
              ))}
            </MapContainer>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default MyAccount;
