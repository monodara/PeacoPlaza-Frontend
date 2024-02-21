import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navigation/NavBar";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import SearchBar from "./components/search/SearchBar";
import ProductCollect from "./pages/ProductCollect";
import SingleProduct from "./components/product/SingleProduct";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route
          path="/products"
          element={
            <ProductCollect url={"https://api.escuelajs.co/api/v1/products"} />
          }
        />
      </Routes>
      <Routes>
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
