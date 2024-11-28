import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Settings from "./pages/settings";
import { useUserSettingsStore } from "./store";
import { useEffect } from "react";

const createPath = (path: string) => `/SpendWisely${path}`;

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
  const theme = useUserSettingsStore((state) => state.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
