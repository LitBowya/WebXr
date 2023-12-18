import { useEffect, useRef } from "react";
import * as THREE from "three";

const XrCube = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let gl, session, referenceSpace, renderer, camera;

    async function activateXR() {
      const canvas = canvasRef.current;
      gl = canvas.getContext("webgl", { xrCompatible: true });

      const scene = new THREE.Scene();

      // Cube materials
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      ];

      // Create the cube and add it to the scene
      const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
        materials
      );
      cube.position.set(1, 1, 1);
      scene.add(cube);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvas,
        context: gl,
      });
      renderer.autoClear = false;

      camera = new THREE.PerspectiveCamera();
      camera.matrixAutoUpdate = false;

      session = await navigator.xr.requestSession("immersive-ar");
      session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, gl),
      });

      referenceSpace = await session.requestReferenceSpace("local");

      const onXRFrame = (time, frame) => {
        session.requestAnimationFrame(onXRFrame);

        gl.bindFramebuffer(
          gl.FRAMEBUFFER,
          session.renderState.baseLayer.framebuffer
        );

        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
          const view = pose.views[0];

          const viewport = session.renderState.baseLayer.getViewport(view);
          renderer.setSize(viewport.width, viewport.height);

          camera.matrix.fromArray(view.transform.matrix);
          camera.projectionMatrix.fromArray(view.projectionMatrix);
          camera.updateMatrixWorld(true);

          renderer.render(scene, camera);
        }
      };

      session.requestAnimationFrame(onXRFrame);
    }

    activateXR();

    return () => {
      if (session) {
        session.end();
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default XrCube;
