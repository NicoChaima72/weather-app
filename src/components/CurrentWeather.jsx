import React, { useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import { firstUppercase, getImageByWeather } from "../utils/utils";

const CurrentWeather = ({ weather }) => {
  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <img
          className="w-20"
          id="weather-icon"
          src={getImageByWeather(weather.current.weather[0].icon)}
          alt=""
          loading="lazy"
        />
        <h3 className="ml-4 text-6xl font-semibold">
          <span id="weather-temp">
            {Math.round(weather.current.feels_like)}
          </span>
          °C
        </h3>
      </div>
      <h4 className="text-center text-xl mt-3">
        {firstUppercase(weather.current.weather[0].description)}
      </h4>
      <h5 className="text-center font-semibold text-sm mt-3">
        {firstUppercase(moment().format("dddd, MMM D, YYYY"))}
      </h5>
      <h6 className="text-center" id="weather-hour" />
      <div className="flex justify-center items-center space-x-4 mt-6">
        <div className="flex items-center">
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          <p className="text-3xl font-semibold">
            <span id="weather-min">
              {Math.round(weather.daily[0].temp.min)}
            </span>
            °
          </p>
        </div>
        <div className="flex items-center">
          <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
          <p className="text-3xl font-semibold">
            <span id="weather-max">
              {Math.round(weather.daily[0].temp.max)}
            </span>
            °
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
