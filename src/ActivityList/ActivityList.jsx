import React from 'react';
import "./ActivityList.css";

const ActivityList = ({ activities, participants }) => {
  const sortedActivities = activities.sort((a, b) => b.price - a.price);
  
  return (
    <div className="activity-container">
      <div>
        <h2>Participants:</h2>
        <ul>
          {participants.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Activities:</h2>
        <ul>
          {sortedActivities.map((activity) => (
            <li key={activity.key}>{`${activity.activity} - $${activity.price}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityList;
