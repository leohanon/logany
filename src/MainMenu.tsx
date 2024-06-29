import { Outlet } from "react-router-dom";
import { useCommandBar } from "./useCommandbar";

export function MainMenu() {
  useCommandBar();
  return <Outlet></Outlet>;
}
