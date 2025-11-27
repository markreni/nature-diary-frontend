import { useState, useEffect } from "react";
import { Col, Row, Form, InputGroup, Dropdown, Button } from "react-bootstrap";
import type {
  CategoryType,
  DiscoveryType,
  ObservationType,
} from "../types/types";
import SingleObservation from "../components/SingleObservation";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import observationsService from "../services/observationService.ts";

const UnidentifiedObservations = () => {
  const [observations, setObservations] = useState<ObservationType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([
    "fauna",
    "flora",
    "funga",
  ]);
  const [selectedDiscoveries, setSelectedDiscoveries] = useState<
    DiscoveryType[]
  >(["domestic", "wildlife"]);

  const limit = 8; // backend items per page

  /** Load observations from backend */
  const loadObservations = async () => {
    try {
      setLoading(true);

      const data = await observationsService.getAll(page, limit, undefined, true);

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

  /** Client-side filtering (search, category, discovery) */
  const filteredObservations = observations.filter((obs) => {
    const sci = (obs.scientific_name ?? "").toLowerCase();
    const common = (obs.common_name ?? "").toLowerCase();
    const search = searchText.toLowerCase();

    return (
      (sci.includes(search) || common.includes(search)) &&
      selectedCategories.includes(obs.category) &&
      selectedDiscoveries.includes(obs.discovery)
    );
  });

  return (
    <div>
      {/* Filters + Search */}

      {/* Observations Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row
          xs={1}
          sm={2}
          md={observations.length >= 3 ? 3 : 2}
          lg={observations.length >= 4 ? 4 : observations.length >= 3 ? 3 : 2}
          className="g-3"
        >
          {filteredObservations.map((obs) => (
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
    </div>
  );
};

export default UnidentifiedObservations;
