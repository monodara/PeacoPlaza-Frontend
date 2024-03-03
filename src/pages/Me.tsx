import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import UserProfile from "../components/user/UseProfile";
import UserOrders from "../components/user/UserOrders";
import UserAddress from "../components/user/UserAddress";

export default function Me() {
  const user = useSelector((state: AppState) => state.users.user);
  const [openProfile, setOpenProfile] = useState(true);
  const [openOrder, setOpenOrder] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  return (
    <div className="mt-10 flex flex-col items-center w-full">
      <div className="flex items-center justify-center w-full">
        <button
          className="px-4 py-2 mt-2 md:mt-0 md:ml-4 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setOpenProfile(true);
            setOpenOrder(false);
            setOpenAddress(false);
          }}
        >
          Profile
        </button>
        <button
          className="px-4 py-2 mt-2 md:mt-0 md:ml-4 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setOpenProfile(false);
            setOpenOrder(true);
            setOpenAddress(false);
          }}
        >
          My Orders
        </button>
        <button
          className="px-4 py-2 mt-2 md:mt-0 md:ml-4 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setOpenProfile(false);
            setOpenOrder(false);
            setOpenAddress(true);
          }}
        >
          My Address
        </button>
      </div>
      <div className="mt-4">
        {openProfile && <UserProfile />}
        {openOrder && <UserOrders />}
        {openAddress && <UserAddress />}
      </div>
    </div>
  );
}
