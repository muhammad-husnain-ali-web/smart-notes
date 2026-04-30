import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/auth/register",
      element: <Register />
    },
    {
      path: "/auth/login",
      element: <Login />
    }

  ]);

  return (
    <>
      <div className="min-h-[92vh] w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <RouterProvider router={router} />
        </div>
    </>
  )
}

export default App
