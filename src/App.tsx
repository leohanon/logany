import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { LoggerListContextProvider } from "./LoggerListContext";
import { Log } from "./LogTypes";

type LoggerItemProps = {
  value: string;
};
function LoggerItem({ value }: LoggerItemProps) {
  return <li>{value}</li>;
}

type CreateLoggerProps = {
  onSubmit: (name: string) => void;
};
function CreateLogger({ onSubmit }: CreateLoggerProps) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setEditMode(true);
  };

  const handleSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    onSubmit(name);
    setEditMode(false);
    setName("");
  };

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus(); // Set focus on the input element
    }
  }, [editMode]);

  return (
    <li>
      {!editMode && <button onClick={handleClick}>Create New</button>}
      {editMode && (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      )}
    </li>
  );
}

function LoggerList() {
  const [loggerList, setLoggerList] = useState<Log[]>([]);

  const handleAddLogList = (name: string) => {
    const newLog = { id: crypto.randomUUID(), name: name };
    setLoggerList((oldList) => [...oldList, newLog]);
  };

  return (
    <ul>
      {loggerList.map((x) => {
        return <LoggerItem key={x.id} value={x.name} />;
      })}
      <CreateLogger onSubmit={handleAddLogList} />
    </ul>
  );
}

function App() {
  return (
    <>
      <LoggerListContextProvider>
        <LoggerList />
      </LoggerListContextProvider>
    </>
  );
}

export default App;
