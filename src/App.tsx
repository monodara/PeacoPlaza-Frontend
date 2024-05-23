import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import "./App.css";
import Navbar from "./components/contextAPI/NavBar";
import Home from "./pages/Home";
import Footer from "./components/contextAPI/Footer";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import UserRegisterForm from "./features/users/UserRegister";
import UserLogin from "./features/users/UserLogin";
import SearchForm from "./components/search/SearchForm";
import Categories from "./features/categories/Categories";
import ProductsFetchData from "./pages/Products";
import Me from "./pages/Me";
import Admin from "./features/users/admin/Admin";
import ProductUpdateOrDelete from "./components/admin/ProductUpdateOrDelete";
import Checkout from "./pages/Checkout";
import { useTheme } from "./components/contextAPI/ThemeContext";

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
        <Route
          path="/Admin/update_delete"
          element={<ProductUpdateOrDelete />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <ScrollToTop smooth />
      <Footer />
    </div>
  );
}

export default App;
