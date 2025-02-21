import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions";
import ContentLoader from "../components/header/loader/ContentLoader";
import Error from "../components/Error";
import Card from "../detail/Card";

const Content = () => {
  const { country } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector((store) => store);
  const arr = Object.entries(data || {}).filter(([key]) => key !== "flag");
  const refetch = () => dispatch(getDetails(country));
  return (
    <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (
        <ContentLoader />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        arr.map((item, key) => <Card key={key} item={item} />) //
      )}
    </div>
  );
};

export default Content;
