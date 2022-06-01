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
            forecastDisplayHourly: null,
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
            }, () => {
                this.getForecastAPI();
                this.getForecastHourlyAPI();
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
            })
        }).catch(console.log);
    }

    async getLatLongFromZipAPI(zipcode) {
        const url = new URL("https://forecast.weather.gov/zipcity.php?" + new URLSearchParams({inputstring: zipcode}));
        fetch(url)
        .then(res => new URL(res.url))
        .then((data) => {
            if (data.searchParams.get("inputstring")) return;
            const lat = data.searchParams.get("lat");
            const long = data.searchParams.get("lon")
            this.setState({
                ...this.state,
                lat: lat,
                long: long,
            }, () => this.getWeatherAPI())
        }).catch(console.log);
    }

    getForecast() {
        this.getForecastAPI()
        .then(() => {
        this.setState({
            ...this.state,
            forecastDisplayHourly: false,
            })
        }).catch(console.log);
    }

    getForecastHourly() {
        this.getForecastHourlyAPI()
        .then(() => {
            this.setState({
                ...this.state,
                forecastDisplayHourly: true,
            })
        }).catch(console.log);
    }

    getLatLongFromZip(event) {
        event.preventDefault();
        this.getLatLongFromZipAPI(event.target.zipcode.value);
    }

    getDisplayData() {
        if (this.state.forecastDisplayHourly === null) return null;
        if (this.state.forecastDisplayHourly) return this.state.forecastHourly.data;
        return this.state.forecast.data;
    }

    componentDidMount() {
        this.getWeatherAPI();
    }

    render() {
        return (
            <div className="Weather">
            <form onSubmit={(e) => this.getLatLongFromZip(e)}>
                <label htmlFor="zipcode">Zip Code:</label>
                <input label="zipcode" type="text" name="zipcode"/>
                <input type="submit" value="Enter"/>
            </form>
            <button onClick={this.getForecast.bind(this)}>
                Get the forecast
            </button>
            <button onClick={this.getForecastHourly.bind(this)}>
                Get the hourly forecast
            </button>
            <ForecastTable forecastData={this.getDisplayData()}/>
            </div>
        ); 
    }
}

export default Weather;