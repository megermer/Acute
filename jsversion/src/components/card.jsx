import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export const BertCard = ({ tutorialCard, displayAnswer, onData }) => {
  let displayedCard = tutorialCard;
  let displayingAnswer = displayAnswer;

  let [userInput, setUserInput] = useState("");

  const sendDataToParent = (event) => {
    setUserInput(event.target.value);
    onData(userInput);
  };

  return (
    <div id="card-container">
      <div className="card" id="question-card">
        <p className="card-title">Question</p>
        <p className="card-content">{displayedCard.question}</p>
        <TextField
          id="answer-input"
          label="Answer"
          variant="outlined"
          multiline
          maxRows={1}
          value={userInput}
          onChange={sendDataToParent}
          sx={{ width: "75%", height: "25%", m: "0px", p: "0px" }}
        />
      </div>
      <div
        className="card"
        id="answer-card"
        style={{ visibility: displayingAnswer ? "visible" : "hidden" }}
      >
        <p className="card-title">Answer</p>
        <p className="card-content">{displayedCard.answer}</p>
      </div>
    </div>
  );
};

export const Sm2Card = ({ tutorialCard, displayAnswer }) => {
  let displayedCard = tutorialCard;
  let displayingAnswer = displayAnswer;

  return (
    <div id="card-container">
      <div className="card" id="question-card">
        <p className="card-title">Question</p>
        <p className="card-content">{displayedCard.question}</p>
      </div>
      <div
        className="card"
        id="answer-card"
        style={{ visibility: displayingAnswer ? "visible" : "hidden" }}
      >
        <p className="card-title">Answer</p>
        <p className="card-content">{displayedCard.answer}</p>
      </div>
    </div>
  );
};
