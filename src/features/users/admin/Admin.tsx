import React, { useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AppState } from "../../../app/store";
import { useTheme } from "../../theme/ThemeContext";
import UserDefaultAvatar from "../defaultAvatar.jpeg";
import UserManagement from "./UserManageTable";
import ProductManagement from "./ProductManageTable";

export default function Admin() {
  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const [activePanel, setActivePanel] = useState<string | null>("products");
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  return (
    <div
      className="md:flex flex-col md:flex-row md:min-h-screen w-full mt-10 shadow-m mb-10"
      style={{
        borderTop: "1px solid gray",
      }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col w-full md:w-64 flex-shrink-0 mb-10"
        style={{
          backgroundColor: backgroundColor,
          borderRight: "1px solid gray",
        }}
      >
        <div className="py-10">
          <h3 className="font-bold text-2xl mb-1" style={{ color }}>
            {user?.userName}
          </h3>
          <div className="inline-flex items-center" style={{ color }}>
            {user?.email}
          </div>
        </div>
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <img
            className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
            src={user && user.avatar ? user.avatar.data : UserDefaultAvatar}
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
                setActivePanel(activePanel === "orders" ? null : "orders")
              }
              style={theme.typography.body1}
            >
              <span>Order Management</span>
            </button>
          </div>

          {/* Product Management */}
          <div>
            <button
              className={`flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${
                activePanel === "product" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActivePanel("products")}
              style={theme.typography.body1}
            >
              <span>Product Management</span>
            </button>
          </div>

          {/* User Management */}
          <div>
            <button
              className={`flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${
                activePanel === "users" ? "bg-gray-200" : ""
              }`}
              onClick={() =>
                setActivePanel(activePanel === "users" ? null : "users")
              }
              style={theme.typography.body1}
            >
              <span>User Management</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center flex-grow mt-10">
        {/* {activePanel === "create" && <ProductCreation />}
        {activePanel === "delete" && (
          <div style={{ color }}>Search a product to update or delete...</div>
        )} */}
        {activePanel === "products" && <ProductManagement />}
        {activePanel === "users" && <UserManagement />}
      </div>
    </div>
  );
}
