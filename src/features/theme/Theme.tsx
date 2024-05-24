import { blueGrey, green, grey, teal } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

interface CustomText {
  primary: string;
  secondary: string;
  tertiary?: string; // Add the new property tertiary
}
type CustomTheme = {
  palette: {
    mode: string;
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    background: {
      default: string;
      paper: string;
      button: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    custom: {};
    button: {
      backgroundColor: string; // Background color
      color: string; // Text color
      "&:hover": {
        backgroundColor: string; // Hover background color
      };
    };
  };
};
export const createCustomerTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? green[800] : green[50],
    },
    secondary: {
      main: mode === "light" ? green[500] : green[200],
    },
    background: {
      default: mode === "light" ? grey[100] : blueGrey[900],
      paper: mode === "light" ? green[400] : green[500],
      button: mode === "light" ? green[500] : green[400],
    },
    text: {
      primary: mode === "light" ? grey[800] : grey[50],
      secondary: mode === "light" ? grey[500] : grey[200],
    },

    customElements: {
      myButton: {
        backgroundColor: mode === "light" ? green[500] : green[400], // Background color
        color: mode === "light" ? grey[50] : grey[50], // Text color
        "&:hover": {
          backgroundColor: mode === "light" ? green[400] : green[500], // Hover background color
        },
      },
    },
  },
  button: {
    backgroundColor: mode === "light" ? green[500] : green[400], // Background color
    color: mode === "light" ? grey[50] : grey[50], // Text color
    "&:hover": {
      backgroundColor: mode === "light" ? green[400] : green[500], // Hover background color
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          backgroundColor: mode === "light" ? green[500] : green[400], // Background color
          color: mode === "light" ? grey[50] : grey[50], // Text color
          "&:hover": {
            backgroundColor: mode === "light" ? green[400] : green[500], // Hover background color
          },
        },
      },
    },
  },
  typography: {
    body1: {
      backgroundColor: mode === "light" ? green[50] : green[800], // Background color
      color: mode === "light" ? green[700] : green[100], // Text color
      "&:hover": {
        backgroundColor: mode === "light" ? green[100] : green[700], // Hover background color
      },
      borderRadius: 1,
      mb: 2,
    },
    button: {
      backgroundColor: mode === "light" ? green[500] : green[400], // Background color
      color: mode === "light" ? grey[50] : grey[50], // Text color
      "&:hover": {
        backgroundColor: mode === "light" ? green[400] : green[500], // Hover background color
        color: mode === "light" ? grey[200] : grey[200],
      },
      mt: 2,
      display: "inline",
      borderRadius: 1,
    },
  },
});
