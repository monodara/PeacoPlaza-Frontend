import React from "react";

// export default function NavBar() {
//   return <div>NavBar</div>;
// }

import { Link } from "react-router-dom";

// import "./NavBar.css";

export default function Navbar() {
  // const location = useLocation();
  return (
    <div className="nav">
      <div className="nav-links">
        <Link
          to="/"
          // className={`nav-link ${location.pathname === "/" ? "visited" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/products"
          // className={`nav-link ${
          //   location.pathname === "/allproduct" ? "visited" : ""
          // }`}
        >
          All Products
        </Link>
        {/* <Link
          to="/category"
          // className={`nav-link ${
          //   location.pathname === "/allproduct" ? "visited" : ""
          // }`}
        >
          All Products
        </Link> */}
      </div>
    </div>
  );
}
