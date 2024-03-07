import React from "react";
import { useTheme } from "../contextAPI/ThemeContext";

export default function UserAddress() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  return <div style={{ color: textPrimaryColor }}>UserAddress</div>;
}
