import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useApiGetPosts } from "../Hooks/userHooks";

import styles from "../Assets/scss/home.module.scss";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {
  BiBriefcaseAlt2,
  BiAlarmAdd,
  BiBasketball,
  BiBook,
  BiBuilding,
  BiCool,
  BiGhost,
  BiTrophy,
  BiTime,
  BiPrinter,
  BiPopsicle,
  BiArrowBack,
  BiArrowToRight,
  BiHeart,
} from "react-icons/bi";

const Home = () => {
  const {
    posts,
    setPage,
    totalPosts,
    page,
    setCategory,
    fetchCategoryPosts,
    fetchLikedPosts,
    likedPosts,
  } = useApiGetPosts();
  const [scrolled, setScrolled] = useState(false);

  //animations

  const [activeCategory, setActiveCategory] = useState(1);

  const totalPages = Math.ceil(totalPosts / 2);

  const iconsAnimation = useRef([]);

  const postsLoad = useRef([]);

  const scrollContainer = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = 400; // Adjust the scroll amount as needed

    setScrolled(!scrolled);
    if (scrollContainer.current) {
      // Check if ref is not null
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const CATEGORIES = [
    { id: 1, name: "Beach", icon: <BiBriefcaseAlt2 /> },
    { id: 2, name: "Mountain", icon: <BiAlarmAdd /> },
    { id: 3, name: "Forest", icon: <BiBuilding /> },
    { id: 4, name: "City", icon: <BiBasketball /> },
    { id: 5, name: "Snow", icon: <BiBook /> },
    { id: 6, name: "Snow", icon: <BiCool /> },
    { id: 7, name: "Snow", icon: <BiGhost /> },
    { id: 8, name: "Snow", icon: <BiTrophy /> },
    { id: 9, name: "Snow", icon: <BiTime /> },
    { id: 10, name: "Snow", icon: <BiPrinter /> },
    { id: 11, name: "Snow", icon: <BiPopsicle /> },
    { id: 12, name: "Snow", icon: <BiGhost /> },
    { id: 13, name: "City", icon: <BiBasketball /> },
  ];

  const handleCategoryClick = (id, name) => {
    setActiveCategory(id);
    setCategory(name);
    fetchCategoryPosts();
  };

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
              <h2>Check in</h2>
              <h3>Search destinations</h3>
            </div>
            <div className={styles.line}></div>
            <div className={styles.boxes}>
              <h2>Where</h2>
              <h3>Search destinations</h3>
            </div>
            <div className={styles.searchIcon}>
              <div className={styles.circle}>
                <FaSearch color="white" size={20} />
              </div>
            </div>
          </div>
          <div className={styles.sectionEndLine}></div>
        </section>

        <section className={styles.categorySection}>
          {scrolled ? (
            <button
              className={styles.scroll}
              onClick={() => handleScroll("left")}
            >
              <BiArrowBack />
            </button>
          ) : (
            ""
          )}

          <div
            ref={scrollContainer}
            className={`container ${styles.categoryList}`}
          >
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  category.id === activeCategory ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick(category.id, category.name)}
              >
                <span className={styles.icon}>{category.icon}</span>
                <p
                  className={
                    category.id === activeCategory
                      ? styles.nameActive
                      : styles.name
                  }
                >
                  {category.name}
                </p>
                {category.id === activeCategory && (
                  <div className={styles.line}></div>
                )}
              </div>
            ))}
          </div>
          <button
            className={styles.scrollRight}
            onClick={() => handleScroll("right")}
          >
            <BiArrowToRight />
          </button>
        </section>

        <section className="events-section " id="section_2">
          <div className="container">
            <div className="row ">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div
                    ref={(el) => (postsLoad.current[index] = el)}
                    key={post._id}
                    className="col-lg-3 col-12 mb-5 mb-lg-0 mt-5"
                  >
                    <div
                      className={`custom-block-image-wrap ${styles.postImage}`}
                    >
                      <div className={styles.like}>
                        {likedPosts.includes(post._id) ? (
                          <FaHeart size={24} className={styles.readHeart} />
                        ) : (
                          <BiHeart size={24} />
                        )}
                      </div>
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

                      <p className={`mb-0 ${styles.postP}`}>
                        {post.description}
                      </p>

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
                  <p>No post</p>
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
                <h1>Technologies used</h1>
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
