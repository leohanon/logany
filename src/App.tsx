import { useState } from "react";
import "./App.css";
import { LoggerList } from "./LoggerList";

function App() {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((oldMode) => {
      return !oldMode;
    });
  };

  return (
    <>
      <button onClick={toggleEditMode}>{editMode ? "Save" : "Edit"}</button>
      <LoggerList editMode={editMode} />
    </>
  );
}

export default App;
