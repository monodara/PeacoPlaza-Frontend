import React, { useState } from "react";
import { useDispatch } from "react-redux";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

import logo from "../../images/logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribed with email:", email);
  };

  return (
    <footer className="bg-gray-100 px-6 mt-10 border-t-2 border-gray-200">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-gray-800 text-left">Quick Link</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href=""
                className="text-gray-600 hover:underline hover:text-blue-500"
              >
                Home
              </a>
              <a
                href="products"
                className="text-gray-600 hover:underline hover:text-blue-500"
              >
                All products
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 text-left">Categories</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="products/?categoryId=1"
                className="text-gray-600 hover:underline hover:text-blue-500"
              >
                Clothes
              </a>
              <a
                href="products/?categoryId=2"
                className="text-gray-600 hover:underline hover:text-blue-500"
              >
                Shoes
              </a>
              <a
                href="products/?categoryId=3"
                className="text-gray-600 hover:underline hover:text-blue-500"
              >
                Electronics
              </a>
              <a
                href="products/?categoryId=4"
                className="text-gray-600 hover:underline hover:text-blue-500"
              >
                Furniture
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8" />

        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-7" src={logo} alt="logo" />
          </a>

          <div className="flex -mx-2">
            <a
              href="#"
              className="mx-2 text-gray-600 hover:text-blue-500"
              aria-label="Reddit"
            >
              <RedditIcon />
            </a>

            <a
              href="#"
              className="mx-2 text-gray-600 hover:text-blue-500"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>

            <a
              href="#"
              className="mx-2 text-gray-600 hover:text-blue-500"
              aria-label="Github"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
