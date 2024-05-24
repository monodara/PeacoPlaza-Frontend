import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface HeartButtonProps {
  onClick: () => void;
}
export const buttonInCardStyle =
  "p-2 rounded-full bg-gray-100 text-green-700 ml-2 -mb-4 hover:bg-green-100 focus:outline-none focus:bg-green-100";
const HeartButton: React.FC<HeartButtonProps> = ({ onClick }) => (
  <button
    className={buttonInCardStyle}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    <FavoriteIcon />
  </button>
);

export default HeartButton;
