import React from "react";
import { firstUppercase, getImageByWeather } from "../utils/utils";
import moment from "moment";

const StatsWeather = ({ weather }) => {
  return (
    <div className="mt-16 p-6 sm:p-8 md:p-10 xl:p-14 rounded-lg bg-gray-50 shadow">
      <section className="mt-2">
        <h3 className="text-xl font-medium text-gray-700">Horas</h3>
        <div className="flex space-x-1 pb-2 mt-1" style={{ overflowX: "auto" }}>
          {weather.hourly.map(
            (card, index) =>
              index < 23 && (
                <div
                  key={card.dt}
                  className="border border-gray-100 flex-shrink-0 bg-white shadow-sm rounded-md flex flex-col items-center py-3 px-4"
                >
                  <img
                    className="w-14"
                    src={getImageByWeather(card.weather[0].icon)}
                    alt=""
                  />
                  <p className="mt-1 font-medium">{Math.round(card.temp)}°</p>
                  <p className="text-xs text-gray-400">
                    {moment(card.dt * 1000).format("HH:mm")}
                  </p>
                </div>
              )
          )}
        </div>
      </section>
      <section className="bg-white mt-6 shadow-sm border border-gray-100 rounded-lg text-gray-500 p-3">
        <p>Estadisticas</p>
        <div className="grid grid-cols-2 gap-2 pt-3">
          <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
            <div>
              <img
                className="w-10"
                src="https://cdn-icons-png.flaticon.com/512/627/627118.png"
                alt=""
              />
            </div>
            <div className="leading-4">
              <p className="font-medium">
                <span id="weather-wind">
                  {Math.round(weather.current.wind_speed * 10) / 10}
                </span>{" "}
                km/h
              </p>
              <p className="text-sm text-gray-400">Viento</p>
            </div>
          </div>
          <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
            <div>
              <img
                className="w-10"
                src="https://cdn-icons-png.flaticon.com/512/3314/3314011.png"
                alt=""
              />
            </div>
            <div className="leading-4">
              <p className="font-medium">
                <span id="weather-humidity">
                  {Math.round(weather.current.humidity)}
                </span>
                %
              </p>
              <p className="text-sm text-gray-400">Humedad</p>
            </div>
          </div>
          <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
            <div>
              <img
                className="w-10"
                src="https://cdn-icons-png.flaticon.com/512/362/362382.png"
                alt=""
              />
            </div>
            <div className="leading-4">
              <p className="font-medium">
                <span id="weather-clouds">
                  {Math.round(weather.current.clouds)}
                </span>
                %
              </p>
              <p className="text-sm text-gray-400">Niebla</p>
            </div>
          </div>
          <div className="border border-gray-100 rounded p-3 flex space-x-2 items-center">
            <div>
              <img
                className="w-10"
                src="https://cdn-icons-png.flaticon.com/512/2917/2917242.png"
                alt=""
              />
            </div>
            <div className="leading-4">
              <p className="font-medium" id="weather-uv">
                {Math.round(weather.current.uvi)}
              </p>
              <p className="text-sm text-gray-400">Indice UV</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 mb-10">
        <h3 className="text-xl font-medium text-gray-700">Dias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 mt-1">
          {weather.daily.map((card, index) => (
            <div
              key={card.dt}
              className="bg-white border border-gray-100 shadow-sm rounded-md p-4 flex justify-between items-center "
            >
              <div className="flex space-x-3 items-center">
                <img
                  className="w-14"
                  src={getImageByWeather(card.weather[0].icon)}
                  alt=""
                />
                <div>
                  <p className="text-lg font-medium">
                    {index < 2
                      ? index === 0
                        ? "Hoy"
                        : "Mañana"
                      : firstUppercase(moment(card.dt * 1000).format("dddd"))}
                  </p>
                  <p className="text-sm text-gray-400 flex-shrink">
                    {firstUppercase(card.weather[0].description)}
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <p className="text-lg">
                  {Math.round(card.temp.min)}° /{" "}
                  <span className="font-medium">
                    {" "}
                    {Math.round(card.temp.max)}°
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StatsWeather;
