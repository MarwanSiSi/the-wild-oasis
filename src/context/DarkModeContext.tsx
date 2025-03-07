import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "dark-mode");

  function toggleDarkMode() {
    setIsDarkMode((prev: boolean) => !prev);
    document.documentElement.classList.toggle("dark-mode");
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("Dark mode context must be used within DarkModeProvider");
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
