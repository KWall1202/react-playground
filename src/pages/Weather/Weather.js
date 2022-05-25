import React from "react";


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
        };
    }

    async getWeather() {
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

    async getForecast() {
        if (!this.state.forecast.url) return;
        fetch(this.state.forecast.url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                ...this.state,
                forecast: {
                    ...this.state.forecast,
                    data: data,
                },
            })
        }).catch(console.log);
    }

    async getHourlyForecast() {
        if (!this.state.forecastHourly.url) return;
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

    componentDidMount() {
        this.getWeather();
    }

    render() {
        const forecastString = this.state.forecast.data ? JSON.stringify(this.state.forecast.data) : null;
        const forecastHourlyString = this.state.forecastHourly.data ? JSON.stringify(this.state.forecastHourly.data) : null;
        return (
            <div>
            <button onClick={() => this.getForecast()}>
                Get the forecast
            </button>
            <button onClick={() => this.getHourlyForecast()}>
                Get the hourly forecast
            </button>
            <p>
                {forecastString}
            </p>
            <p>
                {forecastHourlyString}
            </p>
            </div>
        ); 
    }
}

export default Weather;