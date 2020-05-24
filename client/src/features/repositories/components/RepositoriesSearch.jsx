import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { store } from "../../../utils";

export const RepositoriesSearch = ({ setRepositories }) => {
  const { state } = useContext(store);

  const onChangeHandler = (event) => {
    setRepositories(
      state.repositories.filter((repository) =>
        repository.name.includes(event.target.value)
      )
    );
  };

  return (
    <div className="row my-4">
      <div className="col-md-3 col-0"></div>
      <div className="col-md-6 col-12">
        <form id="search">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              onChange={onChangeHandler}
            />
          </div>
        </form>
      </div>
      <div className="col-md-3 col-0"></div>
    </div>
  );
};
