import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

import FurnitureBg from "../images/furnitureBG.jpg";
import TopRatedProducts from "../features/products/TopRatedProducts";
import MostPurchasedProducts from "../features/products/MostPurchasedProducts";
import { useTheme } from "../features/theme/ThemeContext";

export default function Home() {
  const navigate = useNavigate();

  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.background.paper;
  const secondaryColor = theme.palette.secondary.main;

  return (
    <div className="container mx-auto px-6 mt-10">
      <div
        className="h-[600px] rounded-md overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${FurnitureBg})`,
        }}
      >
        <div className="bg-gray-900 bg-opacity-50 h-full flex items-center justify-center text-center px-12">
          <div className="max-w-4xl">
            <h2 className="text-6xl text-white font-bold mb-4">
              Discover Endless Possibilities
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Explore a diverse range of products tailored to your lifestyle.{" "}
              <br />
              From electronics to fashion, we've got everything you need.
            </p>
            <button
              className="flex items-center justify-center mx-auto px-4 py-2 bg-green-600 text-white text-base uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-600"
              onClick={() => {
                navigate("products");
              }}
            >
              <span>Explore</span>
              <ArrowRightAltIcon className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: textPrimaryColor }}
        >
          Recommended
        </h2>
        <MostPurchasedProducts />
      </div>

      <div className="mt-10">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: textPrimaryColor }}
        >
          Most-Loved
        </h2>
        <TopRatedProducts />
      </div>
    </div>
  );
}
