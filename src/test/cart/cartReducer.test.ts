import cartReducer, {
  addToCart,
  incrementProductAmount,
  decrementProductAmount,
  removeFromCart,
  updateProductAmount,
} from "../../features/cart/cartSlice";

const product1 = {
    id: "mock-id-1",
    title: "product1",
    price: 1,
    description: "product1",
    inventory: 10,
    weight: 1.2,
    productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
    category: { id: "mock-cate-id", name: "clothes", image: "catImg" },
  };
const product2 = {
    id: "mock-id-1",
    title: "product2",
    price: 2,
    description: "product2",
    inventory: 10,
    weight: 1.2,
    productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
    category: { id: "mock-cate-id", name: "shoes", image: "catImg" },
  };

describe("cartReducer", () => {
  const initialState = {
    productsInCart: [],
    drawerOpen: false,
  };

  it("should add the product to Cart", () => {
    const action = addToCart(product1);
    const newState = cartReducer(initialState, action);
    expect(newState.productsInCart.length).toBe(1);
    expect(newState.productsInCart[0].id).toBe(product1.id);
    expect(newState.productsInCart[0].amount).toBe(1);
  });
  it("should increment the amount when adding the same product", () => {
    const action = addToCart(product1);
    const newState = cartReducer(initialState, action);
    // same product
    const newState2 = cartReducer(newState, action);
    expect(newState2.productsInCart.length).toBe(1);
    expect(newState2.productsInCart[0].id).toBe(product1.id);
    expect(newState2.productsInCart[0].amount).toBe(2);
  });
  it("should add another product when adding a different product", () => {
    const action = addToCart(product1);
    const newState = cartReducer(initialState, action);
    const action2 = addToCart(product2);
    const newState2 = cartReducer(newState, action2);
    expect(newState2.productsInCart.length).toBe(2);
    expect(newState2.productsInCart[0].amount).toBe(1);
  });

  it("should increment the amount of the product", () => {
    const addAction = addToCart(product1);
    const newState1 = cartReducer(initialState, addAction);
    const product = { ...product1, amount: 1 };
    const action = incrementProductAmount(product);
    const newState = cartReducer(newState1, action);
    expect(newState.productsInCart.length).toBe(1);
    expect(newState.productsInCart[0].id).toBe(product.id);
    expect(newState.productsInCart[0].amount).toBe(2);
  });

  it("should decrement the amount of the product", () => {
    const addAction = addToCart(product1);
    const addedState = cartReducer(initialState, addAction);
    const product = addedState.productsInCart[0];
    const updateAction = updateProductAmount({ product, newAmount: 5 });
    const updatedState = cartReducer(addedState, updateAction);
    const decreAction = decrementProductAmount(addedState.productsInCart[0]);
    const newState = cartReducer(updatedState, decreAction);
    expect(newState.productsInCart.length).toBe(1);
    expect(newState.productsInCart[0].id).toBe(product1.id);
    expect(newState.productsInCart[0].amount).toBe(4);
  });

  it("should handle removeFromCart", () => {
    const addAction = addToCart(product1);
    const addedState = cartReducer(initialState, addAction);
    const removeAction = removeFromCart(product1);
    const newState = cartReducer(addedState, removeAction);
    expect(newState.productsInCart.length).toBe(0);
  });

  it("should update the amount of the product", () => {
    const addAction = addToCart(product1);
    const addedState = cartReducer(initialState, addAction);
    const product = addedState.productsInCart[0];
    const updateAction = updateProductAmount({ product, newAmount: 5 });
    const updatedState = cartReducer(addedState, updateAction);
    expect(updatedState.productsInCart.length).toBe(1);
    expect(updatedState.productsInCart[0].id).toBe(product1.id);
    expect(updatedState.productsInCart[0].amount).toBe(5);
  });
});
