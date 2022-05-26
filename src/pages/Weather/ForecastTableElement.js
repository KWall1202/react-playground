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

function ForecastListElement(props) {
    return <li className="ForecastListElement">{props.children}</li>;
}


function ForecastTableElement(props) {
    const cast = props.period;
    return (
        <div>
            <ul className="ForecastList">
                <ForecastListElement>
                    <img className="WeatherIcon" src={cast.icon} alt="Weather Icon"/>
                </ForecastListElement>
                <ForecastListElement>
                    <p>{cast.name}</p>
                    <p>{cast.shortForecast}</p> 
                </ForecastListElement>
                <ForecastListElement>
                    <p>{cast.temperature} {cast.temperatureUnit}</p>
                </ForecastListElement>
            </ul>
        </div>
    );
}

export default ForecastTableElement;