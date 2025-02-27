import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./settings.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logoImage from "../logo.png";

const Settings = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const navbarRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (navbarRef.current) resizeObserver.observe(navbarRef.current);

    window.addEventListener("resize", handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="settings-page d-flex flex-column align-items-center" style={{ paddingTop: `${navHeight}px` }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark fixed-top" ref={navbarRef}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logoImage} alt="Logo" className="navbar-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            ☰
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Settings Content */}
      <Container className={`settings-container ${isDarkMode ? "dark" : ""}`}>
        <h1 className="settings-title text-center mb-4">Settings</h1>

        {/* Personal Details Section */}
        <Row className="mb-4">
          <Col sm={8}>
            <div className="settings-header text-center mb-4">
              <h2 className="profile-name">Arafat Ahmed Chowdhury</h2>
              <Button variant="success" className="mt-2">Edit personal details</Button>
            </div>
            <Form>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue="Arafat" />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" defaultValue="Ahmed Chowdhury" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" defaultValue="+880 123 4567 890" />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Timezone</Form.Label>
                    <Form.Control type="text" defaultValue="Dhaka (GMT +6)" />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button variant="primary" type="submit">Save Changes</Button>
              </div>
            </Form>
          </Col>
          <Col sm={4}>
            <div className="account-overview">
              <h2 className="section-title text-center">Account Overview</h2>
              <Button variant="success" className="mb-3 w-100">+ Add New Email</Button>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>vuhaithuongnute@gmail.com</span>
                <div>
                  <span className="status-unverified">Unverified</span>
                  <Button variant="outline-danger" size="sm" className="ms-2">Remove</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Appearance Section */}
        <Row className="mb-4">
          <Col sm={12}>
            <h2 className="section-title text-center">Appearance</h2>
            <div className="settings-item d-flex justify-content-between">
              <span className="settings-label">Dark Mode</span>
              <Form.Check
                type="switch"
                id="dark-mode-toggle"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
            </div>
          </Col>
        </Row>

        {/* App Version Section */}
        <Row className="app-version">
          <Col sm={12} className="text-center">
            <p>App ver 2.0.1</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Settings;