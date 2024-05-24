import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState, useAppDispatch } from "../../app/store";
import { CartProductType } from "../../misc/type";
import ProductsInCart from "./ProductsInCart";
import { useTheme } from "../theme/ThemeContext";
import AddressSelect from "../addresses/AddressList";
import { ProductReadDto } from "../products/productDto";
import { OrderProductCreateDto } from "../orderProducts/orderProductDto";
import { ordersActions } from "../orders/orderSlice";
import { emptyCart } from "./cartSlice";

function Cart() {
  const itemsInCart = useSelector(
    (state: AppState) => state.cart.productsInCart
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const address = useSelector(
    (state: AppState) => state.addresses.selectedItem
  );

  async function checkoutHandler() {
    if (!address) {
      alert("Please choose an address for shipping");
    }
    if (user && token) {
      var orderProductCreateDtos: OrderProductCreateDto[] = []; //orderProduct list
      itemsInCart.forEach((productToBuy) => {
        var orderProductCreateDto = {
          productId: productToBuy.id,
          quantity: productToBuy.amount,
        };
        orderProductCreateDtos.push(orderProductCreateDto);
      });
      var orderCreateDto = {
        addressId: address ? address.id : "",
        orderProducts: orderProductCreateDtos,
      };
      try {
        var res = await dispatch(
          ordersActions.createOne({
            createDto: orderCreateDto,
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        if (res) {
          alert("Now you can review your order");
          navigate("/profile");
          dispatch(emptyCart());
        }
      } catch (error) {
        console.log(error);
      }
    } else navigate("/login");
  }
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const primaryColor = theme.palette.background.paper;
  const backgroundColor = theme.palette.background.default;

  return (
    <div
      className="font-[sans-serif] px-6"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="lg:max-w-7xl max-w-xl mx-auto">
        <h2
          className="text-2xl font-extrabold mt-10"
          style={{
            color: color,
            borderBottom: 1,
            borderBottomColor: color,
          }}
        >
          Shopping Cart
        </h2>
        {itemsInCart.length === 0 && (
          <div style={{ color }}>Cart is Empty. Go to shop now...</div>
        )}
        <div className="grid lg:grid-cols-3 gap-8 items-start mt-8">
          <ProductsInCart />
          <div className="p-8" style={{ backgroundColor: primaryColor }}>
            <h3 className="text-2xl font-bold" style={{ color }}>
              Order summary
            </h3>
            <ul className="mt-6 divide-y" style={{ color }}>
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
                Shipping
                <span className="ml-auto font-bold">
                  €{itemsInCart.length === 0 ? "0.00" : "5.99"}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3">
                Tax <span className="ml-auto font-bold">included</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3 font-bold">
                Total
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
              className="mt-6 text-xl px-6 py-2.5 w-full hover:bg-grey-200 text-white rounded"
              style={{ border: `1px solid ${color}` }}
              onClick={checkoutHandler}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
      <AddressSelect />
    </div>
  );
}

export default Cart;
