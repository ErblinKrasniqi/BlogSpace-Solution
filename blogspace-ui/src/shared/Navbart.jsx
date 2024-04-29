import { Link } from "react-router-dom";
import { useAuth } from "../Auth/is-auth";

const Navbart = () => {
  const { isLoggedIn, setIsLoggedIn, role } = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
  };

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
          {isLoggedIn ? (
            <div
              data-bs-toggle="offcanvas"
              className="btn custom-btn custom-border-btn"
              onClick={handleLogOut}
            >
              Logout
            </div>
          ) : (
            <Link
              className="btn custom-btn custom-border-btn"
              data-bs-toggle="offcanvas"
              to="/login"
            >
              Login
            </Link>
          )}
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
                Posts
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_3">
                Tech
              </a>
            </li>
            {isLoggedIn && (
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
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    {role === "Admin" && (
                      <Link to="/users" className="dropdown-item">
                        Users
                      </Link>
                    )}
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <div className="d-none d-lg-block ms-lg-3">
            {isLoggedIn ? (
              <div
                data-bs-toggle="offcanvas"
                className="btn custom-btn custom-border-btn"
                onClick={handleLogOut}
              >
                Logout
              </div>
            ) : (
              <Link
                className="btn custom-btn custom-border-btn"
                data-bs-toggle="offcanvas"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbart;
