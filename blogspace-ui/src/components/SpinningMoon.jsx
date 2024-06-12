import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import moonImage from "../Assets/images/moon.png";

const SpinningMoon = () => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application();
    (async () => {
      await app.init({ backgroundAlpha: 0 });
      pixiContainer.current.appendChild(app.view);

      const texture = await PIXI.Assets.load(moonImage);
      const moon = new PIXI.Sprite(texture);
      moon.anchor.set(0.5);
      moon.x = app.renderer.width / 2;
      moon.y = app.renderer.height / 2;

      const desiredWidth = 400;
      moon.width = desiredWidth;
      moon.height = desiredWidth * (texture.height / texture.width);

      app.stage.addChild(moon);

      let isSpinning = false;

      app.ticker.add(() => {
        if (isSpinning) {
          moon.rotation += 0.01;
        }
      });

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

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={pixiContainer}></div>;
};

export default SpinningMoon;
