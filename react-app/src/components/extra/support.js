import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./support.css";
import logoImage from "../logo.png";
import axios from "axios";

const SupportCommunity = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadContent, setUploadContent] = useState("");
  const [searchError, setSearchError] = useState("");

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get(`/api/v1/support/search?q=${searchQuery}`);
      setSearchResults(response.data);
      setSearchError("");
    } catch (error) {
      console.error("Error searching support texts:", error);
      setSearchError("Failed to search support texts. Please try again.");
      setSearchResults([]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadContent.trim()) {
      alert("Please fill in both the title and content fields.");
      return;
    }

    try {
      await axios.post("/api/v1/support/upload", { title: uploadTitle, content: uploadContent });
      alert("Support text uploaded successfully!");
      setUploadTitle("");
      setUploadContent("");
    } catch (error) {
      console.error("Error uploading support text:", error);
      alert("Failed to upload support text. Please try again.");
    }
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate");
  };

  const handleLoginRedirect = () => navigate("/login");
  const handleSignupRedirect = () => navigate("/signup");
  const handleExploreClick = (e) => {
    e.preventDefault();
    console.log("Explore clicked");
  };

  return (
    <div className="support-page">
     
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-success" type="button" onClick={handleSearch}>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-success" type="button" onClick={handleSearch}>
                  Search
                </button>
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

      <main className="support-content" style={{ paddingTop: `${navHeight}px` }}>
        <div className="search-background" style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190625/ourmid/pngtree-overshoot-computer-desktop-background-image_259786.jpg')` }}>
          <div className="search-container">
            <h1>How can we help?</h1>
            <div className="input-group search-bar-main">
              <input
                type="text"
                className="form-control"
                placeholder="Start your search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-success" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
            {searchError && <p className="text-danger mt-2">{searchError}</p>}
          </div>
        </div>
        <div className="community-content">
          <h2>Community</h2>
          <div className="latest-news">
            <h3>Search Results</h3>
            {searchResults.length > 0 ? (
              searchResults.map((text) => (
                <div key={text._id} className="news-item">
                  <h4>{text.title}</h4>
                  <p>{text.content}</p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
          <div className="upload-section">
            <h3>Upload Support Text</h3>
            <form onSubmit={handleUpload}>
              <input
                type="text"
                placeholder="Title"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Content"
                value={uploadContent}
                onChange={(e) => setUploadContent(e.target.value)}
                required
              />
              <button type="submit">Upload</button>
            </form>
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

export default SupportCommunity;