import React, { useEffect, useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import {
  getLatitudeAndLongitude,
  saveDataInLocalStorage,
  getDataOfLocalStorage,
  isThereValidDataInLocalStorage,
} from "../utils/utils.js";
import HereService from "../services/hereMapsService.js";
import WeatherService from "../services/openWeatherMapService.js";
import SkeletonMainWeather from "../components/skeleton/SkeletonMainWeather.jsx";
import SkeletonStatsWeather from "../components/skeleton/SkeletonStatsWeather.jsx";
import weatherIcons from "../weather-icons.js";
import CurrentWeather from "../components/CurrentWeather.jsx";
import StatsWeather from "../components/StatsWeather.jsx";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      let [latitude, longitude, cityName] = ["", "", ""];
      if (isThereValidDataInLocalStorage()) {
        [latitude, longitude, cityName] = getDataOfLocalStorage();
      } else {
        // TODO: Agregar el tiempo a localStorage
        ({ latitude, longitude } = await getLatitudeAndLongitude());
        cityName = await HereService.getCityByLatAndLon(latitude, longitude);
        saveDataInLocalStorage(latitude, longitude, cityName);
      }

      setCity(cityName);
      const weatherCity = await WeatherService.getWeather(latitude, longitude);
      setWeather(weatherCity);
      setLoading(false);
    };

    getInfo();
  }, []);

  const getBackgroundColorByWeather = (weatherIcon) => {
    const result = weatherIcons.filter((icon) => weatherIcon === icon.icon);
    return result[0].data.background_color;
  };

  return (
    <div
      className="pb-16"
      id="weather-backround-color"
      style={{
        backgroundColor: loading
          ? // TODO: Verificar por hora de cliente y dar color variable
            "#48a8fa"
          : getBackgroundColorByWeather(weather.current.weather[0].icon),
      }}
    >
      <div className="text-white">
        <div className="pt-6">
          <div className="container">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <RoomIcon></RoomIcon>
                <p id="city-name" className="ml-2">
                  {loading ? "Buscando..." : city}
                </p>
              </div>
              <Link to="/search">
                <SearchIcon></SearchIcon>
              </Link>
            </div>
            {loading ? (
              <SkeletonMainWeather></SkeletonMainWeather>
            ) : (
              <CurrentWeather weather={weather}></CurrentWeather>
            )}
          </div>
        </div>
      </div>
      <article className="container ">
        {loading ? (
          <SkeletonStatsWeather></SkeletonStatsWeather>
        ) : (
          <StatsWeather weather={weather}></StatsWeather>
        )}
      </article>
    </div>
  );
};

export default MainPage;
