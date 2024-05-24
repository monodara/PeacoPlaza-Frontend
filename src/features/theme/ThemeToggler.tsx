import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useTheme } from "./ThemeContext";

const ThemeToggler = () => {
  const { toggleTheme, theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const primaryColor = theme.palette.primary.main;
  const hoverColor = theme.palette.secondary.main;
  return (
    <div>
      <IconButton
        sx={{ ml: 1 }}
        onClick={toggleTheme}
        style={{
          color: isHovered ? hoverColor : primaryColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </div>
  );
};

export default ThemeToggler;
