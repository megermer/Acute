import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
// import data from "../src/data.json";
// import { getSimilarity } from "/backend/bert-call";
import { SelectPage } from "../src/components/select-page";
import { BertTutorial } from "../src/components/bert-tutorial";
import { SM2Tutorial } from "../src/components/sm2-tutorial";
import { SM2AI } from "../src/components/sm2-bert-page";
// import { SM2 } from "../src/components/sm2-page";


function App() {
  const algorithmTable = {
    0: "SELECT",
    1: "SM2",
    2: "SM2AI",
    3: "SM2TUTORIAL",
    4: "SM2AITUTORIAL",
  };

  // Select Algorithm page to be displayed
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(() => {
    const savedData = localStorage.getItem("selectedAlgorithm");
    return savedData ? JSON.parse(savedData) : 0;
  });

  // Page display data from components
  const handleDataDisplayPage = (data) => {
    setSelectedAlgorithm(data);
  };

  const handleDataFomSM2AI = () => {

  }

  const handleDataFomSM2 = () => {

  }
 
  return (
    <div id="root-page">
      {algorithmTable[selectedAlgorithm] === "SM2AI" ? (
        // <SM2AI onData={handleDataFomSM2AI} />
        <p>Should show SM2AI Component</p>
      ) : algorithmTable[selectedAlgorithm] === "SM2" ? (
        // <SM2 onData={handleDataFomSM2} />
        <p>Should show SM2 Component</p>
      ) : algorithmTable[selectedAlgorithm] === "SM2AITUTORIAL" ? (
        <BertTutorial onData={handleDataDisplayPage} />
      ) : algorithmTable[selectedAlgorithm] === "SM2TUTORIAL" ? (
        <SM2Tutorial onData={handleDataDisplayPage} />
        // <p>Testing SM2Tutorial</p>
      ) : (
        <SelectPage onData={handleDataDisplayPage} />
      )}
    </div>
  );
}

export default App;
