// Message.jsx
import React, { useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import anime from "animejs";

const Message = ({ message, type }) => {
  const alertVariant = type === "success" ? "success" : "danger";
  const messageRef = useRef(null);

  useEffect(() => {
    if (message) {
      anime({
        targets: messageRef.current,
        opacity: [0, 1],
        duration: 200,
        easing: "easeInOutQuad",
      });

      setTimeout(() => {
        anime({
          targets: messageRef.current,
          opacity: [1, 0],
          duration: 200,
          easing: "easeInOutQuad",
        });
      }, 3000);
    }
  }, [message, type]);

  return (
    <div
      ref={messageRef}
      style={{ zIndex: 9999 }}
      className="position-fixed top-10 start-50 translate-middle"
    >
      <Alert className="fs-5 rounded-4 px-5" variant={alertVariant}>
        {message}
      </Alert>
    </div>
  );
};

export default Message;
