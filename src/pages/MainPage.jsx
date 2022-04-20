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
        console.log({ latitude, longitude });
      } else {
        ({ latitude, longitude } = await getLatitudeAndLongitude());
        cityName = await HereService.getCityByLatAndLon(latitude, longitude);
        saveDataInLocalStorage(latitude, longitude, cityName);
      }

      setCity(cityName);
      const weatherCity = await WeatherService.getWeather(latitude, longitude);
      console.log(weatherCity);
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
              <div>
                <div className="flex justify-center items-center mt-10">
                  <img
                    className="w-20"
                    id="weather-icon"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <h3 className="ml-4 text-6xl font-semibold">
                    <span id="weather-temp">25</span>°C
                  </h3>
                </div>
                <h4
                  className="text-center text-xl mt-3"
                  id="weather-description"
                >
                  Cielo despejado
                </h4>
                <h5
                  className="text-center font-semibold text-sm mt-3"
                  id="weather-date"
                >
                  Sabado, Oct 9, 2021
                </h5>
                <h6 className="text-center" id="weather-hour" />
                <div className="flex justify-center items-center space-x-8 mt-6">
                  <div className="flex items-center">
                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    <p className="ml-2 text-3xl font-semibold">
                      <span id="weather-min">22</span>°
                    </p>
                  </div>
                  <div className="flex items-center">
                    <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                    <p className="ml-2 text-3xl font-semibold">
                      <span id="weather-max">31</span>°
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <article className="container ">
        {loading ? (
          <SkeletonStatsWeather></SkeletonStatsWeather>
        ) : (
          <div className="mt-16 p-6 sm:p-8 md:p-10 xl:p-14 rounded-lg bg-gray-50 shadow">
            <section className="mt-2">
              <h3 className="text-xl font-medium text-gray-700">Horas</h3>
              <div
                className="flex space-x-1 pb-2 mt-1"
                style={{ overflowX: "auto" }}
              >
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
                <div
                  className="
        border border-gray-100
        flex-shrink-0
        bg-white
        shadow-sm
        rounded-md
        flex flex-col
        items-center
        py-3
        px-4
      "
                >
                  <img
                    className="w-14"
                    src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                    alt=""
                  />
                  <p className="mt-1 font-medium">28°</p>
                  <p className="text-xs text-gray-400">08:00</p>
                </div>
              </div>
            </section>
            <section className="bg-white mt-6 shadow-sm border border-gray-100 rounded-lg text-gray-500 p-3">
              <p>Estadisticas</p>
              <div className="grid grid-cols-2 gap-2 pt-3">
                <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
                  <div className>
                    <img
                      className="w-10"
                      src="https://cdn-icons-png.flaticon.com/512/627/627118.png"
                      alt=""
                    />
                  </div>
                  <div className="leading-4">
                    <p className="font-medium">
                      <span id="weather-wind">27.7</span> km/h
                    </p>
                    <p className="text-sm text-gray-400">Viento</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
                  <div className>
                    <img
                      className="w-10"
                      src="https://cdn-icons-png.flaticon.com/512/3314/3314011.png"
                      alt=""
                    />
                  </div>
                  <div className="leading-4">
                    <p className="font-medium">
                      <span id="weather-humidity">58</span>%
                    </p>
                    <p className="text-sm text-gray-400">Humedad</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
                  <div className>
                    <img
                      className="w-10"
                      src="https://cdn-icons-png.flaticon.com/512/362/362382.png"
                      alt=""
                    />
                  </div>
                  <div className="leading-4">
                    <p className="font-medium">
                      <span id="weather-clouds">10</span>%
                    </p>
                    <p className="text-sm text-gray-400">Niebla</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
                  <div className>
                    <img
                      className="w-10"
                      src="https://cdn-icons-png.flaticon.com/512/2917/2917242.png"
                      alt=""
                    />
                  </div>
                  <div className="leading-4">
                    <p className="font-medium" id="weather-uv">
                      2
                    </p>
                    <p className="text-sm text-gray-400">Indice UV</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-10 mb-10">
              <h3 className="text-xl font-medium text-gray-700">Dias</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 mt-1">
                <div
                  className="
        bg-white
        border border-gray-100
        shadow-sm
        rounded-md
        p-4
        flex
        justify-between
        items-center
      "
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      className="w-14"
                      src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                      alt=""
                    />
                    <div className>
                      <p className="text-lg font-medium">Lunes</p>
                      <p className="text-sm text-gray-400">Cielo despejado</p>
                    </div>
                  </div>
                  <div className>
                    <p className="text-lg">
                      25° / <span className="font-medium"> 30°</span>
                    </p>
                  </div>
                </div>
                <div
                  className="
        bg-white
        border border-gray-100
        shadow-sm
        rounded-md
        p-4
        flex
        justify-between
        items-center
      "
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      className="w-14"
                      src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                      alt=""
                    />
                    <div className>
                      <p className="text-lg font-medium">Lunes</p>
                      <p className="text-sm text-gray-400">Cielo despejado</p>
                    </div>
                  </div>
                  <div className>
                    <p className="text-lg">
                      25° / <span className="font-medium"> 30°</span>
                    </p>
                  </div>
                </div>
                <div
                  className="
        bg-white
        border border-gray-100
        shadow-sm
        rounded-md
        p-4
        flex
        justify-between
        items-center
      "
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      className="w-14"
                      src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                      alt=""
                    />
                    <div className>
                      <p className="text-lg font-medium">Lunes</p>
                      <p className="text-sm text-gray-400">Cielo despejado</p>
                    </div>
                  </div>
                  <div className>
                    <p className="text-lg">
                      25° / <span className="font-medium"> 30°</span>
                    </p>
                  </div>
                </div>
                <div
                  className="
        bg-white
        border border-gray-100
        shadow-sm
        rounded-md
        p-4
        flex
        justify-between
        items-center
      "
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      className="w-14"
                      src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                      alt=""
                    />
                    <div className>
                      <p className="text-lg font-medium">Lunes</p>
                      <p className="text-sm text-gray-400">Cielo despejado</p>
                    </div>
                  </div>
                  <div className>
                    <p className="text-lg">
                      25° / <span className="font-medium"> 30°</span>
                    </p>
                  </div>
                </div>
                <div
                  className="
        bg-white
        border border-gray-100
        shadow-sm
        rounded-md
        p-4
        flex
        justify-between
        items-center
      "
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      className="w-14"
                      src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                      alt=""
                    />
                    <div className>
                      <p className="text-lg font-medium">Lunes</p>
                      <p className="text-sm text-gray-400">Cielo despejado</p>
                    </div>
                  </div>
                  <div className>
                    <p className="text-lg">
                      25° / <span className="font-medium"> 30°</span>
                    </p>
                  </div>
                </div>
                <div
                  className="
        bg-white
        border border-gray-100
        shadow-sm
        rounded-md
        p-4
        flex
        justify-between
        items-center
      "
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      className="w-14"
                      src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                      alt=""
                    />
                    <div className>
                      <p className="text-lg font-medium">Lunes</p>
                      <p className="text-sm text-gray-400">Cielo despejado</p>
                    </div>
                  </div>
                  <div className>
                    <p className="text-lg">
                      25° / <span className="font-medium"> 30°</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </article>
    </div>
  );
};

export default MainPage;
