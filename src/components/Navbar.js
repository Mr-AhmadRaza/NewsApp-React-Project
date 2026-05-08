import React, { useRef } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarRef = useRef(null);

  const handleNavClick = () => {
    if (navbarRef.current) {
      // Use Bootstrap 5's Collapse API to properly close the navbar
      const bsCollapse = window.bootstrap?.Collapse.getInstance(navbarRef.current);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NewsApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navbarRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/business" onClick={handleNavClick}>Business</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/general" onClick={handleNavClick}>General</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/science" onClick={handleNavClick}>Science</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sports" onClick={handleNavClick}>Sports</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;