import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import logo from "../logo.svg";

export const Header = ({ state }) => (
  <header className="navbar navbar-dark bg-primary">
    <Link
      className="navbar-brand"
      to={state.authenticated ? "/repositories" : "/"}
    >
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="logo"
      />
      TS SOLID Analyzer
    </Link>
    {state.authenticated ? (
      <div>
        <strong className="mr-2 text-white">
          github.com/{state.user.login}
        </strong>
        <img src={state.user.avatar_url} width="30" height="30" alt="avatar" />
        <Link
          className="btn btn-outline-secondary ml-2"
          to="/logout"
          title="Logout"
        >
          Logout
        </Link>
      </div>
    ) : (
      <button
        className="btn btn-outline-secondary"
        onClick={() =>
          window.location.replace("/api/v1/auth/authorize-in-github")
        }
        title="Sign in with GitHub"
      >
        <FontAwesomeIcon icon={faGithub} /> Sign in
      </button>
    )}
  </header>
);
