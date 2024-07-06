import { Outlet } from "react-router-dom";
import { useCommandBar } from "./useCommandbar";
import "./App.css";

export function MainMenu() {
  useCommandBar();
  return <Outlet></Outlet>;
}
