import {XR, ARButton} from '@react-three/xr'
import { Canvas } from "@react-three/fiber";
import XrCube from "./XrCube";

const XrCubeComponent = () => {

  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <XrCube />
        </XR>
      </Canvas>
    </>
  );
};

export default XrCubeComponent;
