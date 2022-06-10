import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import ForecastTable from "./ForecastTable";
import { Routes, Route, Link, useSearchParams} from "react-router-dom";

async function getForecastAPI(url, setForecast) {
    if (!url) return;
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        setForecast(data);
    }).catch(console.log);
}

async function getForecastHourlyAPI(url, setForecastHourly) {
    if (!url) return;
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        setForecastHourly(data);
    }).catch(console.log);
}

async function getLatLongFromZipAPI(zipcode, setSearchParams) {
    const url = new URL("https://forecast.weather.gov/zipcity.php?" + new URLSearchParams({inputstring: zipcode}));
    fetch(url)
    .then(res => new URL(res.url))
    .then((data) => {
        if (data.searchParams.get("inputstring")) return;
        const lat = data.searchParams.get("lat");
        const long = data.searchParams.get("lon");
        setSearchParams({lat: lat, long: long});
    }).catch(console.log);
}

async function getWeatherAPI(lat, long, setForecast, setForecastHourly, setCity, setUSState) {
    const url = 'https://api.weather.gov/points/' + lat + ',' + long;
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        setCity(data.properties.relativeLocation.properties.city);
        setUSState(data.properties.relativeLocation.properties.state);
        getForecastAPI(data.properties.forecast, setForecast);
        getForecastHourlyAPI(data.properties.forecastHourly, setForecastHourly);
    }).catch(console.log);
}

function Weather(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [usState, setUSState] = useState("NY");
    const [city, setCity] = useState("Binghamton");
    const [forecast, setForecast] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);

    useEffect(() => {
        const lat = searchParams.get("lat");
        const long = searchParams.get("long");
        if (lat !== null && long !== null){
            getWeatherAPI(lat, long,  setForecast, setHourlyForecast, setCity, setUSState);
        }
    }, [searchParams]);

    const forecastData = forecast === null ? null : {...forecast, city: city, state: usState};
    const hourlyForecastData = hourlyForecast === null ? null : {...hourlyForecast, city: city, state: usState};

    return (
        <div>
        <Navbar>
            <Link to={{
                pathname: "forecast",
                search: searchParams.toString(),
            }}>Forecast</Link>
            <Link to={{
                pathname: "hourlyforecast",
                search: searchParams.toString(),
            }} query={searchParams}>Hourly Forecast</Link>
        </Navbar>
        <div className="Weather">
            <form onSubmit={(e) => {
                e.preventDefault();
                getLatLongFromZipAPI(e.target.zipcode.value, setSearchParams);
                }}>
                <label htmlFor="zipcode">Zip Code:</label>
                <input label="zipcode" type="text" name="zipcode"/>
                <input type="submit" value="Enter"/>
            </form>
            <Routes>
                <Route path="forecast" element={<ForecastTable forecastData={forecastData}/>}/>
                <Route path="hourlyForecast" element={<ForecastTable forecastData={hourlyForecastData}/>}/>
            </Routes>
        </div>
        </div>
    );
}

export default Weather;