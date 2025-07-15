import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage } from "../pages/Login";
import { SignUpPage } from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import quiz from "../pages/Dashboard/Quiz/Quiz";
import Quiz from "../pages/Dashboard/Quiz/Quiz";


let router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/sign-up",
    Component: SignUpPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/quiz/",
    Component: quiz,
  },
  {
    path: "/quiz/quiz",
    Component: Quiz,
  },
]);

export const Navigation = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}