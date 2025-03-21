import React from 'react';

const MergeRequestStatus = ({ prs }) => {
  return (
    <div>
      <h3>Merge Request Status</h3>
      <div>Open: {prs.open}</div>
      <div>Merged: {prs.merged}</div>
      <div>
        <h4>PR Review Time</h4>
        <div>Average time: {prs.averageReviewTime}</div>
      </div>
    </div>
  );
};

export default MergeRequestStatus;
