import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { BertCard } from "./card";

export const BertTutorial = ({ onData }) => {
  const [displayAnswer, setDisplayAnswer] = useState(false);

  // User input for SM2-AI Tutorial
  const [userInput, setUserInput] = useState(() => {
    return localStorage.getItem("userInput") || "";
  });

  useEffect(() => {
    localStorage.setItem("userInput", userInput);
  }, [userInput]);

  const tutorialCard = {
    question: "TUTORIAL This is a bert question card",
    answer: "TUTORIAL This is a bert question card",
  };

  const sendDataToParent = () => {
    if (userInput != "") {
      let selectedPage = 2; // sm2-bert template
      onData(selectedPage);
    }
  };

  const handleUserInput = (data) => {
    setUserInput(data);
  };

  return (
    <div className="template-container">
      <BertCard
        tutorialCard={tutorialCard}
        displayAnswer={displayAnswer}
        onData={handleUserInput}
      />
      <Stack direction="row" spacing={2} id="buttons">
        <Button
          variant="contained"
          color="success"
          onClick={() => setDisplayAnswer((prev) => !prev)}
          sx={{ bgcolor: "#1976d2" }}
        >
          {displayAnswer ? "Hide" : "Show"}
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
