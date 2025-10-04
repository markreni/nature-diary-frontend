import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const NavBar = () => {
    return(
        <Navbar data-bs-theme="dark"fixed="top" className="bg-body-tertiary mb-3" expand="lg">
            <Container>
              <Navbar.Brand>
                <LinkContainer to="/">
                  <Nav.Link>NatureDiary</Nav.Link>
                </LinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <LinkContainer to="/observations">
                    <Nav.Link>Observations</Nav.Link>
                  </LinkContainer>
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