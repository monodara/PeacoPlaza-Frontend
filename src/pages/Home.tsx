import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

import FurnitureBg from "../images/furnitureBG.jpg";
import ElecBg from "../images/electronicsBG.jpeg";
import FootwareBg from "../images/footwareBG.jpg";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-6 mt-10">
      <div
        className="h-64 rounded-md overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${FurnitureBg})`,
        }}
      >
        <div className="bg-gray-900 bg-opacity-50 h-full flex flex-col justify-center px-12 ">
          <div className="max-w-xl">
            <h2 className="text-2xl text-white font-semibold text-left">
              Furniture
            </h2>
            <p className="mt-2 text-gray-400 text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
              facere provident molestias ipsam sint voluptatum pariatur.
            </p>
            <button
              className="flex items-center mt-4 px-3 py-2 bg-green-500 text-white text-sm uppercase font-medium rounded hover:bg-green-400 focus:outline-none focus:bg-green-500"
              onClick={() => {
                navigate("products/?categoryId=2");
              }}
            >
              <span>Shop Now</span>
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="md:flex mt-8 md:-mx-4">
        <div
          className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 "
          style={{
            backgroundImage: `url(${ElecBg})`,
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 h-full flex flex-col justify-center px-12">
            <div className="max-w-xl">
              <h2 className="text-2xl text-white font-semibold text-left">
                Electronics
              </h2>
              <p className="mt-2 text-gray-400 text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore facere provident molestias ipsam sint voluptatum
                pariatur.
              </p>
              <button
                className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                onClick={() => {
                  navigate("products/?categoryId=1");
                }}
              >
                <span>Shop Now</span>
                <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
          style={{
            backgroundImage: `url(${FootwareBg})`,
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 h-full flex flex-col justify-center px-12">
            <div className="max-w-xl">
              <h2 className="text-2xl text-white font-semibold text-left">
                Shoes
              </h2>
              <p className="mt-2 text-gray-400 text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore facere provident molestias ipsam sint voluptatum
                pariatur.
              </p>
              <button
                className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                onClick={() => {
                  navigate("products/?categoryId=4");
                }}
              >
                <span>Shop Now</span>
                <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
