import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./story.css";
import logoImage from "../logo.png";

const Story = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [email, setEmail] = useState("");
  const [stories, setStories] = useState([]);

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

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/v1/stories");
        if (response.ok) {
          const data = await response.json();
          setStories(data);
        } else {
          console.error("Failed to fetch stories");
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, story }),
      });

      if (response.ok) {
        alert("Thank you for sharing your story!");
        setName("");
        setStory("");
        setEmail("");

        
        const updatedResponse = await fetch("/api/v1/stories");
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setStories(data);
        }
      } else {
        alert("Failed to submit story. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting story:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate("/explore"); 
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate"); 
  };

  const handleLoginRedirect = () => navigate("/login"); 
  const handleSignupRedirect = () => navigate("/signup"); 

  return (
    <div className="story-page" style={{ paddingTop: `${navHeight}px` }}>
     
      <nav
        className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block"
        ref={navbarRef}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
           
            <div className="d-flex align-items-center me-auto">
              <button
                className="btn btn-outline-success me-3"
                onClick={handleExploreClick}
              >
                Explore
              </button>
              <div className="input-group search-bar">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
                <button className="btn btn-success" type="button">
                  Search
                </button>
              </div>
            </div>

            
            <Link
              to="/"
              className="position-absolute top-50 start-50 translate-middle"
            >
              <img
                src={logoImage}
                alt="Pathshala Logo"
                className="navbar-logo"
                style={{ height: "40px" }}
              />
            </Link>

            
            <div className="d-flex align-items-center ms-auto">
              <button
                className="btn btn-outline-light me-2"
                onClick={handleDonateClick}
              >
                Donate
              </button>
              <button
                className="btn btn-outline-light me-2"
                onClick={handleLoginRedirect}
              >
                Log in
              </button>
              <button
                className="btn btn-success"
                onClick={handleSignupRedirect}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

     
      <nav className="navbar bg-dark fixed-top d-lg-none" ref={navbarRef}>
        <div className="container-fluid">
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            ☰
          </button>

          <Link to="/" className="navbar-brand">
            <img src={logoImage} alt="Pathshala Logo" className="navbar-logo" />
          </Link>

          <div
            className="offcanvas offcanvas-start bg-dark text-white"
            tabIndex="-1"
            id="mobileMenu"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="search-bar mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>

              <nav className="nav flex-column gap-2">
                <button
                  className="btn btn-outline-light text-start"
                  onClick={handleExploreClick}
                >
                  Explore
                </button>
                <button
                  className="btn btn-outline-light text-start"
                  onClick={handleDonateClick}
                >
                  Donate
                </button>
                <button
                  className="btn btn-outline-light text-start"
                  onClick={handleLoginRedirect}
                >
                  Log in
                </button>
                <button
                  className="btn btn-success text-start"
                  onClick={handleSignupRedirect}
                >
                  Sign up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      
      <main className="story-content">
        <h1>Share Your Story</h1>
        <div className="story-section">
          <h2>Tell Us Your Experience</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="story">Your Story</label>
              <textarea
                className="form-control"
                id="story"
                rows="5"
                placeholder="Share your story with us..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>

        
        <div className="submitted-stories mt-5">
          <h2>Submitted Stories</h2>
          <div className="stories-grid">
            {stories.length === 0 ? (
              <p>No stories submitted yet.</p>
            ) : (
              stories.map((story) => (
                <div key={story._id} className="story-card">
                  <div className="card-body">
                    <h5 className="card-title">{story.name}</h5>
                    <p className="card-text">{story.story}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Submitted on:{" "}
                        {new Date(story.createdAt).toLocaleDateString()}
                      </small>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">About Us</h5>
                  <p className="card-text">
                    Our mission is simple: to break down barriers to education
                    and provide opportunities for all. Join us on this journey
                    to make a lasting impact in the world of learning.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">Contact</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/help-centre"
                        className="text-white text-decoration-none"
                      >
                        Help Centre
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support-community"
                        className="text-white text-decoration-none"
                      >
                        Support Community
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/share-story"
                        className="text-white text-decoration-none"
                      >
                        Share Your Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/press"
                        className="text-white text-decoration-none"
                      >
                        Press
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">Follow Us</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        href="https://facebook.com"
                        className="text-white text-decoration-none"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com"
                        className="text-white text-decoration-none"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com"
                        className="text-white text-decoration-none"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://linkedin.com"
                        className="text-white text-decoration-none"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="mb-0">© 2025 Pathshala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Story;