import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import HereService from "../services/hereMapsService.js";

const SearchPage = () => {
  const history = useHistory();
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const searchCity = async (e) => {
    if (city.trim().length < 2) {
      setResults([]);
      setIsValid(false);
      return;
    }

    const data = await HereService.autocompleteCity(city);
    setResults(data);
    setIsValid(true);
  };

  return (
    <div className="container mt-5">
      <div onClick={() => history.goBack()}>
        <ArrowBackIcon></ArrowBackIcon>
      </div>

      <h2 className="font-medium text-lg text-gray-600 mt-3">Buscar ciudad</h2>
      <input
        id="txtField"
        type="search"
        className="bg-white shadow-sm rounded-lg border border-gray-400 p-3 w-full"
        placeholder="Santia..."
        autoFocus
        autoComplete="off"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyUp={searchCity}
      />
      {isValid && results.length === 0 && (
        <p className="text-center text-sm text-gray-700 mt-4">
          No hay resultados
        </p>
      )}
      {results.length > 0 && (
        <div
          id="container-cities"
          className="py-1 border bg-white border-gray-200 rounded-lg mt-3 divide-y max-h-64 overflow-y-auto w-[95%] mx-auto"
        >
          {results.map((result) => (
            <div
              className="m-0 py-3 px-3 cursor-pointer hover:bg-blue-50 leading-tight"
              key={result.id}
            >
              <p>{result.address.label}</p>
              <span className="text-xs text-gray-500">
                {result.address.countryName}, {result.address.state},{" "}
                {result.address.county}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
