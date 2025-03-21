import React from 'react';

const BaseImageStatus = ({ imageStatus }) => {
  return (
    <div>
      <h3>Base Image Update Status</h3>
      <ul>
        {imageStatus.map(image => (
          <li key={image.name}>
            {image.name}: {image.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseImageStatus;
