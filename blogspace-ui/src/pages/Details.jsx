import { useParams } from "react-router-dom";
import { useApiGetPost } from "../Hooks/userHooks";
import Message from "../components/Message";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../Auth/is-auth";

const Detials = () => {
  const { isLoggedIn } = useAuth();
  let { id } = useParams();
  const {
    post,
    apiError,
    apiSuccess,
    comments,
    createCommeta,
    setContent,
    delteComment,
  } = useApiGetPost(id);

  return (
    <main>
      {apiSuccess || apiError ? (
        <Message
          message={apiSuccess ? apiSuccess : apiError}
          type={apiError ? "danger" : "success"}
        />
      ) : null}
      <section
        className="hero-section hero-50 d-flex justify-content-center align-items-center"
        id="section_1"
      >
        <div className="section-overlay"></div>

        <svg viewBox="0 0 1962 178">
          <path
            fill="#3D405B"
            d="M 0 114 C 118.5 114 118.5 167 237 167 L 237 167 L 237 0 L 0 0 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#3D405B"
            d="M 236 167 C 373 167 373 128 510 128 L 510 128 L 510 0 L 236 0 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#3D405B"
            d="M 509 128 C 607 128 607 153 705 153 L 705 153 L 705 0 L 509 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#3D405B"
            d="M 704 153 C 812 153 812 113 920 113 L 920 113 L 920 0 L 704 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#3D405B"
            d="M 919 113 C 1048.5 113 1048.5 148 1178 148 L 1178 148 L 1178 0 L 919 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#3D405B"
            d="M 1177 148 C 1359.5 148 1359.5 129 1542 129 L 1542 129 L 1542 0 L 1177 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#3D405B"
            d="M 1541 129 C 1751.5 129 1751.5 138 1962 138 L 1962 138 L 1962 0 L 1541 0 Z"
            strokeWidth="0"
          ></path>
        </svg>

        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <h1 className="text-white mb-4 pb-2">Event Detail</h1>

              <a href="#section_2" className="btn custom-btn smoothscroll me-3">
                Learn more
              </a>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 1962 178">
          <path
            fill="#ffffff"
            d="M 0 114 C 118.5 114 118.5 167 237 167 L 237 167 L 237 0 L 0 0 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#ffffff"
            d="M 236 167 C 373 167 373 128 510 128 L 510 128 L 510 0 L 236 0 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#ffffff"
            d="M 509 128 C 607 128 607 153 705 153 L 705 153 L 705 0 L 509 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#ffffff"
            d="M 704 153 C 812 153 812 113 920 113 L 920 113 L 920 0 L 704 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#ffffff"
            d="M 919 113 C 1048.5 113 1048.5 148 1178 148 L 1178 148 L 1178 0 L 919 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#ffffff"
            d="M 1177 148 C 1359.5 148 1359.5 129 1542 129 L 1542 129 L 1542 0 L 1177 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#ffffff"
            d="M 1541 129 C 1751.5 129 1751.5 138 1962 138 L 1962 138 L 1962 0 L 1541 0 Z"
            strokeWidth="0"
          ></path>
        </svg>
      </section>

      <section
        className="events-section events-detail-section section-padding"
        id="section_2"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mx-auto">
              <h2 className="mb-lg-5 mb-4">{post.title}</h2>

              <div className="custom-block-image-wrap">
                <img
                  src={`http://localhost:8080/images/${post.imageUrl}`}
                  className="custom-block-image img-fluid"
                  alt=""
                />
              </div>

              <div className="custom-block-info">
                <h3 className="mb-3">{post.title}</h3>

                <p>{post.description}</p>

                <div className="events-detail-info row my-5">
                  <div className="col-lg-12 col-12">
                    <h3 className="mb-3">Comments</h3>
                  </div>
                  {comments.length === 0 && <p>No comments yet</p>}
                  {comments.map((comment) => (
                    <div key={comment._id} className="col-lg-12 col-12 my-3">
                      <span className="custom-block-span fs-5 ">
                        {comment.userName}
                      </span>

                      <p className="mb-0 mt-2">{comment.content}</p>

                      {comment.user === localStorage.getItem("userId") && (
                        <Button
                          variant="danger"
                          onClick={() => delteComment(comment._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createCommeta(e);
                  }}
                  className="mt-4  p-5 rounded-4"
                >
                  {isLoggedIn ? (
                    <>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="fs-4">Comment</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your comment"
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Create
                      </Button>
                    </>
                  ) : null}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Detials;
