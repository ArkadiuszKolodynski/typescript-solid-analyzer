import React from "react";
import { Link } from "react-router-dom";
// import useBreadcrumbs from "use-react-router-breadcrumbs";

export const Breadcrumbs = () => {
  // const breadcrumbs = useBreadcrumbs();
  const breadcrumbs = window.location.pathname
    .split("/")
    .filter((section) => section !== "");
  console.log(breadcrumbs);

  if (
    breadcrumbs.length < 1 ||
    (breadcrumbs[0] !== "repositories" && breadcrumbs[0] !== "results")
  ) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0">
        {breadcrumbs[0] === "repositories" ? (
          <li className="breadcrumb-item active" aria-current="page">
            Repositories
          </li>
        ) : (
          <>
            <li className="breadcrumb-item">
              <Link to="/repositories">Repositories</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Results
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};
