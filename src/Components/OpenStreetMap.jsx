import { TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useState } from "react";

import styles from "./OpenStreetMap.module.css";

export function OpenStreetMap() {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
}
