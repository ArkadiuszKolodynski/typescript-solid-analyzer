import React, { useContext, useEffect } from "react";
import { Loading } from "../../components";
import { history, store } from "../../utils";
import { fetchData } from "../../helpers";

const Logout = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    fetchData("/api/v1/auth/logout", {});
    dispatch({ type: "logout" });
    history.push("/");
  }, [dispatch]);

  return <Loading />;
};

export default Logout;
