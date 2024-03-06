import React, { useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { AppState } from "../redux/store";
import ProductCreation from "../components/product/ProductCreation";

export default function Admin() {
  const user = useSelector((state: AppState) => state.users.user);
  const [activePanel, setActivePanel] = useState<string | null>("create");

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
      {/* Sidebar */}
      <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white flex-shrink-0">
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <img
            className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
            src={user?.avatar}
            alt="user's avatar"
          />
        </div>
        <nav
          className={`flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto`}
        >
          {/* Category Management */}
          <div>
            <button
              className={`flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${
                activePanel === "category" ? "bg-gray-200" : ""
              }`}
              onClick={() =>
                setActivePanel(activePanel === "category" ? null : "category")
              }
            >
              <span>Category Management</span>
              <KeyboardArrowDownIcon
                fontSize="small"
                className={`transition-transform duration-200 transform ${
                  activePanel === "category" ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
            {activePanel === "category" && (
              <div className="px-2 py-2 bg-white rounded-md shadow">
                <button className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  Create a Category
                </button>
                <button className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  Update a Category
                </button>
                <button className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  Delete a Category
                </button>
              </div>
            )}
          </div>

          {/* Product Management */}
          <div>
            <button
              className={`flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${
                activePanel === "product" ? "bg-gray-200" : ""
              }`}
              onClick={() =>
                setActivePanel(activePanel === "product" ? null : "product")
              }
            >
              <span>Product Management</span>
              <KeyboardArrowDownIcon
                fontSize="small"
                className={`transition-transform duration-200 transform ${
                  activePanel === "product" ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
            {activePanel === "product" && (
              <div className="px-2 py-2 bg-white rounded-md shadow">
                <button
                  className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => setActivePanel("create")}
                >
                  Create a Product
                </button>
                <button
                  className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => setActivePanel("delete")}
                >
                  Update a Product
                </button>
                <button
                  className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => setActivePanel("delete")}
                >
                  Delete a Product
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center flex-grow mt-10">
        {activePanel === "create" && <ProductCreation />}
        {activePanel === "delete" && (
          <div>Search a product to update or delete...</div>
        )}
        {/* Add other panels as needed */}
      </div>
    </div>
  );
}
