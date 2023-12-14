// ARScene.js

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { XRCanvas, useXR } from "@react-three/xr";

const ARScene = () => {
  const cameraRef = useRef();
  const { supported, active, getCamera } = useXR();

  return (
    <Canvas>
      {supported && (
        <XRCanvas>
          <perspectiveCamera ref={cameraRef} />
          <mesh>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </XRCanvas>
      )}
    </Canvas>
  );
};

export default ARScene;
