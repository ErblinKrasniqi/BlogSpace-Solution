const Home = () => {
  return (
    <>
      <main>
        <nav class="navbar navbar-expand-lg">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="index.html">
              <img
                src="images/logo.png"
                class="navbar-brand-image img-fluid"
                alt="Tiya Golf Club"
              ></img>
              <span class="navbar-brand-text">
                Tiya
                <small>Golf Club</small>
              </span>
            </a>

            <div class="d-lg-none ms-auto me-3">
              <a
                class="btn custom-btn custom-border-btn"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                Member Login
              </a>
            </div>

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-lg-auto">
                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_1">
                    Home
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_2">
                    About
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_3">
                    Membership
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_4">
                    Events
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_5">
                    Contact Us
                  </a>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#trick"
                    id="navbarLightDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pages
                  </a>

                  <ul
                    class="dropdown-menu dropdown-menu-light"
                    aria-labelledby="navbarLightDropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item" href="event-listing.html">
                        Event Listing
                      </a>
                    </li>

                    <li>
                      <a class="dropdown-item" href="event-detail.html">
                        Event Detail
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <div class="d-none d-lg-block ms-lg-3">
                <a
                  class="btn custom-btn custom-border-btn"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  Member Login
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div
          class="offcanvas offcanvas-end"
          data-bs-scroll="true"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Member Login
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div class="offcanvas-body d-flex flex-column">
            <form
              class="custom-form member-login-form"
              action="#"
              method="post"
            >
              <div class="member-login-form-body">
                <div class="mb-4">
                  <label class="form-label mb-2" for="member-login-number">
                    Membership No.
                  </label>

                  <input
                    type="text"
                    name="member-login-number"
                    id="member-login-number"
                    class="form-control"
                    placeholder="11002560"
                    required
                  ></input>
                </div>

                <div class="mb-4">
                  <label class="form-label mb-2" for="member-login-password">
                    Password
                  </label>

                  <input
                    type="password"
                    name="member-login-password"
                    id="member-login-password"
                    pattern="[0-9a-zA-Z]{4,10}"
                    class="form-control"
                    placeholder="Password"
                    required=""
                  ></input>
                </div>

                <div class="form-check mb-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  ></input>

                  <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                  </label>
                </div>

                <div class="col-lg-5 col-md-7 col-8 mx-auto">
                  <button type="submit" class="form-control">
                    Login
                  </button>
                </div>

                <div class="text-center my-4">
                  <a href="#trick">Forgotten password?</a>
                </div>
              </div>
            </form>

            <div class="mt-auto mb-5">
              <p>
                <strong class="text-white me-3">Any Questions?</strong>

                <a href="tel: 010-020-0340" class="contact-link">
                  010-020-0340
                </a>
              </p>
            </div>
          </div>

          <svg xlinkHref="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320">
            <path
              fill="#3D405B"
              fill-opacity="1"
              d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>

        <section
          class="hero-section d-flex justify-content-center align-items-center"
          id="section_1"
        >
          <div class="section-overlay"></div>

          <svg xlinkHref="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320">
            <path
              fill="#3D405B"
              fill-opacity="1"
              d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>

          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-12 mb-5 mb-lg-0">
                <h2 class="text-white">Welcome to the club</h2>

                <h1 class="cd-headline rotate-1 text-white mb-4 pb-2">
                  <span>Tiya is</span>
                  <span class="cd-words-wrapper">
                    <b class="is-visible">Modern</b>
                    <b>Creative</b>
                    <b>Lifestyle</b>
                  </span>
                </h1>

                <div class="custom-btn-group">
                  <a href="#section_2" class="btn custom-btn smoothscroll me-3">
                    Our Story
                  </a>

                  <a href="#section_3" class="link smoothscroll">
                    Become a member
                  </a>
                </div>
              </div>

              <div class="col-lg-6 col-12">
                <div class="ratio ratio-16x9">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/MGNgbNGOzh8"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <svg xlinkHref="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </section>

        <section class="about-section section-padding" id="section_2">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-12 text-center">
                <h2 class="mb-lg-5 mb-4">About Tiya</h2>
              </div>

              <div class="col-lg-5 col-12 me-auto mb-4 mb-lg-0">
                <h3 class="mb-3">Tiya Club History</h3>

                <p>
                  <strong>Since 1984</strong>, Tiya is ranked #8 in the top 10
                  golf courses in the world. Tiya is Bootstrap 5 HTML CSS
                  template for golf clubs. Anyone can modify and use this layout
                  for commercial purposes.
                </p>

                <p>
                  Tiya Golf Club is 100% free CSS template provided by
                  TemplateMo website. Please tell your friends about our
                  website. Thank you for visiting.
                </p>
              </div>

              <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                <div class="member-block">
                  <div class="member-block-image-wrap">
                    <img
                      src="images/members/portrait-young-handsome-businessman-wearing-suit-standing-with-crossed-arms-with-isolated-studio-white-background.jpg"
                      class="member-block-image img-fluid"
                      alt=""
                    ></img>

                    <ul class="social-icon">
                      <li class="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          class="social-icon-link bi-twitter"
                        ></a>
                      </li>

                      <li class="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          class="social-icon-link bi-whatsapp"
                        ></a>
                      </li>
                    </ul>
                  </div>

                  <div class="member-block-info d-flex align-items-center">
                    <h4>Michael</h4>

                    <p class="ms-auto">Founder</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 col-12">
                <div class="member-block">
                  <div class="member-block-image-wrap">
                    <img
                      src="images/members/successful-asian-lady-boss-red-blazer-holding-clipboard-with-documens-pen-working-looking-happy-white-background.jpg"
                      class="member-block-image img-fluid"
                      alt=""
                    ></img>

                    <ul class="social-icon">
                      <li class="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          class="social-icon-link bi-linkedin"
                        ></a>
                      </li>
                      <li class="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          class="social-icon-link bi-twitter"
                        ></a>
                      </li>
                    </ul>
                  </div>

                  <div class="member-block-info d-flex align-items-center">
                    <h4>Sandy</h4>

                    <p class="ms-auto">Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section-bg-image">
          <svg viewBox="0 0 1265 144" xlinkHref="http://www.w3.org/1999/xlink">
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 0 40 C 164 40 164 20 328 20 L 328 20 L 328 0 L 0 0 Z"
              stroke-width="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 327 20 C 445.5 20 445.5 89 564 89 L 564 89 L 564 0 L 327 0 Z"
              stroke-width="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 563 89 C 724.5 89 724.5 48 886 48 L 886 48 L 886 0 L 563 0 Z"
              stroke-width="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 885 48 C 1006.5 48 1006.5 67 1128 67 L 1128 67 L 1128 0 L 885 0 Z"
              stroke-width="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 1127 67 C 1196 67 1196 0 1265 0 L 1265 0 L 1265 0 L 1127 0 Z"
              stroke-width="0"
            ></path>
          </svg>

          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="section-bg-image-block">
                  <h2 class="mb-lg-3">Get our newsletter</h2>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor ut labore et dolore.
                  </p>

                  <form
                    action="#"
                    method="get"
                    class="custom-form mt-lg-4 mt-2"
                    role="form"
                  >
                    <div class="input-group input-group-lg">
                      <span
                        class="input-group-text bi-envelope"
                        id="basic-addon1"
                      ></span>

                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        class="form-control"
                        placeholder="Email address"
                        required=""
                      ></input>

                      <button type="submit" class="form-control">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <svg viewBox="0 0 1265 144" xlinkHref="http://www.w3.org/1999/xlink">
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 0 40 C 164 40 164 20 328 20 L 328 20 L 328 0 L 0 0 Z"
              stroke-width="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 327 20 C 445.5 20 445.5 89 564 89 L 564 89 L 564 0 L 327 0 Z"
              stroke-width="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 563 89 C 724.5 89 724.5 48 886 48 L 886 48 L 886 0 L 563 0 Z"
              stroke-width="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 885 48 C 1006.5 48 1006.5 67 1128 67 L 1128 67 L 1128 0 L 885 0 Z"
              stroke-width="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 1127 67 C 1196 67 1196 0 1265 0 L 1265 0 L 1265 0 L 1127 0 Z"
              stroke-width="0"
            ></path>
          </svg>
        </section>
      </main>
    </>
  );
};

export default Home;
