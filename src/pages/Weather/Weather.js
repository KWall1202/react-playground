import React from "react";
import ForecastTable from "./ForecastTable";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '42.0897',
            long: '-75.9125',
            weatherData: null,
            forecast: {
                url: null,
                data: null,
            },
            forecastHourly: {
                url: null,
                data: null,
            },
            forecastDisplay: null,
        };
    }

    async getWeatherAPI() {
        const url = 'https://api.weather.gov/points/' + this.state.lat + ',' + this.state.long;
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                ...this.state,
                weatherData: data,
                forecast: {
                    url: data.properties.forecast,
                    data: null,
                },
                forecastHourly: {
                    url: data.properties.forecastHourly,
                    data: null,
                },
            });
        }).catch(console.log);
    }

    async getForecastAPI() {
        if (!this.state.forecast.url) return;
        if (this.state.forecast.data) return;
        fetch(this.state.forecast.url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                ...this.state,
                forecast: {
                    ...this.state.forecast,
                    data: data,
                },
                forecastDisplayData: data,
            });
        }).catch(console.log);
    }

    async getForecastHourlyAPI() {
        if (!this.state.forecastHourly.url) return;
        if (this.state.forecastHourly.data) return;
        fetch(this.state.forecastHourly.url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                ...this.state,
                forecastHourly:{
                    ...this.state.forecastHourly,
                    data: data,
                },
                forecastDisplayData: data,
            })
        }).catch(console.log);
    }

    getForecast() {
        this.getForecastAPI()
        .then(() => {
        this.setState({
            ...this.state,
            forecastDisplay: this.state.forecast.data,
            })
        }).catch(console.log);
    }

    getForecastHourly() {
        this.getForecastHourlyAPI()
        .then(() => {
            this.setState({
                ...this.state,
                forecastDisplay: this.state.forecastHourly.data,
            })
        }).catch(console.log);
    }

    componentDidMount() {
        this.getWeatherAPI();
    }

    render() {
        return (
            <div className="Weather">
            <button onClick={() => this.getForecast()}>
                Get the forecast
            </button>
            <button onClick={() => this.getForecastHourly()}>
                Get the hourly forecast
            </button>
            <ForecastTable forecastData={this.state.forecastDisplay}/>
            </div>
        ); 
    }
}

export default Weather;