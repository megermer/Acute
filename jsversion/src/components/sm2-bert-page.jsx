import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const SM2AI = () => {
  return (
    <div id="cards-cont">
      <Stack direction="row" spacing={2} id="buttons">
        <Button
          variant="contained"
          color="success"
          onClick={displayAnswer}
          sx={{ bgcolor: "#1976d2" }}
        >
          {displayingAnswer ? "Hide" : "Show"}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={displayCards}
          sx={{ bgcolor: "#1976d2" }}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
};
