import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./app/Home";
import Footer from "./components/Footer";
import SingleProduct from "./features/products/SingleProduct";
import Cart from "./features/cart/Cart";
import WishList from "./features/wishlists/WishList";
import UserRegisterForm from "./features/users/UserRegister";
import UserLogin from "./features/users/UserLogin";
import SearchForm from "./components/SearchForm";
import Categories from "./features/categories/Categories";
import ProductsFetchData from "./features/products/ProductsPage";
import Me from "./features/users/Me";
import Admin from "./features/users/admin/Admin";
import Checkout from "./features/cart/Checkout";
import { useTheme } from "./features/theme/ThemeContext";
import ProductForm from "./features/users/admin/ProductForm";
import AddressSelect from "./features/addresses/AddressList";
import OrderDetails from "./features/orders/OrderDetails";

function App() {
  const { theme } = useTheme();
  const backgroundColor = theme.palette.background.default;
  return (
    <div className="App" style={{ backgroundColor }}>
      <Navbar />
      <SearchForm />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsFetchData />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/register" element={<UserRegisterForm />} />
        <Route path="/profile" element={<Me />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/choose_address" element={<AddressSelect />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route
          path="/product_edit"
          element={<ProductForm isEditing={true} />}
        />
        <Route
          path="/product_new"
          element={<ProductForm isEditing={false} />}
        />
      </Routes>
      <ScrollToTop smooth />
      <Footer />
    </div>
  );
}

export default App;
