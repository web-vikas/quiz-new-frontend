import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router";
import * as Pages from '@pages'
import Test from "./test";
import { LoginPage } from "../pages/Login";


let router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
]);

export const Navigation = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}