import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import moonImage from "../Assets/images/moon.png"; // Correctly import the image

const SpinningMoon = () => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    // Create the PixiJS application and initialize it
    const app = new PIXI.Application();
    (async () => {
      await app.init({ backgroundAlpha: 0 });
      pixiContainer.current.appendChild(app.view);

      // Load the moon texture and create the sprite
      const texture = await PIXI.Assets.load(moonImage); // Use the imported image path
      const moon = new PIXI.Sprite(texture); // Use the imported image path
      moon.anchor.set(0.5);
      moon.x = app.renderer.width / 2;
      moon.y = app.renderer.height / 2;

      // Adjust the width while maintaining the aspect ratio
      const desiredWidth = 400; // Set your desired width here
      moon.width = desiredWidth;
      moon.height = desiredWidth * (texture.height / texture.width); // Maintain aspect ratio

      app.stage.addChild(moon);

      // Add a variable to track spinning
      let isSpinning = false;

      // Add a ticker callback to rotate the moon
      app.ticker.add(() => {
        if (isSpinning) {
          moon.rotation += 0.01;
        }
      });

      // Add event listeners to start and stop spinning on mouse events
      moon.interactive = true;
      moon.buttonMode = true;

      moon.on("mousedown", () => {
        isSpinning = true;
      });

      moon.on("mouseup", () => {
        isSpinning = false;
      });

      moon.on("mouseupoutside", () => {
        isSpinning = false;
      });
    })();

    // Cleanup function
    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={pixiContainer}></div>;
};

export default SpinningMoon;
