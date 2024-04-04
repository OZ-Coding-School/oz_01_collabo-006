import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/detail/:id",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
