import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AcceptInvite from "./pages/AcceptInvite";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IndividualLog } from "./pages/IndividualLog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoggerList } from "./pages/LoggerList";
import { LoggerListContextProvider } from "./services/providers/LoggerListContext";
import Login from "./pages/Login";
import { MainMenu } from "./pages/MainMenu";
import RequireAuth from "./components/RequireAuth";
import Signup from "./pages/Signup";
import TestPage from "./pages/testing";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainMenu />
      </RequireAuth>
    ),
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
        <RouterProvider router={router}></RouterProvider>
      </LoggerListContextProvider>
    </LocalizationProvider>
  );
}

export default App;
