import React from "react";
import ForecastTableElement from "./ForecastTableElement";

function ForecastTable(props) {
    if (!props.forecastData) return;
    const elements = props.forecastData.properties.periods.map((period) => (<ForecastTableElement key={period.number} period={period}/>));
    return (
        <div className="ForecastTable">
            <p>
                Upcoming Forecast
            </p>
            {elements}
        </div>
    );
}

export default ForecastTable;