import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useAuth } from "../../contexts/AuthContext";

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="transparent" data-bs-theme="light">
        <Container>
          <Nav style={{ fontWeight: 500 }} className="me-auto">
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login">
                  Log in
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Create account
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/game">
                  Game
                </Nav.Link>
                <Nav.Link as={Link} to="/leaderboard">
                  Leaderboard
                </Nav.Link>
                {/* <Nav.Link onClick={logout}>Logout</Nav.Link> */}
                <Nav.Link onClick={() => logout(navigate)}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
