import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";

export const SelectPage = ({ onData }) => {
  const [selectedPage, setSelectedPage] = useState(0);

  const handleRadioChange = (event) => {
    // Converting to integer then updating state
    setSelectedPage(parseInt(event.target.value, 10));
  };

  const controlProps = (item) => ({
    checked: selectedPage === item,
    onChange: handleRadioChange,
    value: item,
    name: "algorithm-picker",
    inputProps: { "aria-label": item },
  });

  // Send selectedPage to parent
  const sendDataToParent = () => {
    if (selectedPage !== 0) {
      console.log(`sending ${selectedPage}`);
      onData(selectedPage); // Send the selectedPage to the parent
    }
  };

  return (
    <section id="pick-algorithm">
      <p id="ai-title">Select your Template</p>

      <div>
        <p>SM2</p>
        <Radio
          {...controlProps(3)}
          color="primary"
          sx={{ p: "0px", m: "0px" }}
        />
      </div>

      <div>
        <p>AI + SM2</p>
        <Radio
          {...controlProps(4)}
          color="success"
          sx={{ p: "0px", m: "0px" }}
        />
      </div>

      <div id="btn-cont">
        <Button
          variant="contained"
          color="success"
          onClick={sendDataToParent}
          sx={{ bgcolor: "#1976d2", width: "30%" }}
        >
          Confirm
        </Button>
      </div>
    </section>
  );
};
