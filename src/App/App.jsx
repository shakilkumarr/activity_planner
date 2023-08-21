// App.js
import React, { useState } from "react";

import ParticipantInput from "../ParticipantInput";
import ActivityList from "../ActivityList";
import './App.css';

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [activities, setActivities] = useState([]);


  const fetchActivity = async (noOfParticipants) => {
    const activityInfo = await fetch(`https://www.boredapi.com/api/activity?participants=${noOfParticipants}`);
    const activity = await activityInfo.json();
    return activity;
  };

  const onSubmit = async (participantList) => {
    setParticipants(participantList);
    const intermediateActivityResponse = {};
    let i = 0;
    while (i < 5) {
      try {
        const activityInfo = await fetchActivity(participantList.length);
        const activityKeyName = activityInfo.activity.split(" ").join("_");
        if (intermediateActivityResponse[activityKeyName] !== undefined) break;
        intermediateActivityResponse[activityKeyName] = activityInfo;
        i += 1;
      } catch (error) {
        console.error("Error fetching activity:", error);
        break;
      }
    }
    setActivities(Object.values(intermediateActivityResponse));
  }

  return (
    <div className="container">
      <h1>Activity Planner</h1>
      {
        activities && activities.length > 0 ?
          <ActivityList activities={activities} participants={participants} /> :
          <ParticipantInput
            onSubmit={onSubmit}
          />
      }
    </div>
  );
};

export default App;
