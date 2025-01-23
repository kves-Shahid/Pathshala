import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage"; // Adjust this path if needed
import SignupPage from "./components/SignupPage"; // Import the Signup Page
import "./App.css"; // Main app styling

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the AuthPage (Home Page) */}
          <Route path="/" element={<AuthPage />} />

          {/* Route for the Signup Page */}
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;