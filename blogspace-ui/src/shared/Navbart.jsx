import { Link } from "react-router-dom";
import { useAuth } from "../Auth/is-auth";
import styles from "../Assets/scss/navbar.module.scss";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import moon from "../Assets/images/pngwing.com (4).png";

const Navbart = () => {
  const { isLoggedIn, setIsLoggedIn, role } = useAuth();
  const [showList, setShowList] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setShowList(false);
    setIsLoggedIn(false);
  };

  const handleShowList = () => {
    setShowList(!showList);
  };
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "#3D405B" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={moon} className=" img-fluid" alt="Blog Space"></img>
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
          </ul>

          <div className="d-none d-lg-block ms-lg-3">
            {isLoggedIn ? (
              <div className={styles.mainContainer}>
                <div
                  className={`${styles.profile} ${
                    showList ? styles.profileShadow : ""
                  }`}
                  onClick={handleShowList}
                >
                  <FiMenu size={25} />
                  <CgProfile className={styles.listIcon} size={25} />
                </div>
                {showList ? (
                  <div className={styles.categories}>
                    <Link to="/profile" className={styles.firstP}>
                      Profile
                    </Link>
                    <Link to="/saved">Saved posts</Link>
                    <Link to="/create">Create post</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    {role === "Admin" && (
                      <Link to="/users" className="dropdown-item">
                        Users
                      </Link>
                    )}
                    <Link onClick={handleLogOut}>Logout</Link>
                  </div>
                ) : (
                  ""
                )}
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
