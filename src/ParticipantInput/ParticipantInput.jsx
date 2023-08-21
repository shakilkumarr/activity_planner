// ParticipantInput.js
import React, { useEffect, useState } from "react";
import "./ParticipantInput.css";

const ParticipantInput = ({ onSubmit }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState("");
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const [isNameView, setNameView] = useState(false);
  const [participants, setParticipants] = useState({});

  useEffect(() => {
    if (!isNameView) return;
    const length = Number(numberOfParticipants);
    const rowsFilled = Object.values(participants).filter((name) => name && !!name.trim()).length;
    const isValid = rowsFilled > 0 && rowsFilled === length;
    setSubmitBtnStatus(!isValid);
  }, [isNameView, participants, numberOfParticipants])

  const handleParticipantChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 5) {
      setNumberOfParticipants(String(value));
      setSubmitBtnStatus(false);
    } else if (!value) {
      setNumberOfParticipants("");
      setSubmitBtnStatus(true);
    }
  };

  const handleSubmit = () => {
    setSubmitBtnStatus(true);
    if (isNameView) {
      onSubmit(Object.values(participants));
    } else {
      setNameView(true);
      const length = Number(numberOfParticipants);
      const initialParticipants = {};
      for (let i = 0; i < length; i++) {
        initialParticipants[i] = '';
      }
      setParticipants(initialParticipants);
    }
  }

  const handleNameChange = key => (ev) => {
    const name = ev.target.value;
    if ((name === "" || /^[A-Za-z ]+$/.test(name)) && !name.startsWith(" ")) {
      setParticipants((prevParticipants) => ({
        ...prevParticipants,
        [key]: name,
      }));
    }
  };

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
          disabled={submitBtnStatus}
          onClick={handleSubmit}
        >Submit</button>
      </div>
    </div>
  );
};

export default ParticipantInput;
