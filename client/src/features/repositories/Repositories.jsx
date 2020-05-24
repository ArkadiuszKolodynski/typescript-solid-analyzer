import React, { useContext, useEffect, useState } from "react";
import {
  RepositoriesFetchError,
  RepositoriesList,
  RepositoriesSearch,
} from "./components";
import { Loading } from "../../components";
import { fetchData } from "../../helpers";
import { store } from "../../utils";

const Repositories = () => {
  const { dispatch } = useContext(store);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const repositories = await fetchData("/api/v1/repositories");
        dispatch({ type: "repositories", payload: repositories });
        setRepositories(repositories);
        setLoading(false);
        console.log(repositories);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    })();
  }, [dispatch]);

  if (error) return <RepositoriesFetchError />;
  if (loading) return <Loading />;
  return (
    <>
      <RepositoriesSearch setRepositories={setRepositories} />
      <RepositoriesList repositories={repositories} />
    </>
  );
};

export default Repositories;
