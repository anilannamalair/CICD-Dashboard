// src/components/JenkinsStatus.js
import React from 'react';

const JenkinsStatus = ({ controllers, nodes }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5>Jenkins Status Overview</h5>
      </div>
      <div className="card-body">
        <h6>Controllers Status</h6>
        <ul className="list-group">
          {controllers.map((controller) => (
            <li key={controller.name} className={`list-group-item ${controller.status === 'Active' ? 'list-group-item-success' : 'list-group-item-warning'}`}>
              {controller.name}: {controller.status}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <h6>Nodes Status</h6>
        <ul className="list-group">
          {nodes.map((node) => (
            <li key={node.name} className={`list-group-item ${node.status === 'Available' ? 'list-group-item-success' : 'list-group-item-danger'}`}>
              {node.name}: {node.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JenkinsStatus;
