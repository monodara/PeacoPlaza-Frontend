import React from "react";
import { useTheme } from "../theme/ThemeContext";

export default function Checkout() {
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  return <div style={{ color }}>Pay Here...</div>;
}
