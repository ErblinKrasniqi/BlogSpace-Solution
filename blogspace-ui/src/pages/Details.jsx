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
                {/* <FontAwesomeIcon icon="fa-regular fa-heart" /> */}
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
