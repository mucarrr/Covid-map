import axios from "axios";

export const totalApi = axios.create({
  baseURL: "https://covid-19-statistics.p.rapidapi.com/reports",
  headers: {
    "x-rapidapi-key": "8e9da8a6c8mshe0150c72aee0dbep114b85jsn4ada65c7c7ee",
    "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
  },
});
export const detailApi = axios.create({
  baseURL: "https://covid-193.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "8e9da8a6c8mshe0150c72aee0dbep114b85jsn4ada65c7c7ee",
    "x-rapidapi-host": "covid-193.p.rapidapi.com",
  },
});
