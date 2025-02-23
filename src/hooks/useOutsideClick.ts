import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  ignoreSelector?: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Check if the click originated from an element matching the ignoreSelector
      if (ignoreSelector && (event.target as Element).closest(ignoreSelector)) {
        return;
      }

      // Check if the click occurred outside the ref element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [handler, ignoreSelector]);

  return { ref };
}
