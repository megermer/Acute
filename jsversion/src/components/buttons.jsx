import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

export const BertButtons = ({ onData }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    sendAnswerBtn()
  })

  const sendAnswerBtn = () => {
    
  }

  const sendDataToBert = (data) => {
    onData(data);
  };

  return (
    <Stack direction="row" spacing={2} id="buttons">
      <Button
        variant="contained"
        color="success"
        onClick={showAnswer => !showAnswer}
        sx={{ bgcolor: "#1976d2" }}
        disabled={showDisabled}
      >
        Show
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={sendDataToBert(false)}
        sx={{ bgcolor: "#1976d2" }}
        disabled={nextDisabled}
      >
        Next
      </Button>
    </Stack>
  );
};

export const SM2Buttons = () => {
  return <p>SM2BUTTONS</p>;
};
