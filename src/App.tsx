import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IndividualLog } from "./pages/IndividualLog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoggerList } from "./pages/LoggerList";
import { LoggerListContextProvider } from "./services/providers/LoggerListContext";
import { MainMenu } from "./pages/MainMenu";

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
