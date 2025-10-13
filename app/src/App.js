/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 03/10/2025 - 16:00:35
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { countriesUrl } from "./Constants/Urls";

function App() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCities] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [toggleStateInput, setToggleStateInput] = useState(true);
  const [toggleCityInput, setToggleCityInput] = useState(true);
  const [ifAllSelected, setAllSelected] = useState(false);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      let data = await axios.get(countriesUrl);
      setCountry(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssosiatedState = async (country) => {
    try {
      setCurrentCountry(country);
      let stateUrl = `https://crio-location-selector.onrender.com/country=${country}/states`;
      let data = await axios.get(stateUrl);
      setState(data.data);
      setToggleStateInput(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssosiatedCity = async (state) => {
    try {
      setCurrentState(state);
      let citiesUrl = `https://crio-location-selector.onrender.com/country=${currentCountry}/state=${state}/cities`;
      let data = await axios.get(citiesUrl);
      setCities(data.data);
      setToggleCityInput(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="body">
      <div className="App">
        <select
          className="countryInput"
          onChange={(e) => getAssosiatedState(e.target.value)}
        >
          <option value="">Select Country</option>
          {country.map((ele, index) => {
            return (
              <option value={ele} key={ele}>
                {ele}
              </option>
            );
          })}
        </select>

        <select
          className="stateInput"
          onChange={(e) => getAssosiatedCity(e.target.value)}
          disabled={toggleStateInput}
        >
          <option value="">Select State</option>
          {state.map((ele, index) => {
            return (
              <option value={ele} key={ele}>
                {ele}
              </option>
            );
          })}
        </select>

        <select
          className="cityInput"
          onChange={(e) => {
            setCurrentCity(e.target.value);
            setAllSelected(true);
          }}
          disabled={toggleCityInput}
        >
          <option value="">Select City</option>
          {city.map((ele, index) => {
            return (
              <option value={ele} key={ele}>
                {ele}
              </option>
            );
          })}
        </select>
      </div>

      {ifAllSelected ? (
        <p>
          You selected {currentCity}, {currentState}, {currentCountry}
        </p>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
