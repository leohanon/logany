import { FormEvent, useEffect, useRef, useState } from "react";

type CreateLoggerProps = {
  onSubmit: (name: string) => void;
};
export function CreateLogger({ onSubmit }: CreateLoggerProps) {
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
      inputRef.current.focus();
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
