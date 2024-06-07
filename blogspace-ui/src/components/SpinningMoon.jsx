// SpinningMoon.js
import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import moonImage from '../Assets/images/moon.png'; // Correctly import the image

const SpinningMoon = () => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    // Create the PixiJS application and initialize it
    const app = new PIXI.Application({ transparent: true });
    (async () => {
      await app.init({ resizeTo: window });
      pixiContainer.current.appendChild(app.view);
  
      // Load the moon texture and create the sprite
      await PIXI.Assets.load(moonImage); // Use the imported image path
      const moon = PIXI.Sprite.from(moonImage); // Use the imported image path
      moon.anchor.set(0.5);
      moon.x = app.renderer.width / 2;
      moon.y = app.renderer.height / 2;
      moon.scale.set(0.5); // Resize the moon image
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

      moon.on('mousedown', () => {
        isSpinning = true;
      });

      moon.on('mouseup', () => {
        isSpinning = false;
      });

      moon.on('mouseupoutside', () => {
        isSpinning = false;
      });
    })();

    // Cleanup function
    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={pixiContainer} style={{ width: '100%', height: '100%' }}></div>;
};

export default SpinningMoon;
