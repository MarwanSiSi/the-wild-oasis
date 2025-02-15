import { createBrowserRouter } from "react-router";
import WrapWithSuspense from "../ui/WrapWithSuspense";
import { lazy } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: WrapWithSuspense(
      lazy(() =>
        import("../ui/AppLayout").then((module) => ({
          default: module.default,
        }))
      )
    ),
    children: [
      {
        index: true,
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/Dashboard").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
      {
        path: "bookings",
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/Bookings").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
      {
        path: "/cabins",
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/Cabins").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
      {
        path: "/users",
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/Users").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
      {
        path: "/settings",
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/Settings").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
      {
        path: "/account",
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/Account").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
      {
        path: "/login",
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/Login").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
      {
        path: "*",
        element: WrapWithSuspense(
          lazy(() =>
            import("../pages/PageNotFound").then((module) => ({
              default: module.default,
            }))
          )
        ),
      },
    ],
  },
]);
