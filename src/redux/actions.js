import { createAsyncThunk } from "@reduxjs/toolkit";
import { detailApi } from "../utils/api";
import axios from "axios";

export const getDetails = createAsyncThunk(
  "covid/getDetails",
  async (country) => {
    const response = await detailApi.get("/statistics", {
      params: { country },
    });
    const responsee = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );
    console.log(response.data.response[0]);
    console.log(responsee.data[0]);
  }
);
