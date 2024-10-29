import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { BertCard } from "./card";

export const SM2AI = ({ onData, cards }) => {
  const deck = cards;
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [showDisabled, setShowDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);


  // User input for SM2-AI Tutorial
  const [userInput, setUserInput] = useState(() => {
    return localStorage.getItem("userInput") || "";
  });

  useEffect(() => {
    localStorage.setItem("userInput", userInput);
  }, [userInput]);

  const sendDataToParent = () => {
    if (!nextDisabled) {
      // Tells App.jsx that current card has been reviewed
      let cardOver = true;
      onData(userInput, cardOver);
      cardOver = false
      // alert("Check comment in sendDataToParent() in sm2-bert-page.jsx")
      setDisplayAnswer((prev) => !prev);
    }
  };

  const handleUserInput = (data) => {
    setUserInput(data);
    setShowDisabled(() => {
      return data.trim() == "";
    });
  };

  const showAnswer = () => {
    if (userInput != "") {
      setDisplayAnswer((prev) => !prev);
      setShowDisabled(true);
      setNextDisabled(false);
    }
  };

  return (
    <div className="template-container">
      <BertCard
        card={deck[0]}
        onData={handleUserInput}
        displayAnswer={displayAnswer}
      />
      <Stack direction="row" spacing={2} id="buttons">
        <Button
          variant="contained"
          color="success"
          onClick={showAnswer}
          sx={{ bgcolor: "#1976d2" }}
          disabled={showDisabled}
        >
          Show
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={sendDataToParent}
          sx={{ bgcolor: "#1976d2" }}
          disabled={nextDisabled}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
};
