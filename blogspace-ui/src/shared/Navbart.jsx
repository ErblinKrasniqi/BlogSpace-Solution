import { Link } from "react-router-dom";

const Navbart = () => {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "#3D405B" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="images/logo.png"
            className="navbar-brand-image img-fluid"
            alt="Blog Space"
          ></img>
          <span className="navbar-brand-text">
            Blog Space
            <small className="mt-1">Posting blogs</small>
          </span>
        </Link>

        <div className="d-lg-none ms-auto me-3">
          <a
            className="btn custom-btn custom-border-btn"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            Login
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-lg-auto">
            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_1">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_2">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_3">
                Membership
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_4">
                Events
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_5">
                Contact Us
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#trick"
                id="navbarLightDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>

              <ul
                className="dropdown-menu dropdown-menu-light"
                aria-labelledby="navbarLightDropdownMenuLink"
              >
                <li>
                  <Link to="/create" className="dropdown-item">
                    Create post
                  </Link>
                </li>

                <li>
                  <a className="dropdown-item" href="event-listing.html">
                    Edit post
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="event-detail.html">
                    Dashboard
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <div className="d-none d-lg-block ms-lg-3">
            <Link
              className="btn custom-btn custom-border-btn"
              data-bs-toggle="offcanvas"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbart;
