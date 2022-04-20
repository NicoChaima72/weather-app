import axios from "axios";

const autocompleteCity = async (city) => {
  const url = `https://autocomplete.search.hereapi.com/v1/autocomplete?limit=10&lang=es&types=city&q=${city}&apikey=${
    import.meta.env.VITE_APP_HERE_API_KEY
  }`;

  const data = await axios.get(url);

  return data.data.items;
};

const getCityByLatAndLon = async (latitude, longitude) => {
  const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=es&apikey=${
    import.meta.env.VITE_APP_HERE_API_KEY
  }`;

  // const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=-33.455582%2C-71.656638&lang=es&apikey=${
  //   import.meta.env.VITE_APP_HERE_API_KEY
  // }`;

  const data = await axios.get(url);
  const city = data.data.items[0].address;
  return city.state + ", " + city.countryName;
};

export default { autocompleteCity, getCityByLatAndLon };
