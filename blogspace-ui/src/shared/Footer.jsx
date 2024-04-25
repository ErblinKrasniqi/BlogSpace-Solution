const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 me-auto mb-5 mb-lg-0">
            <a
              aria-label="Description of the link"
              className="navbar-brand d-flex align-items-center"
              href="#trick"
            >
              <img
                src="images/logo.png"
                className="navbar-brand-image img-fluid"
                alt=""
              />
              <span className="navbar-brand-text">
                Tiya
                <small>Golf Club</small>
              </span>
            </a>
          </div>

          <div className="col-lg-3 col-12">
            <h5 className="site-footer-title mb-4">Join Us</h5>

            <p className="d-flex border-bottom pb-3 mb-3 me-lg-3">
              <span>Mon-Fri</span>
              6:00 AM - 6:00 PM
            </p>

            <p className="d-flex me-lg-3">
              <span>Sat-Sun</span>
              6:30 AM - 8:30 PM
            </p>
            <br />
            <p className="copyright-text">Copyright © 2048 Tiya Golf Club</p>
          </div>

          <div className="col-lg-2 col-12 ms-auto">
            <ul className="social-icon mt-lg-5 mt-3 mb-4">
              <li className="social-icon-item">
                <a
                  href="#trick"
                  aria-label="Description of the link"
                  className="social-icon-link bi-instagram"
                ></a>
              </li>

              <li className="social-icon-item">
                <a
                  href="#trick"
                  aria-label="Description of the link"
                  className="social-icon-link bi-twitter"
                ></a>
              </li>

              <li className="social-icon-item">
                <a
                  href="#trick"
                  aria-label="Description of the link"
                  className="social-icon-link bi-whatsapp"
                ></a>
              </li>
            </ul>
            <p className="copyright-text">
              Design:{" "}
              <a
                rel="nofollow"
                aria-label="Description of the link"
                href="#trick"
                target="_blank"
              >
                TemplateMo
              </a>
            </p>
          </div>
        </div>
      </div>

      <svg xlinkHref="#myIcon" viewBox="0 0 1440 320">
        <path
          fill="#81B29A"
          fill-opacity="1"
          d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </footer>
  );
};

export default Footer;
