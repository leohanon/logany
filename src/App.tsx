import "./App.css";
import { IndividualLog } from "./IndividualLog";
import { LoggerList } from "./LoggerList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoggerList />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/:logId",
    element: <IndividualLog />,
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
