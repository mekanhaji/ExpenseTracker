import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";

const createPath = (path: string) => `/ExpenseTracker${path}`;

const router = createBrowserRouter([
  {
    path: createPath("/"),
    element: <Home />,
  },
  {
    path: createPath("/about"),
    element: <div>About page</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
