import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage"; // Import AuthPage component
import SignupPage from "./components/SignupPage"; // Import SignupPage component
import LoginPage from "./components/login/loginpage"; // Import LoginPage component
import Teacher from "./components/teacher/teacher"; // Import Teacher component
import Classes from "./components/teacher/Classes"; // Import Classes component
import Students from "./components/teacher/Students"; // Import Students component
import Resources from "./components/teacher/Resources"; // Import Resources component
import "./App.css"; // Import App-specific CSS

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route (Auth Page) */}
          <Route path="/" element={<AuthPage />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Routes for Login and Teacher Dashboard */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/teacher-dashboard" element={<Teacher />} />

          {/* Routes for Teacher Dashboard sub-components */}
          <Route path="/teacher/classes" element={<Classes />} />
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
