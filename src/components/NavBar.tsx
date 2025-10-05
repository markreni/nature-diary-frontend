import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import '../assets/styles/global.css'

const NavBar = () => {
    return(
        <Navbar data-bs-theme="dark"fixed="top" className="light-green-navbar" expand="lg">
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
                </Nav>
                <Nav className="nav-bar-add-link">
                  <LinkContainer to="/add">
                    <Nav.Link>Add observation</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    )
}

export default NavBar