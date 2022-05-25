import React from "react";


class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '42.0897',
            long: '-75.9125',
            weatherData: null,
        };
    }

    getWeather() {
        const url = 'https://api.weather.gov/points/' + this.state.lat + ',' + this.state.long;
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                lat: this.state.lat,
                long: this.state.long,
                weatherData: data,
            })
        }).catch(console.log);
    }

    render() {
        return (
            <div>
            <button onClick={() => this.getWeather()}>
                Get the weather
            </button>
            <p>
                {this.state.weatherData ? JSON.stringify(this.state.weatherData) : null}
            </p>
            </div>
        ); 
    }
}

export default Weather;