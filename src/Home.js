import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const airports = [
  { id: 1, name: "Indira Gandhi International Airport" },
  { id: 2, name: "Dubai International Airport" },
  { id: 3, name: "Heathrow Airport" },
  { id: 4, name: "Istanbul Airport" },
  { id: 5, name: "Rajiv Gandhi International Airport" },
];

const Home = () => {
  return (
    <div>
      <div className="top-section d-flex flex-row">
        <h1>hava havai</h1>
        <div className="image">
          <img
            src="C:\Users\NAGESH\Downloads\Avatar - Desktop - Light.png"
            alt=""
          ></img>
        </div>
      </div>
      <h1>Airports</h1>
      <ul>
        {airports.map((airport) => (
          <li key={airport.id}>
            <Link to={`/airport/${airport.id}`}>{airport.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
