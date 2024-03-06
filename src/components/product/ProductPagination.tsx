import React from "react";
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
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
      />
    </div>
  );
}
