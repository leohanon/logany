import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IndividualLog } from "./IndividualLog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoggerList } from "./LoggerList";
import { LoggerListContextProvider } from "./LoggerListContext";
import { MainMenu } from "./MainMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "logs/:logId",
        element: <IndividualLog />,
      },
      {
        path: "/",
        element: <LoggerList />,
      },
    ],
  },
]);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LoggerListContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </LoggerListContextProvider>
    </LocalizationProvider>
  );
}

export default App;
