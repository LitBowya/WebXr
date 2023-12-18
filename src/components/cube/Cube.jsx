import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Cube = () => {

    const cubeRef = useRef()

    {
      useFrame((state, delta) => {
          cubeRef.current.rotation.x += delta;
      });
    }

  return (
    <>
      <OrbitControls />
      <ambientLight />
      <mesh ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </>
  );
}

export default Cube