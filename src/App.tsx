import React from "react";
import "./App.css";
import Navbar from "./components/navigation/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <h1>Fake Ecommerce</h1>
      <Home />
      {/* <Navbar /> */}
      {/* <Routes>
        <Route path="/" element={<Home />}></Route> */}
      {/* <Route
            path="/allbreweries"
            element={<Breweries urlSuffix="" />}
          ></Route>
          <Route path="/breweries/:id" element={<BreweryDetails />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/breweries" element={<SearchResult />}></Route>
          <Route path="/contact" element={<ContactForm />}></Route>*/}
      {/* </Routes> */}
      <Footer />
    </div>
  );
}

export default App;
