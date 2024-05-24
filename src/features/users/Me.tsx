import React, { useState } from "react";

import UserProfile from "./UserProfile";
import { useTheme } from "../theme/ThemeContext";
import OrderList from "../orders/OrderList";
import AddressList from "../addresses/AddressList";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  return (
    <button
      className="px-4 py-2 mt-2 md:mt-0 md:ml-4 text-sm font-semibold rounded-lg focus:shadow-outline"
      style={theme.typography.body1}
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
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

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
        {activeSection === "orders" && <OrderList />}
        {activeSection === "address" && <AddressList />}
      </div>
    </div>
  );
};

export default Me;
