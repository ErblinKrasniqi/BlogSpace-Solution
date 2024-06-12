import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import videoSrc from "../Assets/videoecom.mp4";
import imageSrc from "../Assets/images/carosel1.jpg";
import carosel2 from "../Assets/images/carosel.jpg";

const SimpleCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <video width="100%" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imageSrc} alt="Sample" width="100%" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={carosel2} alt="Sample" width="100%" />
      </Carousel.Item>
    </Carousel>
  );
};

export default SimpleCarousel;
