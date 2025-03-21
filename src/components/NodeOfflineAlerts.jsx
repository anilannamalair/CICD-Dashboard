import React from 'react';

const NodeOfflineAlerts = ({ offlineNodes }) => {
  return (
    <div>
      <h3>Node Offline Alerts</h3>
      <ul>
        {offlineNodes.map(node => (
          <li key={node.name}>
            {node.name}: Offline since {node.offlineSince} - Reason: {node.reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NodeOfflineAlerts;
