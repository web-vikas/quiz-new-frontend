import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage } from "../pages/Login";
import { SignUpPage } from "../pages/SignUp";


let router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
]);

export const Navigation = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}