import { createBrowserRouter } from "react-router";
import WrapWithSuspense from "../ui/WrapWithSuspense";
import { lazy } from "react";
import { bookingRoutes } from "./booking.routes";
import ProtectedRoute from "../ui/ProtectedRoute";

export const router = createBrowserRouter([
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
    path: "/",
    element: (
      <ProtectedRoute>
        {WrapWithSuspense(
          lazy(() =>
            import("../ui/AppLayout").then((module) => ({
              default: module.default,
            }))
          )
        )}
      </ProtectedRoute>
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
      bookingRoutes,
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
