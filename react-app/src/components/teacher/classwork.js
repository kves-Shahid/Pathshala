import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./classwork.css";
import logoImage from "../logo.png";
import { createMaterial, fetchMaterials } from "../../utils/api";

const Classwork = () => {
  const { id } = useParams(); 
  console.log("Class ID:", id);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [attachmentType, setAttachmentType] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchClassMaterials = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchMaterials(id); 
        setAssignments(response.materials);
      } catch (error) {
        setError("Failed to fetch materials. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassMaterials();
  }, [id]); 
 
  const handleCreateClick = () => setShowCreateModal(true);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setActiveModal(null);
    setAttachmentType(null);
    setFile(null);
  };

  const handleMainOptionClick = (type) => {
    setActiveModal(type);
    setShowCreateModal(false);
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "video/mp4"];
      const maxSize = 50 * 1024 * 1024; 

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a JPEG, PNG, PDF, or MP4 file.");
        return;
      }

      if (selectedFile.size > maxSize) {
        setError("File size exceeds the limit of 50MB.");
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };


  const handleAddAssignment = async () => {
    const title = document.querySelector('.modal-body input[type="text"]').value;
    const instructions = document.querySelector('.modal-body textarea')?.value || "";

    if (!title) {
      setError("Title is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", instructions);
    formData.append("type", activeModal);
    formData.append("classId", id); 

    if (file) {
      formData.append("files", file);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await createMaterial(formData);
      setAssignments([...assignments, response.newMaterial]);
      handleCloseModal();
    } catch (error) {
      setError("Failed to create material. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleCloseModal();
  };

  const handleDonateClick = () => {
    navigate("/donate");
  };

  return (
    <div className="classwork-page">
    
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <button
              className="btn btn-outline-secondary me-3 d-lg-none"
              type="button"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              ☰
            </button>
            <div className="d-flex align-items-center me-auto">
              <div className="input-group search-bar d-none d-lg-flex">
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
            <Link to="/" className="navbar-brand mx-auto">
              <img
                src={logoImage}
                alt="Pathshala Logo"
                className="navbar-logo"
                style={{ height: "40px" }}
              />
            </Link>
            <div className="d-flex align-items-center ms-auto d-none d-lg-flex">
              <button
                className="btn btn-outline-light me-2"
                onClick={handleDonateClick}
              >
                Donate
              </button>
              <button
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="top-bar d-none d-lg-block">
        <div className="d-flex align-items-center">
          <nav className="nav">
            <NavLink
              to={`/class/${id}`}
              className="nav-link"
              activeClassName="active"
            >
              Stream
            </NavLink>
            <NavLink
              to="/teacher/classwork"
              className="nav-link"
              activeClassName="active"
            >
              Classwork
            </NavLink>
            <NavLink
              to="/teacher/people"
              className="nav-link"
              activeClassName="active"
            >
              People
            </NavLink>
            <NavLink to="/marks" className="nav-link" activeClassName="active">
              Marks
            </NavLink>
          </nav>
        </div>
      </div>

     
      <div
        className={`sidebar bg-dark text-white ${
          showSidebar ? "show" : "hide"
        }`}
      >
        <div className="sidebar-header">
          <h5>Classroom</h5>
        </div>
        <div className="sidebar-body">
          <nav className="nav flex-column">
            <Link to="/teacher/dash" className="nav-link text-white">
              Stream
            </Link>
            <Link
              to="/teacher/classwork"
              className="nav-link text-white active"
            >
              Classwork
            </Link>
            <Link to="/teacher/students" className="nav-link text-white">
              People
            </Link>
            <Link to="/teacher/marks" className="nav-link text-white">
              Marks
            </Link>
            <div className="d-lg-none mt-3">
              <button
                className="btn btn-outline-light w-100 mb-2"
                onClick={handleDonateClick}
              >
                Donate
              </button>
              <button
                className="btn btn-outline-light w-100"
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </div>
          </nav>
        </div>
      </div>

      
      <main className="classwork-content">
        <div className="content-container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Classwork</h2>
            <button className="btn btn-success" onClick={handleCreateClick}>
              Create
            </button>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="scrollable-content">
              {assignments.length === 0 ? (
                <div className="empty-state text-center">
                  <p className="text-muted">
                    This is where you'll assign work. You can add assignments and
                    other work for the class, then organize it into topics.
                  </p>
                </div>
              ) : (
                assignments.map((assignment, index) => (
                  <div key={index} className="assignment-item mb-3">
                    <h4>{assignment.title}</h4>
                    <p>{assignment.description}</p>
                    {assignment.files && assignment.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="attachment">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.type === "video" ? "Watch Video" : "View File"}
                        </a>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {showCreateModal && (
        <div className="create-modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <div className="create-options">
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("assignment")}
                >
                  <i className="bi bi-file-earmark-plus"></i>
                  Assignment
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("quiz")}
                >
                  <i className="bi bi-question-square"></i>
                  Quiz assignment
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("material")}
                >
                  <i className="bi bi-file-text"></i>
                  Material
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("reuse")}
                >
                  <i className="bi bi-recycle"></i>
                  Reuse post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    
      {activeModal && (
        <div className="create-modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title text-capitalize">
                {activeModal.replace("-", " ")}
              </h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" required />
              </div>

              {activeModal === "assignment" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Instructions</label>
                    <textarea className="form-control" rows="3" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Attach</label>
                    <div className="d-flex gap-2 flex-wrap">
                      {["drive", "youtube", "upload", "link"].map((type) => (
                        <button
                          key={type}
                          className={`btn btn-outline-secondary ${
                            attachmentType === type ? "active" : ""
                          }`}
                          onClick={() => setAttachmentType(type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>

                    {attachmentType === "upload" && (
                      <div className="mt-3">
                        <input
                          type="file"
                          id="file-upload"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <button
                          className="btn btn-outline-secondary w-100"
                          onClick={() => document.getElementById("file-upload").click()}
                        >
                          Upload File
                        </button>
                      </div>
                    )}

                    {attachmentType && attachmentType !== "upload" && (
                      <div className="mt-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Enter ${attachmentType} link`}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleAddAssignment}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : `Create ${activeModal.replace("-", " ")}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classwork;