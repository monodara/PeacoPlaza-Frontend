import React, { useState } from "react";

import UserProfile from "../components/user/UseProfile";
import UserOrders from "../components/user/UserOrders";
import UserAddress from "../components/user/UserAddress";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-4 py-2 mt-2 md:mt-0 md:ml-4 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const Me: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("profile");

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="mt-10 flex flex-col items-center w-full">
      <div className="flex items-center justify-center w-full">
        <Button label="Profile" onClick={() => handleButtonClick("profile")} />
        <Button label="My Orders" onClick={() => handleButtonClick("orders")} />
        <Button
          label="My Address"
          onClick={() => handleButtonClick("address")}
        />
      </div>
      <div className="mt-4">
        {activeSection === "profile" && <UserProfile />}
        {activeSection === "orders" && <UserOrders />}
        {activeSection === "address" && <UserAddress />}
      </div>
    </div>
  );
};

export default Me;
