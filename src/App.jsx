import { MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { OpenStreetMap } from "./Components/OpenStreetMap";

import { useState } from "react";
import "./App.css";

function App() {
  const position = [51.505, -0.09];
  return (
    <main>
      <h1>API - OpenStreetMap</h1>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <OpenStreetMap />
      </MapContainer>
    </main>
  );
}

export default App;
