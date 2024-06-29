import "./App.css";
import { IndividualLog } from "./IndividualLog";
import { LoggerList } from "./LoggerList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
