import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { getUserInput } from "../../redux/slices/productSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export default function SearchInput() {
  const [userInput, setUserInput] = useState("");
  const dispatch = useDispatch();
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(event.target.value);
    dispatch(getUserInput(userInput));
  }
  function handleSearch(
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (e.key === "Enter") {
      dispatch(getUserInput(userInput));
    }
  }
  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={userInput}
          type="text"
          onChange={onChangeHandler}
          // onKeyDown={(e) => handleSearch(e)}
        />
      </Search>
    </div>
  );
}
