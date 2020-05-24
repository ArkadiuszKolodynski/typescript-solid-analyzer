import React, { useContext, useEffect } from "react";
import { Loading } from "../../components";
import { history, store } from "../../utils";

const Logout = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    fetch("/api/v1/auth/logout");
    dispatch({ type: "logout" });
    history.push("/");
  }, [dispatch]);

  return <Loading />;
};

export default Logout;
