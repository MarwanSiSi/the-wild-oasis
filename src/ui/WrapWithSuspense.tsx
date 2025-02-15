import { Suspense } from "react";
import Spinner from "./Spinner";

export default function WrapWithSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  );
}
