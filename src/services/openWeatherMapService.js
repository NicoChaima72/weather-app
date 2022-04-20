import axios from "axios";

const getWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=es&exclude=minutely&appid=${
    import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY
  }`;
  const { data } = await axios.get(url);

  return data;
};

export default { getWeather };
