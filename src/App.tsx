import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AcceptInvite from "./pages/AcceptInvite";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IndividualLog } from "./pages/IndividualLog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoggerList } from "./pages/LoggerList";
import { LoggerListContextProvider } from "./services/providers/LoggerListContext";
import Login from "./pages/Login";
import { MainMenu } from "./pages/MainMenu";
import Signup from "./pages/Signup";
import TestPage from "./pages/testing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        index: true,
        element: <LoggerList />,
      },
      {
        path: "logs/:logId",
        element: <IndividualLog />,
      },
      {
        path: "share",
        element: <AcceptInvite />,
      },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/test", element: <TestPage /> },
]);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LoggerListContextProvider>
        <RouterProvider
          router={router}
          fallbackElement={<div>loading</div>}
        ></RouterProvider>
      </LoggerListContextProvider>
    </LocalizationProvider>
  );
}

export default App;
