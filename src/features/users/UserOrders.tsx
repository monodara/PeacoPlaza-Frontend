import React from "react";
import { useTheme } from "../../components/contextAPI/ThemeContext";

export default function UserOrders() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  return <div style={{ color: textPrimaryColor }}>UserOrders</div>;
}
