// src/components/BuildStatus.js
import React from 'react';

const BuildStatus = ({ builds }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5>Build Status</h5>
      </div>
      <div className="card-body">
        <p>Running: <span className="badge bg-primary">{builds.running}</span></p>
        <p>Failed: <span className="badge bg-danger">{builds.failed}</span></p>
        <p>Completed: <span className="badge bg-success">{builds.completed}</span></p>
        <p>Errored: <span className="badge bg-warning">{builds.errored}</span></p>
        <div>
          <h6>Build Trends</h6>
          <div className="d-flex justify-content-between">
            <span>Last 24h: {builds.trends['24h']}</span>
            <span>Last 7d: {builds.trends['7d']}</span>
            <span>Last 30d: {builds.trends['30d']}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildStatus;
