import React from 'react';

const NodeAvailability = ({ nodes }) => {
  return (
    <div>
      <h3>Jenkins Nodes Availability</h3>
      <ul>
        {nodes.map(node => (
          <li key={node.name}>
            {node.name}: {node.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NodeAvailability;
