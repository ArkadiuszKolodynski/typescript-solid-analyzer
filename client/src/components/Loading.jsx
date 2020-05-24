import React from "react";

export const Loading = () => {
  return (
    <div className="bg-wrapper">
      <div
        className="spinner-border text-primary"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
