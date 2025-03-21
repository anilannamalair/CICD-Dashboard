import React from 'react';

const ApplicationView = ({ apps }) => {
  return (
    <div>
      <h3>Application-Wise Top-Down View</h3>
      {apps.map(app => (
        <div key={app.name}>
          <h4>{app.name}</h4>
          <div>Status: {app.status}</div>
          <ul>
            {app.services.map(service => (
              <li key={service.name}>{service.name}: {service.status}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ApplicationView;
