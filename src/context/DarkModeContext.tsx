import { createContext, useContext, useEffect, useCallback } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  toggleDarkMode: () => {},
});

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    "dark-mode"
  );

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => !prev);
  }, [setIsDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
