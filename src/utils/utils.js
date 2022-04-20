import moment from "moment";

export const getLatitudeAndLongitude = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!position)
          resolve({ latitude: "-33.4209", longitude: "-70.72596" });
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else resolve({ latitude: "-33.4209", longitude: "-70.72596" });
  });
};

export const saveDataInLocalStorage = function (latitude, longitude, cityName) {
  localStorage.setItem("last-time", new Date().toString());
  localStorage.setItem("cityName", cityName);
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
};

export const getDataOfLocalStorage = function () {
  return [
    localStorage.getItem("latitude"),
    localStorage.getItem("longitude"),
    localStorage.getItem("cityName"),
  ];
};

export const isThereValidDataInLocalStorage = function () {
  return (
    localStorage.getItem("last-time") &&
    localStorage.getItem("cityName") &&
    localStorage.getItem("latitude") &&
    localStorage.getItem("longitude") &&
    // Si el tiempo actual no es mayor a 5 min guardado en local
    moment
      .duration(
        moment(new Date()).diff(
          moment(Date.parse(localStorage.getItem("last-time")))
        )
      )
      .asMinutes() < 5
  );
};
