// src/ARScene.js

import React, { useEffect, useState } from "react";
import "aframe";

const ARScene = () => {
  const [isARSupported, setIsARSupported] = useState(false);

  useEffect(() => {
    // Check if AR is supported in the browser
    if (window && window.navigator.xr) {
      window.navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        setIsARSupported(supported);
      });
    }
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {isARSupported ? (
        <a-scene embedded arjs="sourceType: webcam;">
          <a-box position="0 0.5 0" rotation="0 45 0" color="#4CC3D9" shadow />
          <a-marker preset="hiro">
            <a-box position="0 0.5 0" rotation="0 45 0" color="#FFC65D" shadow />
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      ) : (
        <p>Your browser doesn't support AR. Please use a compatible browser.</p>
      )}
    </div>
  );
};

export default ARScene;
