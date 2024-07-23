import { LoggerListContext } from "../services/providers/LoggerListContext";
import { useContext } from "react";

export function useLoggerListContext() {
  const context = useContext(LoggerListContext);
  if (!context) {
    throw new Error(
      "useLoggerListContext must be used within a LoggerListContextProvider",
    );
  }
  return context;
}
