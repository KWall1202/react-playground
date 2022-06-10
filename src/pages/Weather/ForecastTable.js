import React from "react";
import ForecastTableElement from "./ForecastTableElement";

function ForecastTable(props) {
    if (!props.forecastData) return;
    const data = props.forecastData;
    const elements = data.properties.periods.map((period) => (<ForecastTableElement key={period.number} period={period}/>));
    return (
        <div className="ForecastTable">
            <p>
                Upcoming Forecast in {data.city}, {data.state}
            </p>
            {elements}
        </div>
    );
}

export default ForecastTable;