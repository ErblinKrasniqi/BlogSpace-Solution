import React, { useEffect, useRef } from "react";
import { Carousel } from "react-bootstrap";
import * as PIXI from "pixi.js";
import "bootstrap/dist/css/bootstrap.min.css";
import videoSrc from "../Assets/videoecom.mp4";
import imageSrc from "../Assets/images/moon.png";

const PixiCarousel = () => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application();
    (async () => {
      await app.init({ backgroundAlpha: 0 });
      pixiContainer.current.appendChild(app.view);

      // Add PixiJS effects or animations here
      const texture = await PIXI.Assets.load(imageSrc);
      const sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.x = app.renderer.width / 2;
      sprite.y = app.renderer.height / 2;
      sprite.width = 400;
      sprite.height = 300;
      app.stage.addChild(sprite);

      app.ticker.add(() => {
        sprite.rotation += 0.01;
      });
    })();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <Carousel>
      <Carousel.Item>
        <video width="100%" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Carousel.Item>
      <Carousel.Item>
        <div
          ref={pixiContainer}
          style={{ width: "100%", height: "300px" }}
        ></div>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imageSrc} alt="Sample" width="100%" />
      </Carousel.Item>
    </Carousel>
  );
};

export default PixiCarousel;
