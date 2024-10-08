import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const BertTutorial = ({ onData }) => {
  const [displayAnswer, setDisplayAnswer] = useState(false);

  // User input for SM2-AI Tutorial
  const [userInput, setUserInput] = useState(() => {
    return localStorage.getItem("userInput") || "";
  });

  useEffect(() => {
    localStorage.setItem("userInput", userInput);
  }, [userInput])


  const tutorialCard = {
    question: "TUTORIAL This is a bert question card",
    answer: "TUTORIAL This is a bert question card",
  };

  const sendDataToParent = () => {
    let selectedPage = 2;
    onData(selectedPage);
  };

  return (
    <div id="cards-cont">
      <div className="card" id="question-card">
        <p className="card-title">Question</p>
        <p className="card-content">{tutorialCard.question}</p>
        <TextField
          id="answer-input"
          label="Answer"
          variant="outlined"
          multiline
          maxRows={1}
          value={userInput}
          onChange={() => setUserInput(event.target.value)}
          sx={{ width: "75%", height: "25%", m: "0px", p: "0px" }}
        />
      </div>
      <div
        className="card"
        id="answer-card"
        style={{ visibility: displayAnswer ? "visible" : "hidden" }}
      >
        <p className="card-title">Answer</p>
        <p className="card-content">{tutorialCard.answer}</p>
      </div>
      <Stack direction="row" spacing={2} id="buttons">
        <Button
          variant="contained"
          color="success"
          onClick={() => setDisplayAnswer((prev) => !prev)}
          sx={{ bgcolor: "#1976d2" }}
        >
          Show
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={sendDataToParent}
          sx={{ bgcolor: "#1976d2" }}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
};
