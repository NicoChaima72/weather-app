import axios from "axios";

const oneCallWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=es&exclude=minutely&appid=${
    import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY
  }`;
  const { data } = await axios.get(url);

  return data;
};

const currentWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
    import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY
  }`;
  const { data } = await axios.get(url);
  return data;
};

const getWeather = async (latitude, longitude) => {
  const [oneCall, current] = await Promise.all([
    oneCallWeather(latitude, longitude),
    currentWeather(latitude, longitude),
  ]);

  oneCall.current["main"] = current.main;
  console.log({ oneCall, current });
  return oneCall;
};

export default { getWeather };
