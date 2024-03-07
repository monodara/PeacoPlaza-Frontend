export const popoverStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#66bb6a",
  border: "1px solid gray",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};
export const buttonStyle = (
  backgroundColor: string,
  hoverColor: string,
  textColor: string
) => ({
  marginRight: 2,
  backgroundColor: backgroundColor,
  color: textColor,
  "&:hover": {
    backgroundColor: hoverColor,
  },
});
export const linkStyle =
  "block md:inline-block px-3 py-3 border-b-2 border-green-500 md:border-none";
export const iconStyle = "h-6 w-6 cursor-pointer mx-4";

export const inputFormStyles = (color: string) => ({
  mb: 2,
  "& .MuiInputBase-root": {
    color: color,
    "&:focus": {
      color: color,
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: color,
      "&:focus": {
        borderColor: color,
      },
    },
    "& input": {
      color: color, // Text color
      borderColor: color, // Border color
      "&:focus": {
        borderColor: color, // Border color when focused
      },
    },
  },
  "& .MuiFormLabel-root": {
    color: color,
    "&.Mui-focused": {
      color: color,
    },
  },
});
