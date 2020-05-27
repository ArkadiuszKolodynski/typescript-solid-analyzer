import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faPlay, faTools } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../logo.svg";

export const RepositoryCard = ({ repository }) => {
  const startAnalysis = () => {
    const socket = new WebSocket("ws://127.0.0.1:3000");
    socket.onopen = () => {
      console.log(socket);
      socket.send(
        JSON.stringify({
          event: "perform_analysis",
          data: { clone_url: repository.clone_url },
        })
      );
    };
    socket.onerror = (err) => {
      console.log(err);
      socket.close();
    };
    socket.onmessage = (message) => {
      console.log(message);
      if (
        JSON.parse(message.data).event === "results" ||
        JSON.parse(message.data).event === "error"
      ) {
        console.log("closing...");
        socket.close();
      }
    };
    socket.onclose = (ev) => {
      console.log("closed");
    };
  };

  return (
    <div className="card">
      {/* <div className="card-header">{repository.name}</div> */}
      <div className="card-body">
        <div className="row">
          <div className="col-8 text-left">
            <a href={repository.clone_url}>
              <h5 className="card-subtitle text-muted">
                {repository.full_name.split("/").shift()}/
              </h5>
              <h4 className="card-title text-dark">{repository.name}</h4>
            </a>
          </div>
          <div className="col-4 text-right">
            <img src={logo} className="w-100" alt="logo" />
          </div>
        </div>
      </div>
      <div className="card-footer text-right">
        <button
          className="btn btn-outline-primary mx-2"
          title="Analyze"
          onClick={startAnalysis}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className="btn btn-outline-primary mx-2" title="Settings">
          <FontAwesomeIcon icon={faTools} />
        </button>
        <Link
          to={`/results/${repository.name}`}
          className="btn btn-outline-primary mx-2"
          title="Results"
        >
          <FontAwesomeIcon icon={faChartBar} />
        </Link>
      </div>
    </div>
  );
};
