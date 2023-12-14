// ARScene.js

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const ARScene = () => {
  const arSceneRef = useRef();

  useEffect(() => {
    if (arSceneRef.current) {
      // Access the WebGL renderer directly
      const renderer = new THREE.WebGLRenderer({
        canvas: arSceneRef.current,
        alpha: true,
      });

      // Set up basic scene with a cube
      const scene = new THREE.Scene();
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Set up camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    }
  }, []);

  return <canvas ref={arSceneRef} />;
};

export default ARScene;
