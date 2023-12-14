import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ARScene = () => {
  const arSceneRef = useRef();
  let xrSession = null;
  let gl = null;
  let xrReferenceSpace = null;
  let sessionRenderer = null;
  let cube = null;

  useEffect(() => {
    async function initAR() {
      if ("xr" in navigator) {
        try {
          xrSession = await navigator.xr.requestSession("immersive-ar");
          xrReferenceSpace = await xrSession.requestReferenceSpace("local");
          const canvas = arSceneRef.current;
          gl = canvas.getContext("webgl", { xrCompatible: true });
          sessionRenderer = new THREE.WebGLRenderer({ context: gl });
          sessionRenderer.xr.enabled = true;
          xrSession.updateRenderState({
            baseLayer: new XRWebGLLayer(xrSession, gl),
          });

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          camera.position.z = 0.5;

          const geometry = new THREE.BoxGeometry();
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          cube = new THREE.Mesh(geometry, material);
          scene.add(cube);

          window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            sessionRenderer.setSize(window.innerWidth, window.innerHeight);
          });

          sessionRenderer.setAnimationLoop(render);
        } catch (e) {
          console.error("Error initializing XR session:", e);
        }
      } else {
        console.error("WebXR not supported");
      }
    }

    async function render(timestamp, frame) {
      const pose = frame.getViewerPose(xrReferenceSpace);
      if (pose) {
        const view = pose.views[0];
        const viewport = sessionRenderer.xr.getViewport(view);
        sessionRenderer.setViewport(viewport);
        camera.matrix.fromArray(view.transform.matrix);
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        sessionRenderer.render(scene, camera);
        xrSession.requestAnimationFrame(render);
      }
    }

    initAR();
  }, []);

  return <canvas ref={arSceneRef} />;
};

export default ARScene;
