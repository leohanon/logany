// import { useCommandBar } from "./useCommandbar";
import "./App.css";

import { Outlet } from "react-router-dom";

export function MainMenu() {
  // useCommandBar();
  return <Outlet></Outlet>;
}
