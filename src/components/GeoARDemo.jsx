import React, { useEffect } from "react";
import "aframe";
import "aframe-look-at-component";
import "aframe-ar-nft";

const GeoARDemo = () => {
  useEffect(() => {
    const updateLocationText = (latitude, longitude) => {
      const locationText = document.getElementById("locationText");
      if (locationText) {
        locationText.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        locationText.setAttribute(
          "value",
          `Latitude: ${latitude}\nLongitude: ${longitude}`
        );
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocationText(latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
        updateLocationText("Unable to fetch", "location");
      }
    );
  }, []);

  return (
    <a-scene
      vr-mode-ui="enabled: false"
      arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
    >
      <a-text
        id="locationText"
        value="Loading location..."
        look-at="[gps-camera]"
        scale="120 120 120"
        gps-entity-place=""
      ></a-text>
      <a-camera gps-camera rotation-reader></a-camera>
    </a-scene>
  );
};

export default GeoARDemo;
