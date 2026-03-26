import {useState , useEffect} from "react";
import './Received.css';
export default function ReceivedData() {
    const [weather,setWeather]=useState(null);
    const [loading,setLoading]=useState(true);
 const api_key="c4f833488aaea0b0bc849968597f7e3d";
 const city="pune";
 const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
 useEffect(()=>{
    
    const fetchWeatherData= async()=>{
        try{
     const response= await fetch(URL);
     const data=await response.json();
     setWeather(data);
     setLoading(false);
    }catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchWeatherData();
 },[]);

 if (loading) {
        return <p>Loading weather...</p>;
    }

if (!weather) {
        return <p>No data found.</p>;
    }
    return (
        <div className="Receive">
            <div >
               <h2>Weather in {weather.name}</h2>
               <p>Temperature:{weather.main.temp}C</p>
               <p>Condition: { weather.weather[0].description}</p>
            </div>
        </div>

    )
}