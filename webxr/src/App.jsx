// src/ARScene.js

import React from "react";
import "aframe";

const ARScene = () => {
  return (
    <div style={{ height: "100vh" }}>
      <a-scene embedded arjs="sourceType: webcam;">
        <a-box position="0 0.5 0" rotation="0 45 0" color="#4CC3D9" shadow />
        <a-marker preset="hiro">
          <a-box position="0 0.5 0" rotation="0 45 0" color="#FFC65D" shadow />
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARScene;
