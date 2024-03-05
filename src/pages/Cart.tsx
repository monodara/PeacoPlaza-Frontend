import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState } from "../redux/store";
import { CartProductType } from "../misc/type";
import ProductsInCart from "../components/cart/ProductsInCart";

function Cart() {
  const itemsInCart = useSelector(
    (state: AppState) => state.cart.productsInCart
  );
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.users.user);
  function checkoutHandler() {
    if (user) navigate("/checkout");
    else navigate("/login");
  }

  return (
    <div className="font-[sans-serif] bg-white px-6">
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
                Subtotal
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
              onClick={checkoutHandler}
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
