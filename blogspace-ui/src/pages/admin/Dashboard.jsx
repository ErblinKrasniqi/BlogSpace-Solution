import { Link } from "react-router-dom";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { getMyPosts, deletePost } from "../../Api";
import anime from "animejs";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const postAnimation = useRef([]);

  const fetchPosts = async () => {
    try {
      const response = await getMyPosts();

      setPosts(response.data.posts);
      setLoaded(true);
    } catch (error) {
      setPosts([]);
      setError(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      console.log("deletePost response:", response);

      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post._id !== id);
        return updatedPosts;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, [loaded]);

  //Animations

  useLayoutEffect(() => {
    if (postAnimation.current) {
      anime({
        targets: postAnimation.current,
        opacity: [0, 1],
        translateY: [-250, 0],
        duration: 2000,
        delay: anime.stagger(100, { start: 300 }),
      });
    }
  }, [loaded]);

  return (
    <section className="events-section section-padding" id="section_2">
      <div className="container">
        <div className="row ">
          <div className="col-lg-12 col-12 mt-5">
            <h2 className="mb-lg-5 mb-4">Dashboard</h2>
          </div>
          {error && <p>{error}</p>}
          {posts &&
            posts.map((post, index) => (
              <div
                ref={(el) => (postAnimation.current[index] = el)}
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

                  <Link
                    to={`/edit/${post._id}`}
                    className="custom-block-date-wrap"
                  >
                    <strong className="text-white">Edit</strong>
                  </Link>

                  <div
                    onClick={() => handleDelete(post._id)}
                    className="custom-btn-wrap btn custom-btn custom-danger"
                  >
                    Delete
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
            ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
