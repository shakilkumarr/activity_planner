import React, { useState } from "react";
import "./ParticipantInput.css";

const ParticipantInput = ({ onSubmit }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState("");
  const [isNameView, setNameView] = useState(false);
  const [participants, setParticipants] = useState({});
  const [filledInputLength, setFilledInput] = useState(0);
  const [filledInputTrack, setFilledInputTrack] = useState({});

  const handleParticipantChange = (event) => {
    const value = Number(event.target.value);
    if (value === 0 || (value >= 1 && value <= 5)) {
      setNumberOfParticipants(event.target.value);
    }
  };

  const handleSubmit = () => {
    if (isNameView) {
      onSubmit(Object.values(participants));
    } else {
      setNameView(true);
      const length = Number(numberOfParticipants);
      const initialParticipants = {};
      const participantsValueTrack = {};
      for (let i = 0; i < length; i++) {
        initialParticipants[i] = '';
        participantsValueTrack[i] = 1;
      }
      setFilledInputTrack(participantsValueTrack);
      setParticipants(initialParticipants);
    }
  }

  const handleNameChange = (key) => (ev) => {
    const name = ev.target.value;
    const isValidName = /^[A-Za-z ]+$/.test(name) && !name.startsWith(" ");
    if (name !== "" && !isValidName) {
      return;
    }
    
    setParticipants({
      ...participants,
      [key]: name,
    });
    updateFilledInputTrack(key, name);
  };

  const updateFilledInputTrack = (key, name) => {
    const isNewNameEmpty = !name;
    const isInputFilledBefore = filledInputTrack[key] === 0;

    if (isNewNameEmpty && isInputFilledBefore) {
      setFilledInput(filledInputLength - 1);
    } else if (!isNewNameEmpty && !isInputFilledBefore) {
      setFilledInput(filledInputLength + 1);
    }

    setFilledInputTrack((prevFilledInputTrack) => ({
      ...prevFilledInputTrack,
      [key]: isNewNameEmpty ? 1 : 0,
    }));
  };
  
  const isSubmitBtnDisabled = isNameView ? filledInputLength !== Number(numberOfParticipants) : Number(numberOfParticipants) === 0;
  
  return (
    <div className="participant-container">
      {
        !isNameView ? (
          <div>
            <label htmlFor="numberOfParticipants">No. of participants: </label>
            <input
              id="numberOfParticipants"
              type="number"
              min="1"
              max="5"
              value={numberOfParticipants}
              onChange={handleParticipantChange}
            />
          </div>
        ) : (
          <div className="participant-input-container">
            <label htmlFor="numberOfParticipants">{`No. of participants: ${numberOfParticipants}`}</label>
            {Object.values(participants).map((name, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Participant ${index + 1}`}
                value={name}
                maxLength={20}
                onChange={handleNameChange(index)}
                pattern="[A-Za-z ]+"
                required
                className="participant-input"
              />
            ))}
          </div>
        )
      }
      <div className="footer">
        <button
          className="submit-button"
          disabled={isSubmitBtnDisabled}
          onClick={handleSubmit}
        >Submit</button>
      </div>
    </div>
  );
};

export default ParticipantInput;
