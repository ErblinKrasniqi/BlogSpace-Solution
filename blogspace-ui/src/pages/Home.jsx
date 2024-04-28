import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../Api";
import anime from "animejs";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const myElement = useRef([]);
  const videoSpin = useRef(null);

  const gettingPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts.data.posts);
      setLoaded(true);
    } catch (error) {
      setError(error.response.data.message);
      setLoaded(false);
    }
  };

  useEffect(() => {
    gettingPosts();
  }, [loaded]);

  //animations

  useLayoutEffect(() => {
    anime({
      targets: myElement.current,
      opacity: [0, 1],
      translateY: [-250, 0],
      duration: 2000,
      delay: anime.stagger(100, { start: 300 }),
    });

    anime({
      targets: videoSpin.current,
      opacity: [0, 1],
      translateY: [-250, 0],
      easing: "easeOutBounce",
      duration: 2000,
    });
  }, []);

  return (
    <>
      <main>
        <section
          className="hero-section d-flex justify-content-center align-items-center"
          id="section_1"
        >
          <div className="section-overlay"></div>

          <svg xlinkHref="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320">
            <path
              fill="#3D405B"
              fillOpacity="1"
              d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>

          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 mb-5 mb-lg-0">
                <h1
                  ref={(el) => (myElement.current[0] = el)}
                  className="text-white"
                >
                  Keep up with
                </h1>

                <h1
                  ref={(el) => (myElement.current[1] = el)}
                  className="cd-headline rotate-1 text-white mb-4 pb-2"
                >
                  <span>the best</span>
                  <span className="cd-words-wrapper">
                    <b className="is-visible">News</b>
                    <b>Creative</b>
                    <b>Lifestyle</b>
                  </span>
                </h1>

                <div className="custom-btn-group">
                  <a
                    href="#section_2"
                    className="btn custom-btn smoothscroll me-3"
                  >
                    Read
                  </a>

                  <a href="#section_3" className="link smoothscroll">
                    Become a member
                  </a>
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div ref={videoSpin} className="ratio ratio-16x9">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/MGNgbNGOzh8"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <svg xlinkHref="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </section>

        <section className="events-section section-padding" id="section_2">
          <div className="container">
            <div className="row ">
              <div className="col-lg-12 col-12 mt-5">
                <h2 onClick={gettingPosts} className="mb-lg-5 mb-4">
                  Latest Posts
                </h2>
              </div>
              {loaded ? (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="col-lg-6 col-12 mb-5 mb-lg-0 mt-5"
                  >
                    <div className="custom-block-image-wrap">
                      <Link to={`/details/${post._id}`}>
                        <img
                          src={`http://localhost:8080/images/${post.imageUrl}`}
                          className="custom-block-image img-fluid"
                          alt=""
                        ></img>

                        <i className="custom-block-icon bi-link"></i>
                      </Link>

                      <div className="custom-block-date-wrap">
                        <strong className="text-white">{post.createdAt}</strong>
                      </div>

                      <div className="custom-btn-wrap">
                        <Link
                          to={`/details/${post._id}`}
                          className="btn custom-btn"
                        >
                          View Post
                        </Link>
                      </div>
                    </div>

                    <div className="custom-block-info">
                      <a href="event-detail.html" className="events-title mb-2">
                        {post.title}
                      </a>

                      <p className="mb-0">{post.description}</p>

                      <div className="border-top mt-4 pt-3">
                        <div className="d-flex flex-wrap align-items-center mb-1">
                          <span className="custom-block-span">Location:</span>

                          <p className="mb-0">National Center, NYC</p>
                        </div>

                        <div className="d-flex flex-wrap align-items-center">
                          <span className="custom-block-span">Author:</span>

                          <p className="mb-0">{post.creatorName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <h3>{error}</h3>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="about-section section-padding" id="section_2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12 text-center">
                <h2 className="mb-lg-5 mb-4">About Us</h2>
              </div>

              <div className="col-lg-5 col-12 me-auto mb-4 mb-lg-0">
                <h3 className="mb-3">Web Developers</h3>

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

              <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                <div className="member-block">
                  <div className="member-block-image-wrap">
                    <img
                      src={require("../Assets/images/members/portrait-young-handsome-businessman-wearing-suit-standing-with-crossed-arms-with-isolated-studio-white-background.jpg")}
                      className="member-block-image img-fluid"
                      alt=""
                    ></img>

                    <ul className="social-icon">
                      <li className="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          className="social-icon-link bi-twitter"
                        ></a>
                      </li>

                      <li className="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          className="social-icon-link bi-whatsapp"
                        ></a>
                      </li>
                    </ul>
                  </div>

                  <div className="member-block-info d-flex align-items-center">
                    <h4>Michael</h4>

                    <p className="ms-auto">Founder</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12">
                <div className="member-block">
                  <div className="member-block-image-wrap">
                    <img
                      src={require("../Assets/images/members/successful-asian-lady-boss-red-blazer-holding-clipboard-with-documens-pen-working-looking-happy-white-background.jpg")}
                      className="member-block-image img-fluid"
                      alt=""
                    ></img>

                    <ul className="social-icon">
                      <li className="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          className="social-icon-link bi-linkedin"
                        ></a>
                      </li>
                      <li className="social-icon-item">
                        <a
                          aria-label="Description of the link"
                          href="#trick"
                          className="social-icon-link bi-twitter"
                        ></a>
                      </li>
                    </ul>
                  </div>

                  <div className="member-block-info d-flex align-items-center">
                    <h4>Sandy</h4>

                    <p className="ms-auto">Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-bg-image">
          <svg viewBox="0 0 1265 144" xlinkHref="http://www.w3.org/1999/xlink">
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 0 40 C 164 40 164 20 328 20 L 328 20 L 328 0 L 0 0 Z"
              strokeWidth="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 327 20 C 445.5 20 445.5 89 564 89 L 564 89 L 564 0 L 327 0 Z"
              strokeWidth="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 563 89 C 724.5 89 724.5 48 886 48 L 886 48 L 886 0 L 563 0 Z"
              strokeWidth="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 885 48 C 1006.5 48 1006.5 67 1128 67 L 1128 67 L 1128 0 L 885 0 Z"
              strokeWidth="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 1127 67 C 1196 67 1196 0 1265 0 L 1265 0 L 1265 0 L 1127 0 Z"
              strokeWidth="0"
            ></path>
          </svg>

          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="section-bg-image-block">
                  <h2 className="mb-lg-3">Get our newsletter</h2>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor ut labore et dolore.
                  </p>

                  <form
                    action="#"
                    method="get"
                    className="custom-form mt-lg-4 mt-2"
                  >
                    <div className="input-group input-group-lg">
                      <span
                        className="input-group-text bi-envelope"
                        id="basic-addon1"
                      ></span>

                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        className="form-control"
                        placeholder="Email address"
                        required=""
                      ></input>

                      <button type="submit" className="form-control">
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
              strokeWidth="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 327 20 C 445.5 20 445.5 89 564 89 L 564 89 L 564 0 L 327 0 Z"
              strokeWidth="0"
            ></path>{" "}
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 563 89 C 724.5 89 724.5 48 886 48 L 886 48 L 886 0 L 563 0 Z"
              strokeWidth="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 885 48 C 1006.5 48 1006.5 67 1128 67 L 1128 67 L 1128 0 L 885 0 Z"
              strokeWidth="0"
            ></path>
            <path
              fill="rgba(255, 255, 255, 1)"
              d="M 1127 67 C 1196 67 1196 0 1265 0 L 1265 0 L 1265 0 L 1127 0 Z"
              strokeWidth="0"
            ></path>
          </svg>
        </section>

        <section className="membership-section section-padding" id="section_3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12 text-center mx-auto mb-lg-5 mb-4">
                <h2>
                  <span>Membership</span> at Tiya
                </h2>
              </div>

              <div className="col-lg-6 col-12 mb-3 mb-lg-0">
                <h4 className="mb-4 pb-lg-2">Membership Fees</h4>

                <div className="table-responsive">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th style={{ width: "34%" }}>Yearly Access</th>

                        <th style={{ width: "22%" }}>T1 $420</th>

                        <th style={{ width: "22%" }}>T2 $640</th>

                        <th style={{ width: "22%" }}>T3 $860</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th scope="row" className="text-start">
                          Golf Insurance
                        </th>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row" className="text-start">
                          Club Facilities
                        </th>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row" className="text-start">
                          Country Club
                        </th>

                        <td>
                          <i className="bi-x-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row" className="text-start">
                          Weekend Seasonal
                        </th>

                        <td>
                          <i className="bi-x-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row" className="text-start">
                          Premium Courses
                        </th>

                        <td>
                          <i className="bi-x-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-x-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row" className="text-start">
                          Pro's Networking
                        </th>

                        <td>
                          <i className="bi-x-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-x-circle-fill"></i>
                        </td>

                        <td>
                          <i className="bi-check-circle-fill"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-5 col-12 mx-auto">
                <h4 className="mb-4 pb-lg-2">Please join us!</h4>
                <form
                  action="#"
                  method="post"
                  className="custom-form membership-form shadow-lg"
                >
                  <div>
                    <h4 className="text-white mb-4">Become a member</h4>

                    <div className="form-floating">
                      <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        className="form-control"
                        placeholder="Full Name"
                        required=""
                      />

                      <label htmlFor="floatingInput">Full Name</label>
                    </div>

                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        className="form-control"
                        placeholder="Email address"
                        required=""
                      />

                      <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        placeholder="Describe message here"
                      ></textarea>

                      <label htmlFor="floatingTextarea"> Comments</label>
                    </div>

                    <button type="submit" className="form-control">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section
          className="events-section section-bg section-padding"
          id="section_4"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12">
                <h2 className="mb-lg-3">Upcoming Events</h2>
              </div>

              <div className="row custom-block mb-3">
                <div className="col-lg-2 col-md-4 col-12 order-2 order-md-0 order-lg-0">
                  <div className="custom-block-date-wrap d-flex d-lg-block d-md-block align-items-center mt-3 mt-lg-0 mt-md-0">
                    <h6 className="custom-block-date mb-lg-1 mb-0 me-3 me-lg-0 me-md-0">
                      24
                    </h6>

                    <strong className="text-white">Feb 2048</strong>
                  </div>
                </div>

                <div className="col-lg-4 col-md-8 col-12 order-1 order-lg-0">
                  <div className="custom-block-image-wrap">
                    <a href="event-detail.html">
                      <img
                        src={require("../Assets/images/professional-golf-player.jpg")}
                        className="custom-block-image img-fluid"
                        alt=""
                      />

                      <i className="custom-block-icon bi-link"></i>
                    </a>
                  </div>
                </div>

                <div className="col-lg-6 col-12 order-3 order-lg-0">
                  <div className="custom-block-info mt-2 mt-lg-0">
                    <a href="event-detail.html" className="events-title mb-3">
                      Private activities
                    </a>

                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <div className="d-flex flex-wrap border-top mt-4 pt-3">
                      <div className="mb-4 mb-lg-0">
                        <div className="d-flex flex-wrap align-items-center mb-1">
                          <span className="custom-block-span">Location:</span>

                          <p className="mb-0">National Center, NYC</p>
                        </div>

                        <div className="d-flex flex-wrap align-items-center">
                          <span className="custom-block-span">Ticket:</span>

                          <p className="mb-0">$250</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center ms-lg-auto">
                        <a href="event-detail.html" className="btn custom-btn">
                          View Post
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row custom-block custom-block-bg">
                <div className="col-lg-2 col-md-4 col-12 order-2 order-md-0 order-lg-0">
                  <div className="custom-block-date-wrap d-flex d-lg-block d-md-block align-items-center mt-3 mt-lg-0 mt-md-0">
                    <h6 className="custom-block-date mb-lg-1 mb-0 me-3 me-lg-0 me-md-0">
                      28
                    </h6>

                    <strong className="text-white">Feb 2048</strong>
                  </div>
                </div>

                <div className="col-lg-4 col-md-8 col-12 order-1 order-lg-0">
                  <div className="custom-block-image-wrap">
                    <a href="event-detail.html">
                      <img
                        src={require("../Assets/images/girl-taking-selfie-with-friends-golf-field.jpg")}
                        className="custom-block-image img-fluid"
                        alt=""
                      />

                      <i className="custom-block-icon bi-link"></i>
                    </a>
                  </div>
                </div>

                <div className="col-lg-6 col-12 order-3 order-lg-0">
                  <div className="custom-block-info mt-2 mt-lg-0">
                    <a href="event-detail.html" className="events-title mb-3">
                      Group tournament activities
                    </a>

                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <div className="d-flex flex-wrap border-top mt-4 pt-3">
                      <div className="mb-4 mb-lg-0">
                        <div className="d-flex flex-wrap align-items-center mb-1">
                          <span className="custom-block-span">Location:</span>

                          <p className="mb-0">National Center, NYC</p>
                        </div>

                        <div className="d-flex flex-wrap align-items-center">
                          <span className="custom-block-span">Ticket:</span>

                          <p className="mb-0">$350</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center ms-lg-auto">
                        <a href="event-detail.html" className="btn custom-btn">
                          Buy Ticket
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-padding" id="section_5">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-12">
                <form
                  action="#"
                  method="post"
                  className="custom-form contact-form"
                >
                  <h2 className="mb-4 pb-2">Contact Tiya</h2>

                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="full-name"
                          id="full-name"
                          className="form-control"
                          placeholder="Full Name"
                          required=""
                        />

                        <label htmlFor="floatingInput">Full Name</label>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          pattern="[^ @]*@[^ @]*"
                          className="form-control"
                          placeholder="Email address"
                          required=""
                        />

                        <label htmlFor="floatingInput">Email address</label>
                      </div>
                    </div>

                    <div className="col-lg-12 col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          placeholder="Describe message here"
                        ></textarea>

                        <label htmlFor="floatingTextarea">Message</label>
                      </div>

                      <button type="submit" className="form-control">
                        Submit Form
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-lg-6 col-12">
                <div className="contact-info mt-5">
                  <div className="contact-info-item">
                    <div className="contact-info-body">
                      <strong>London, United Kingdom</strong>

                      <p className="mt-2 mb-1">
                        <a href="#trick" className="contact-link">
                          (020) 010-020-0340
                        </a>
                      </p>

                      <p className="mb-0">
                        <a href="#trick" className="contact-link">
                          info@company.com
                        </a>
                      </p>
                    </div>

                    <div className="contact-info-footer">
                      <a href="#trick">Directions</a>
                    </div>
                  </div>

                  {/* <img
                    src={require("../Assets/images/WorldMap.svg")}
                    className="img-fluid"
                    alt=""
                  ></img> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
