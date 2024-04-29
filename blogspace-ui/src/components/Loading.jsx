import React, { useEffect, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import anime from "animejs";

const Loading = () => {
  const spining = useRef(null);

  useEffect(() => {
    anime({
      targets: spining.current,
      rotate: 360,
      easing: "linear",
      loop: true,
      duration: 1000,
    });
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: 9999,
      }}
    >
      <div ref={spining}>
        <FaSpinner size={60} color="black" />
      </div>
    </div>
  );
};

export default Loading;
