import React from "react";
import { Pagination } from "@mui/material";
import { useTheme } from "../contextAPI/ThemeContext";

type Prop = {
  count: number;
  page: number;
  setPage: (newPage: number) => void;
};

export default function ProductPagination({ count, page, setPage }: Prop) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  return (
    <div>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        sx={{
          "& .MuiPaginationItem-root": {
            color: textPrimaryColor, // Change the text color of the pagination item
          },
          "& .MuiPaginationItem-outlined": {
            borderColor: textPrimaryColor, // Change the border color of the pagination item
          },
        }}
      />
    </div>
  );
}
