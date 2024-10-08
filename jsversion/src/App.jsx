import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
// import data from "../src/data.json";
// import { getSimilarity } from "/backend/bert-call";
import { SelectPage } from "../src/components/select-page";
import { BertTutorial } from "../src/components/bert-tutorial";

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

  return (
    <div id="root-page">
      {algorithmTable[selectedAlgorithm] === "SM2AI" ? (
        <p>Will Display sm2-bert-page Component</p>
      ) : algorithmTable[selectedAlgorithm] === "SM2" ? (
        <p>Will Display sm2-page Component</p>
      ) : algorithmTable[selectedAlgorithm] === "SM2AITUTORIAL" ? (
        <BertTutorial onData={handleDataDisplayPage} />
      ) : algorithmTable[selectedAlgorithm] === "SM2TUTORIAL" ? (
        <p>Will Display sm2-tutorial Component</p>
      ) : (
        <SelectPage onData={handleDataDisplayPage} />
      )}
    </div>
  );
}

export default App;
