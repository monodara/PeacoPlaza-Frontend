import React from "react";
import TablePagination from "@mui/material/TablePagination";
import { Pagination } from "@mui/material";

type Prop = {
  count: number;
  page: number;
  setPage: (newPage: number) => void;
};

export default function ProductPagination({ count, page, setPage }: Prop) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Pagination
        count={count} // Assuming 10 items per page
        page={page}
        onChange={handleChange}
        variant="outlined"
      />
    </div>
  );
}
