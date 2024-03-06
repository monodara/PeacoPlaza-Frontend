import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface HeartButtonProps {
  onClick: () => void;
}

const HeartButton: React.FC<HeartButtonProps> = ({ onClick }) => (
  <button
    className="p-2 rounded-full bg-green-600 text-white ml-2 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500"
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
