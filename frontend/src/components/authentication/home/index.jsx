// import  "./styles.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Weather from "../weather/weather";
// import SoilInfo from "../Soilinfo/SoilInfo";
export default function Home() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=d2e43283ad51e6098b8b149eb972bf0b`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])
  
  

  return (
    <div className="App">
      <Link to="/chatHome" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Chat with us</p>
						</Link>
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )}

{/* <div>
      <SoilInfo />
    </div> */}
       
    </div>
    
  );
}
