import { lazy } from "react";
import { RouteObject } from "react-router";
import WrapWithSuspense from "../ui/WrapWithSuspense";

export const bookingRoutes: RouteObject = {
  path: "bookings",
  children: [
    {
      index: true,
      element: WrapWithSuspense(
        lazy(() =>
          import("../pages/Bookings").then((module) => ({
            default: module.default,
          }))
        )
      ),
    },
    {
      path: ":bookingId",
      children: [
        {
          index: true,
          element: WrapWithSuspense(
            lazy(() =>
              import("../pages/BookingDetails").then((module) => ({
                default: module.default,
              }))
            )
          ),
        },
        {
          path: "check-in",
          element: WrapWithSuspense(
            lazy(() =>
              import("../pages/CheckIn").then((module) => ({
                default: module.default,
              }))
            )
          ),
        },
      ],
    },
  ],
};
