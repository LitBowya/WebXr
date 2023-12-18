import { Canvas } from "@react-three/fiber";
import XrCube from "./XrCube";
import { ARButton, XR } from "@react-three/xr";

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
