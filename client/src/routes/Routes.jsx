import React, { useContext, useEffect, useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Breadcrumbs,
  Footer,
  Header,
  Loading,
  ProtectedRoute,
} from "../components";
import Login from "../features/login/Login";
import Logout from "../features/logout/Logout";
import Repositories from "../features/repositories/Repositories";
import Results from "../features/results/Results";
import { getInitialState } from "../helpers";
import { history, store } from "../utils";

const Routes = () => {
  const { state, dispatch } = useContext(store);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const initialState = await getInitialState();
      dispatch({ type: "init", payload: initialState });
      setLoading(false);
    })();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Header state={state} />
      <Breadcrumbs />
      <main role="main" className="container">
        <Switch>
          <Route exact path="/">
            {state.authenticated ? (
              <Redirect to="/repositories" />
            ) : (
              <h1>Hello, World!</h1>
            )}
          </Route>
          <Route path="/login/github/callback" component={Login} />
          <ProtectedRoute authenticated={state.authenticated} path="/logout">
            <Logout />
          </ProtectedRoute>
          <ProtectedRoute
            authenticated={state.authenticated}
            path="/repositories"
          >
            <Repositories />
          </ProtectedRoute>
          <ProtectedRoute
            authenticated={state.authenticated}
            path="/results/:repo_name"
          >
            <Results />
          </ProtectedRoute>
          <Redirect from="*" to="/repositories" />
        </Switch>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default Routes;
