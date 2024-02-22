import React, { useEffect, useState } from "react";
import ProductsInCart from "../components/product/ProductsInCart";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { CartProductType } from "../misc/type";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const itemsInCart = useSelector(
    (state: AppState) => state.products.productsInCart
  );
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = itemsInCart.reduce((sum, item: CartProductType) => {
      return sum + item.amount * item.price;
    }, 0);
    setTotalAmount(total);
  }, itemsInCart);
  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div>
              {itemsInCart.length === 0 && (
                <button
                  className="text-blue-500 py-2 px-4 rounded-lg mt-4 "
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  No item in cart. Go shopping now...
                </button>
              )}
            </div>
            {itemsInCart.length !== 0 && <ProductsInCart />}
          </div>

          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  €{totalAmount}
                  .00
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>{itemsInCart.length === 0 ? "€0.00" : "€5.99"}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {`${
                    itemsInCart.length === 0
                      ? "€0.00"
                      : `€${totalAmount + 5.99}`
                  }`}
                </span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
