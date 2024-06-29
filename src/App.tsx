import "./App.css";
import { IndividualLog } from "./IndividualLog";
import { LoggerList } from "./LoggerList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainMenu } from "./MainMenu";
import { LoggerListContextProvider } from "./LoggerListContext";

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
    <LoggerListContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </LoggerListContextProvider>
  );
}

export default App;
