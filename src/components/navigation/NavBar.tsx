import { Link, useLocation } from "react-router-dom";

// import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  return (
    <div className="nav">
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "visited" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/allbreweries"
          className={`nav-link ${
            location.pathname === "/allbreweries" ? "visited" : ""
          }`}
        >
          All Breweries
        </Link>
        <Link
          to="/search"
          className={`nav-link ${
            location.pathname === "/search" ? "visited" : ""
          }`}
        >
          Search Breweries
        </Link>
        <Link
          to="/contact"
          className={`nav-link ${
            location.pathname === "/contact" ? "visited" : ""
          }`}
        >
          Contact Form
        </Link>
      </div>
    </div>
  );
}
