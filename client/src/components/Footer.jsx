import React from "react";

export const Footer = () => (
  <footer className="bg-secondary">
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 text-left">
          <span className="text-muted">
            © {new Date().getFullYear()} TS SOLID Analyzer
          </span>
        </div>
        <div className="col-4 text-center">
          <span className="text-muted">
            © {new Date().getFullYear()} TS SOLID Analyzer
          </span>
        </div>
        <div className="col-4 text-right">
          <span className="text-muted">
            © {new Date().getFullYear()} TS SOLID Analyzer
          </span>
        </div>
      </div>
    </div>
  </footer>
);
