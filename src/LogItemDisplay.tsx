import { LogItem } from "./LogTypes";

type LogItemDisplayParams = {
  logItem: LogItem;
  editMode: boolean;
};
export function LogItemDisplay({ logItem, editMode }: LogItemDisplayParams) {
  const { timestamp, note } = logItem;

  return (
    <li>
      {timestamp} - {note}
      {editMode && <button>delete</button>}
    </li>
  );
}
