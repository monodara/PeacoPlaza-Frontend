import React, { useEffect, useState } from "react";
import ProductsInCart from "../components/product/ProductsInCart";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { CartProductType } from "../misc/type";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const itemsInCart = useSelector(
    (state: AppState) => state.cart.productsInCart
  );
  return (
    // <div classNameName="bg-gray-100 h-screen py-8">
    //   <div classNameName="container mx-auto px-4">
    //     <h1 classNameName="text-2xl font-semibold mb-4">Shopping Cart</h1>
    //     <div classNameName="flex flex-col md:flex-row gap-4">
    //       <div classNameName="md:w-3/4">
    //         <div>
    //           {itemsInCart.length === 0 && (
    //             <button
    //               classNameName="text-blue-500 py-2 px-4 rounded-lg mt-4 "
    //               onClick={() => {
    //                 navigate("/products");
    //               }}
    //             >
    //               No item in cart. Go shopping now...
    //             </button>
    //           )}
    //         </div>
    //         {itemsInCart.length !== 0 && <ProductsInCart />}
    //       </div>

    //       <div classNameName="md:w-1/4">
    //         <div classNameName="bg-white rounded-lg shadow-md p-6">
    //           <h2 classNameName="text-lg font-semibold mb-4">Summary</h2>
    //           <div classNameName="flex justify-between mb-2">
    //             <span>Subtotal</span>
    //             <span>
    //               €
    //               {itemsInCart.reduce((sum, item: CartProductType) => {
    //                 return sum + item.amount * item.price;
    //               }, 0)}
    //               .00
    //             </span>
    //           </div>
    //           <div classNameName="flex justify-between mb-2">
    //             <span>Taxes</span>
    //             <span>Included</span>
    //           </div>
    //           <div classNameName="flex justify-between mb-2">
    //             <span>Shipping</span>
    //             <span>{itemsInCart.length === 0 ? "€0.00" : "€5.99"}</span>
    //           </div>
    //           <hr classNameName="my-2" />
    //           <div classNameName="flex justify-between mb-2">
    //             <span classNameName="font-semibold">Total</span>
    //             <span classNameName="font-semibold">
    //               {`${
    //                 itemsInCart.length === 0
    //                   ? "€0.00"
    //                   : `€${
    //                       itemsInCart.reduce((sum, item: CartProductType) => {
    //                         return sum + item.amount * item.price;
    //                       }, 0) + 5.99
    //                     }`
    //               }`}
    //             </span>
    //           </div>
    //           <button classNameName="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
    //             Checkout
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="font-[sans-serif] bg-white">
      <div className="lg:max-w-7xl max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#333] mt-10">
          Shopping Cart
        </h2>
        <div className="grid lg:grid-cols-3 gap-8 items-start mt-8">
          <ProductsInCart />
          <div className="bg-gray-100 p-8">
            <h3 className="text-2xl font-bold text-[#333]">Order summary</h3>
            <ul className="text-[#333] mt-6 divide-y">
              <li className="flex flex-wrap gap-4 text-md py-3">
                Subtotal{" "}
                <span className="ml-auto font-bold">
                  €
                  {itemsInCart.reduce((sum, item: CartProductType) => {
                    return sum + item.amount * item.price;
                  }, 0)}
                  .00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3">
                Shipping <span className="ml-auto font-bold">€5.99</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3">
                Tax <span className="ml-auto font-bold">included</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3 font-bold">
                Total{" "}
                <span className="ml-auto">
                  {`${
                    itemsInCart.length === 0
                      ? "€0.00"
                      : `€${
                          itemsInCart.reduce((sum, item: CartProductType) => {
                            return sum + item.amount * item.price;
                          }, 0) + 5.99
                        }`
                  }`}
                </span>
              </li>
            </ul>
            <button
              type="button"
              className="mt-6 text-md px-6 py-2.5 w-full bg-green-500 hover:bg-green-600 text-white rounded"
              style={{ backgroundColor: "#72BD41" }}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
