import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ContextProvider } from "./context/contextProvider"
import PrivateRoute from "./privateRoute/privateRoute"
import PublicRoute from "./publicRoute/PublicRoute"


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><Home /></PrivateRoute>
    },
    {
      path: "/auth/register",
      element: <PublicRoute><Register /></PublicRoute>
    },
    {
      path: "/auth/login",
      element: <PublicRoute><Login /></PublicRoute>
    }

  ]);

  return (
    <>
      <ContextProvider>
        <div className="min-h-[92vh] w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <RouterProvider router={router} />
        </div>
      </ContextProvider>
    </>
  )
}

export default App
