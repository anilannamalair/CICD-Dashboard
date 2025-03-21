import React from 'react';

const DeployStatus = ({ deployments }) => {
  return (
    <div>
      <h3>Deploy Status</h3>
      <div>Running: {deployments.running}</div>
      <div>Failed: {deployments.failed}</div>
      <div>Completed: {deployments.completed}</div>
      <div>Errored: {deployments.errored}</div>
    </div>
  );
};

export default DeployStatus;
