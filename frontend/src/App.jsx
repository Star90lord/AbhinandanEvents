import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import EventDetail from "./Pages/EventDetail";

// Authentication
import Login from "./auth_components/Login";
import Signup from "./auth_components/Signup";
import VendorRegister from "./auth_components/VendorRegister";

// Dashboards
import ClientDashboard from "./Dashboard/ClientDashboard";
import PlannerDashboard from "./Dashboard/PlannerDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";

function App() {
  return (
    <Router>

      {/* Top Navigation */}
      <Navbar />

      {/* Main Pages */}
      <div className="min-h-screen">

        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/vendor-register" element={<VendorRegister />} />

          {/* Dashboards */}
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/planner-dashboard" element={<PlannerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/events/:slug" element={<EventDetail />} />

        </Routes>

      </div>

      {/* Footer */}
      <Footer />

    </Router>
  );
}

export default App;
