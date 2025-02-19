import React, { useEffect, useState } from "react";
import Item from "./Item";
import millify from "millify";
import { totalApi } from "../utils/api";
import Loader from "../components/header/loader/Loader";

const Statistics = () => {
  const [data, setData] = useState(null);
  const [isError, setIsEroor] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    totalApi
      .get("/total", { params: { date: "2020-04-07" } })
      .then((res) => setData(res.data.data))
      .catch(() => setIsEroor(true))
      .finally(() => setIsLoading(false));
  }, []);
  console.log(data);

  return (
    <div className="container py-0">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Sorry! There is an error..</p>
      ) : (
        data && (
          <div className="bg-white shadow-lg rounded-xl p-5 grid grid-cols-3 gap-5 mt-[-34px] md:mt-[-48px]">
            <Item
              color="text-pink-500"
              text="Total Cases"
              value={millify(data.confirmed)}
            />
            <Item
              color="text-green-500"
              text="Active Cases"
              value={millify(data.active)}
            />
            <Item
              color="text-gray-500"
              text="Total Death"
              value={millify(data.deaths)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Statistics;
