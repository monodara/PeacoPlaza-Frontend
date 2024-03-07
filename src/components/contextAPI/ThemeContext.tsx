import { createTheme, Theme } from "@mui/material/styles";
import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { createCustomerTheme } from "./Theme";

//styled
const LIGHT = createTheme(createCustomerTheme("light"));
const DARK = createTheme(createCustomerTheme("dark"));

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType>({
  theme: LIGHT,
  toggleTheme: () => {},
  // add
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === LIGHT ? DARK : LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook
export const useTheme = () => useContext(ThemeContext);
