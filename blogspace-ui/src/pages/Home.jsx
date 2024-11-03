import { useRef, useLayoutEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useApiGetPosts } from "../Hooks/userHooks";
import anime from "animejs";
import styles from "../Assets/scss/home.module.scss";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const {
    posts,
    loaded,
    error,
    setPage,
    totalPosts,
    page,

    searchRsults,
    debouncedSearchPosts,
  } = useApiGetPosts();

  //animations
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const [ref2, inView2] = useInView({ triggerOnce: true });

  const totalPages = Math.ceil(totalPosts / 2);

  const myElement = useRef([]);
  const iconsAnimation = useRef([]);
  const videoSpin = useRef(null);
  const textEffect = useRef(null);
  const postsLoad = useRef([]);

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
      delay: 1000,
    });
  }, []);

  useLayoutEffect(() => {
    const animation = anime({
      targets: textEffect.current,
      translateX: ["-100%", "100%"],
      duration: 20000,
      loop: true,
      easing: "linear",
      direction: "reverse",
    });

    return () => animation.pause();
  }, []);

  useLayoutEffect(() => {
    if (inView) {
      anime({
        targets: postsLoad.current,
        scale: [0, 1],
        opacity: [1],
        easing: "easeInOutSine",
        duration: 1000,
        delay: anime.stagger(900, { start: 300 }),
      });
    }
  }, [inView]);

  useLayoutEffect(() => {
    anime({
      targets: iconsAnimation.current,
      opacity: [0, 1],
      translateY: [-200, 0],
      duration: 5000,
      delay: anime.stagger(300, { direction: "alternate", start: 300 }),
    });
  }, [inView2, page]);

  return (
    <>
      <main>
        <section className={styles.container}>
          <div className={styles.searchBar}>
            <div className={styles.boxes}>
              <h2>Where</h2>
              <h3>Search destinations</h3>
            </div>
            <div className={styles.line}></div>
            <div className={styles.boxes}>
              <h2>Where</h2>
              <h3>Search destinations</h3>
            </div>
            <div className={styles.line}></div>
            <div className={styles.boxes}>
              <h2>Where</h2>
              <h3>Search destinations</h3>
            </div>
            <div>
              <div className={styles.circle}>
                <FaSearch color="white" size={20} />
              </div>
            </div>
          </div>
        </section>

        <section className="events-section " id="section_2">
          <div className="container">
            <div className="row ">
              {loaded ? (
                posts.map((post, index) => (
                  <div
                    ref={(el) => (postsLoad.current[index] = el)}
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
              {/*Pegination */}
              <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <li
                          className={`page-item ${
                            page === pageNumber ? "active" : ""
                          }`}
                          key={pageNumber}
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section section-padding" id="section_3">
          <div className="container">
            <div className="row  d-flex gap-4 justify-content-center">
              <div className="d-flex justify-content-center mb-5">
                <h1 ref={ref2}>Technologies used</h1>
              </div>
              <img
                style={{ width: "300px" }}
                ref={(el) => (iconsAnimation.current[0] = el)}
                src={require("../Assets/images/Icons/nodejs-ar21.svg").default}
                alt="Node.js Icon"
              />
              <img
                style={{ width: "300px" }}
                ref={(el) => (iconsAnimation.current[1] = el)}
                src={require("../Assets/images/Icons/mongodb-ar21.svg").default}
                alt="Node.js Icon"
              />
              <img
                style={{ width: "300px" }}
                ref={(el) => (iconsAnimation.current[2] = el)}
                src={require("../Assets/images/Icons/reactjs-ar21.svg").default}
                alt="Node.js Icon"
              />
              <img
                style={{ width: "300px" }}
                ref={(el) => (iconsAnimation.current[3] = el)}
                src={
                  require("../Assets/images/Icons/expressjs-ar21.svg").default
                }
                alt="Node.js Icon"
              />
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
                        autoComplete="on"
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

        <section className="contact-section section-padding" id="section_5">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-12">
                <form
                  action="#"
                  method="post"
                  className="custom-form contact-form"
                >
                  <h2 className="mb-4 pb-2">Contact Us</h2>

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

                        <label htmlFor="full-name">Full Name</label>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="on"
                          pattern="[^ @]*@[^ @]*"
                          className="form-control"
                          placeholder="Email address"
                          required=""
                        />

                        <label htmlFor="email">Email address</label>
                      </div>
                    </div>

                    <div className="col-lg-12 col-12">
                      <div className="form-floating">
                        <textarea
                          autoComplete="off"
                          className="form-control"
                          id="message"
                          name="message"
                          placeholder="Describe message here"
                        ></textarea>

                        <label htmlFor="message">Message</label>
                      </div>

                      <button type="submit" className="form-control">
                        Submit Form
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-lg-6 col-12">
                <div className="contact-info mt-5"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
