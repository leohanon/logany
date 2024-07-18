import { useEffect, useState } from "react";

import { timeSince } from "./helper";

type timeSinceProps = {
  lastUpdate: number;
};
export function TimeSince({ lastUpdate }: timeSinceProps) {
  // re-render the component once per minute to update the "last updated mins ago" text
  const [renderPls, setRenderPls] = useState(0);
  useEffect(() => {
    const update = () => {
      setRenderPls(Date.now());
    };
    const timerID = setInterval(update, 60000);
    return () => clearInterval(timerID);
  }, [renderPls]);
  return <>{timeSince(lastUpdate)}</>;
}
