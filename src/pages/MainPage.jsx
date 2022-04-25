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
  clearCityString,
} from "../utils/utils.js";
import HereService from "../services/hereMapsService.js";
import WeatherService from "../services/openWeatherMapService.js";
import SkeletonMainWeather from "../components/skeleton/SkeletonMainWeather.jsx";
import SkeletonStatsWeather from "../components/skeleton/SkeletonStatsWeather.jsx";
import weatherIcons from "../weather-icons.js";
import CurrentWeather from "../components/CurrentWeather.jsx";
import StatsWeather from "../components/StatsWeather.jsx";
import moment from "moment";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState({});
  const [weather, setWeather] = useState({});
  const params = useParams();

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const weatherCity = await WeatherService.getWeather(latitude, longitude);
      return weatherCity;
    };

    const getInfo = async () => {
      setLoading(true);
      let [latitude, longitude, cityName, newWeather] = ["", "", ""];
      if (isThereValidDataInLocalStorage() && searchingByCurrentLocation()) {
        [latitude, longitude, cityName, newWeather] = getDataOfLocalStorage();
        setCity(cityName);
        setWeather(newWeather);
      } else {
        if (searchingByCurrentLocation()) {
          ({ latitude, longitude } = await getLatitudeAndLongitude());
          cityName = await HereService.getCityByLatAndLon(latitude, longitude);
          setCity(cityName);
          newWeather = await getWeather(latitude, longitude);
          saveDataInLocalStorage(latitude, longitude, cityName, newWeather);
        } else {
          // searching by other city
          const { address, position } = await HereService.getCityByHereId(
            params.id
          );
          cityName = `${address.city}, ${address.state}, ${address.countryName}`;
          ({ lat: latitude, lng: longitude } = position);
          setCity(cityName);
          newWeather = await getWeather(latitude, longitude);
        }
        setWeather(newWeather);
      }

      setLoading(false);
    };

    getInfo();
  }, [params]);

  const searchingByCurrentLocation = () => !params.id;
  const getBackgroundColorByWeather = (weatherIcon, secondary = false) => {
    const result = weatherIcons.filter((icon) => weatherIcon === icon.icon);
    return !secondary
      ? result[0].data.background_color
      : result[0].data.background_color_secondary;
  };

  return (
    <div
      className="pb-16"
      id="weather-backround-color"
      style={{
        backgroundColor: loading
          ? moment().format("H") > 7 && moment().format("H") < 19
            ? "#48a8fa"
            : "#023656"
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
                  {loading ? "Buscando..." : clearCityString(city)}
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
        {!loading && !searchingByCurrentLocation() && (
          <div className="flex justify-center items-end mt-4">
            <Link to="/">
              <button
                className="text-center p-2 rounded shadow"
                style={{
                  backgroundColor: getBackgroundColorByWeather(
                    weather.current.weather[0].icon,
                    true
                  ),
                }}
              >
                Utilizar mi ubicacion actual
              </button>
            </Link>
          </div>
        )}
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
