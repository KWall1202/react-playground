import React from "react";
import "./Weather.css";

/*
 * props.period contains the forecast data
 * it's of this structure
 * props.period = {
 *  detailedForecast: // Sentence describing condition, high or low temp, and wind speed/direction,
 *  endTime: // End time of this period
 *  isDayTime: // Bool saying if it's daytime or not
 *  name: // Name of the period ex. 'This Afternoon'
 *  number: // What number in the sequence of 0...13 periods given
 *  shortForecast: // Shorter forecast string ex. 'Partly Cloudy'
 *  startTime: // Start time of this period
 *  temperature: // Expected temperature
 *  temperatureTrend: // Temperature trend during this period
 *  temperatureUnit: // Unit that temperature is delivered in
 *  windDirection: // Direction the wind will blow
 *  windSpeed: // Speed of the wind as a string, units attached ex. '13 mph'
 * }
 */

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const amPm = date.getHours() < 12 ? "AM" : "PM";
    const hours = (date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours()).toString();
    const options = {day: 'numeric', month: 'long'}
    const day = date.toLocaleString(undefined, options);
    return `${hours}:00 ${amPm}, ${day}`
  };

function ForecastTableElement(props) {
    const cast = props.period;
    const periodName = cast.name ? cast.name : formatDate(cast.startTime);
    return (
        <span className="ForecastTableElement">
            <span className="ForecastIconAndText">
                <img className="WeatherIcon" src={cast.icon} alt="Weather Icon"/>
                <div className="Forecast">
                    <p className="Period">{periodName}</p>
                    <p>{cast.shortForecast}</p> 
                </div>
            </span>
            <div className="Temperature">
                <p>{cast.temperature} {cast.temperatureUnit}</p>
            </div>   
        </span>
    );
}

export default ForecastTableElement;