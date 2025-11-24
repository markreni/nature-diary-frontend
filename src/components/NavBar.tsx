import { Container, Nav, Navbar } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "../assets/styles/global.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const user: string | null = window.localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!navRef.current.contains(target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);
  
  return (
    <Navbar
      data-bs-theme="dark"
      fixed="top"
      className="light-green-navbar"
      expand="lg"
      ref={navRef}
      expanded={expanded}
      onToggle={(next) => setExpanded(next)}
    >
      <Container>
        <Navbar.Brand className="nav-bar-logo">
          <LinkContainer to="/">
            <Nav.Link onClick={() => setExpanded(false)}>NatureDiary</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-right-align">
          <Nav>
            <LinkContainer to="/observations" className="nav-bar-link">
              <Nav.Link onClick={() => setExpanded(false)}>Observations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/map" className="nav-bar-link">
              <Nav.Link onClick={() => setExpanded(false)}>Map</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/unidentified" className="nav-bar-link">
              <Nav.Link onClick={() => setExpanded(false)}>Unidentified</Nav.Link>
            </LinkContainer>

            {!user && (
              <>
                <LinkContainer to="/signup" className="nav-bar-link">
                  <Nav.Link onClick={() => setExpanded(false)}>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login" className="nav-bar-link">
                  <Nav.Link onClick={() => setExpanded(false)}>Login</Nav.Link>
                </LinkContainer>
              </>
            )}

            {user && (
              <Nav.Link
                  onClick={() => {
                    localStorage.removeItem("user");
                    setExpanded(false);
                    navigate("/");
                  }}
                  className="nav-bar-link"
                >
                  Logout
                </Nav.Link>
            )}
          </Nav>
          {user && (
            <Nav className="nav-bar-add-link">
              <LinkContainer to="/questions">
                  <Nav.Link onClick={() => setExpanded(false)}>Add observation</Nav.Link>
                </LinkContainer>
                 <LinkContainer to="/myaccount">
                  <Nav.Link onClick={() => setExpanded(false)}>MyAccount</Nav.Link>
                </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
