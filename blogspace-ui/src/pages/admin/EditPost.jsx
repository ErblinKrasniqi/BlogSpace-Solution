import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../../Assets/scss/login.module.scss";
import { useApiEditPost } from "../../Hooks/userHooks";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import { useRef, useEffect } from "react";
import anime from "animejs";
import successSound from "../../Assets/sounds/success.mp3"; // Import the success sound

const EditPost = () => {
  const formPopUp = useRef(null);
  let { id } = useParams();
  const {
    title = "",
    setTitle,
    description = "",
    setDescription,
    setImage,
    apiError,
    apiSuccess,
    handleSubmit,
    counter,
  } = useApiEditPost(id);

  const audioRef = useRef(new Audio(successSound));

  useEffect(() => {
    if (apiSuccess) {
      audioRef.current.play(); // Play the success sound
    }
  }, [apiSuccess]);

  const submitAnimation = () => {
    anime({
      targets: formPopUp.current,
      scale: [1, 1.1, 1],
      opacity: [1, 1],
      easing: "easeOutExpo",
      duration: 1000,
    });
  };

  useEffect(() => {
    anime({
      targets: formPopUp.current,
      scale: [0, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
    });
  }, []);

  return (
    <Container
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      {apiSuccess || apiError ? (
        <Message
          message={apiSuccess ? apiSuccess : apiError}
          type={apiSuccess ? "success" : "danger"}
          trigger={counter}
        />
      ) : null}
      <Col ref={formPopUp} md={5} className={` rounded-4 ${styles.column}`}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter title"
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={4}
              placeholder="Description"
              value={description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Text className="text-muted"></Form.Text>

          <Button
            onClick={() => submitAnimation()}
            variant="primary"
            type="submit"
            className="py-2 px-4 mt-2"
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
export default EditPost;
