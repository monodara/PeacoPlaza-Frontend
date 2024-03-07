import React from "react";
import { useTheme } from "../contextAPI/ThemeContext";

export default function CategoriesCreation() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  return <div style={{ color: textPrimaryColor }}>CategoriesCreation</div>;
}
