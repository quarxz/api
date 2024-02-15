import { useState, useEffect } from "react";
import axios from "axios";
import { OpenStreetMap } from "./Components/OpenStreetMap";

import "./App.css";

function App() {
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);

  useEffect(() => {
    async function loadData() {
      console.log("load Data");
      try {
        setIsloading(true);
        const response = await axios.get(
          `${"https://randomuser.me/api/?results="}${10}${"&gender=female"}`
        );

        console.log(response.data.results);
        setUsers(response.data.results);
        console.log(users);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsloading(false);
      }
    }
    loadData();
  }, []);

  if (isError) {
    return (
      <>
        <h1>Componet Livecycle</h1>
        <p>oops - an error appeared!</p>
      </>
    );
  }

  return (
    <main>
      <h1>API - OpenStreetMap</h1>

      {isloading ? (
        <p>Lade Daten...</p>
      ) : (
        <OpenStreetMap
          coordinates={coordinates}
          users={users}
          isloading={isloading}
        />
      )}
    </main>
  );
}

export default App;
