import { createContext, useContext, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkmode] = useState(false);

  const handleDarkMode = () => {
    setDarkmode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode }}>
      <main id={darkMode ? "dark-theme" : "light-theme"}>
        <button
          onClick={handleDarkMode}
          id={darkMode ? "light-theme" : "dark-theme"}
        >
          DarkMode
        </button>
        {children}
      </main>
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      "You should use useDarkMode only within the DarkModeContext.Provider"
    );
  }
  return context;
};
