import { useEffect, useState } from "react";

import { delayFunction } from "../utils/helper";

export default function TestPage() {
  const message = useDelay();
  if (message === "hello") {
    return <>Said hi</>;
  }
  return <>ok there</>;
}

function useDelay() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    delayFunction().then((x) => setMessage(x));
  }, []);
  console.log(`message: ${message}`);
  return message;
}
