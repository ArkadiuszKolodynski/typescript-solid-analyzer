import React from "react";
import { RepositoriesNotFound } from "./RepositoriesNotFound";
import { RepositoryCard } from "./RepositoryCard";

export const RepositoriesList = ({ repositories }) => {
  if (repositories.length <= 0) return <RepositoriesNotFound />;
  return (
    <>
      {repositories.map((repository, index) =>
        index % 2 === 0 ? (
          <div key={index} className="row my-3">
            <div className="col-md-6">
              <RepositoryCard key={repository.id} repository={repository} />
            </div>
            {repositories[index + 1] ? (
              <div key={index + 1} className="col-md-6 mt-3 mt-md-0">
                <RepositoryCard
                  key={repositories[index + 1]}
                  repository={repositories[index + 1]}
                />
              </div>
            ) : null}
          </div>
        ) : null
      )}
    </>
  );
};
