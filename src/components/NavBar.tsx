import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../assets/styles/global.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user: string | null = window.localStorage.getItem("user");
  const navigate = useNavigate();
  return (
    <Navbar
      data-bs-theme="dark"
      fixed="top"
      className="light-green-navbar"
      expand="lg"
    >
      <Container>
        <Navbar.Brand className="nav-bar-logo">
          <LinkContainer to="/">
            <Nav.Link>NatureDiary</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-right-align">
          <Nav>
            <LinkContainer to="/observations" className="nav-bar-link">
              <Nav.Link>Observations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/map" className="nav-bar-link">
              <Nav.Link>Map</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/unidentified" className="nav-bar-link">
              <Nav.Link>Unidentified</Nav.Link>
            </LinkContainer>

            {!user && (
              <>
                <LinkContainer to="/signup" className="nav-bar-link">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login" className="nav-bar-link">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}

            {user && (
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("user");
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
                <Nav.Link>Add observation</Nav.Link>
              </LinkContainer>
               <LinkContainer to="/myaccount">
                <Nav.Link>MyAccount</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
