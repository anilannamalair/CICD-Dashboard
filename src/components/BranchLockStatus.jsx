import React from 'react';

const BranchLockStatus = ({ branches }) => {
  return (
    <div>
      <h3>Branch Lock Status</h3>
      <ul>
        {branches.map(branch => (
          <li key={branch.name}>
            {branch.name}: {branch.status} - Locked by {branch.lockedBy} at {branch.lockedAt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchLockStatus;
