import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Settings from "./pages/settings";

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
  {
    path: createPath("/settings"),
    element: <Settings />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
