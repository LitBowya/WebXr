import React, { useEffect, useState } from "react";
import "aframe";

const ARScene = () => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);

  // ... (other imports and code)

  useEffect(() => {
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        setIsARSupported(supported);
        if (supported) {
          navigator.permissions
            .query({ name: "camera" })
            .then((permissionStatus) => {
              if (permissionStatus.state === "granted") {
                setHasCameraAccess(true);
              } else {
                const handlePermissionChange = () => {
                  navigator.permissions
                    .query({ name: "camera" })
                    .then((updatedStatus) => {
                      if (updatedStatus.state === "granted") {
                        setHasCameraAccess(true);
                      }
                    });
                };

                permissionStatus.onchange = handlePermissionChange;
                permissionStatus.addEventListener(
                  "change",
                  handlePermissionChange
                );

                permissionStatus
                  .request()
                  .then((result) => {
                    if (result.state === "granted") {
                      setHasCameraAccess(true);
                    }
                  })
                  .catch((error) => {
                    console.error("Error requesting camera permission:", error);
                  });
              }
            });
        }
      });
    }
  }, []);

  // ... (rest of your code)

  return (
    <div style={{ height: "100vh" }}>
      {isARSupported ? (
        hasCameraAccess ? (
          <a-scene embedded arjs="sourceType: webcam;">
            <a-box
              position="0 0.5 0"
              rotation="0 45 0"
              color="#4CC3D9"
              shadow
            />
            <a-marker preset="hiro">
              <a-box
                position="0 0.5 0"
                rotation="0 45 0"
                color="#FFC65D"
                shadow
              />
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
        ) : (
          <p>Please allow access to the camera.</p>
        )
      ) : (
        <p>
          Your browser does not support AR. Please use a compatible browser.
        </p>
      )}
    </div>
  );
};

export default ARScene;
