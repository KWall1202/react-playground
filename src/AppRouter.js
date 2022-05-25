import React from "react";
import NavBar from "./components/NavBar";
import App from "./pages/App/App";
import Weather from "./pages/Weather/Weather";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function AppRouter() {
    return(
        <Router>
            <NavBar />
            <Routes>
                <Route exact path='/react-playground' element={<App />} />
                <Route path='/react-playground/home' element={<App />} />
                <Route path='/react-playground/weather' element={<Weather />}  />
            </Routes>
        </Router>
    )
}

export default AppRouter;