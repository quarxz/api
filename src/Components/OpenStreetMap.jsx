import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./OpenStreetMap.module.css";

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });
  return null;
}

function LocationMarker({ coordinates }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
      console.log(map);
    },
    locationfound(e) {
      setPosition(e.latlng);

      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

export function OpenStreetMap({ users, isloading }) {
  const [latLong, setLatLong] = useState([51.505, -0.09]);

  const position = [51.505, -0.09];
  const animateRef = useRef(false);

  return (
    <>
      <p>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              animateRef.current = !animateRef.current;
            }}
          />
          Animate panning
        </label>
      </p>
      <div>
        {isloading ? (
          <p>Lade Daten...</p>
        ) : (
          <select
            onChange={(e) => {
              let x = e.target.value.split(",");
              setLatLong([x[0], x[1]]);
            }}
          >
            {users.map((user) => {
              return (
                <option
                  key={user.cell}
                  value={[
                    user.location.coordinates.latitude,
                    user.location.coordinates.longitude,
                  ]}
                >
                  {user.name.first} {user.name.last}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <MapContainer center={latLong} zoom={13} scrollWheelZoom={true}>
        <ChangeView center={latLong} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={latLong}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SetViewOnClick animateRef={animateRef} />
        <LocationMarker />
      </MapContainer>
    </>
  );
}
