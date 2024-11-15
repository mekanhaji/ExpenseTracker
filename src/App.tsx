import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <div>About page</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
