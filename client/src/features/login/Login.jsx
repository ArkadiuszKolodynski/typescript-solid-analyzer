import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Loading } from "../../components";
import { fetchData } from "../../helpers";
import { history, store } from "../../utils";

const Login = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    (async () => {
      try {
        const code = new URLSearchParams(window.location.search).get("code");
        const user = await fetchData(`/api/v1/auth/login`, { code });
        dispatch({ type: "login", payload: user });
        toast.success("Login success!");
        history.push("/repositories");
      } catch (err) {
        toast.error(err.message);
        history.push("/");
      }
    })();
  }, [dispatch]);

  return <Loading />;
};

export default Login;
