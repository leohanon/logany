import { getOuncesToFeed, timeSince } from "../utils/helper";
import { useEffect, useState } from "react";

import { LogViewRow } from "../../database.types";
import dayjs from "dayjs";

type timeSinceProps = {
  logItem: LogViewRow;
  isOunces: boolean;
};
export function TimeSince({ logItem, isOunces }: timeSinceProps) {
  // re-render the component once per minute to update the "last updated mins ago" text
  const [renderPls, setRenderPls] = useState(0);
  useEffect(() => {
    const update = () => {
      setRenderPls(Date.now());
    };
    const timerID = setInterval(update, 60000);
    return () => clearInterval(timerID);
  }, [renderPls]);

  return (
    <>
      {timeSince(dayjs(logItem.last_updated_at).valueOf())}
      {isOunces && <> - {getOuncesToFeed(logItem).toFixed(1)} oz</>}
    </>
  );
}
