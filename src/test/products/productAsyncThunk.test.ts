import { ProductCreateDto } from "../../features/products/productDto";
import { productsActions } from "../../features/products/productSlice";
import { store } from "../../redux/store";
import { mockProductToUpdate, mockProducts, productServer } from "../shared/productServer";

let initialState = {
  products: mockProducts,
  loading: false,
  wishList: [],
  searchKeyword: "",
};
beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

// Test suite
describe("product reducer", () => {
  const createdProduct: ProductCreateDto = {
    title: "product3",
      price: 1,
      description: "product3",
      // productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
      inventory: 10,
      weight: 1.2,
      categoryId: "mock-cate-id"
  };
  // create new product
  test("should create new product", async () => {
    await store.dispatch(productsActions.createOne(createdProduct));
    expect(store.getState().products.items.length).toBe(1);
  });

  test("deleteProductsAsync removes product from state", async () => {
    // Dispatch the deleteProductsAsync action
    await store.dispatch(productsActions.deleteOne(mockProducts[0]));

    // Assert that the product is removed from the state
    expect(store.getState().products.items.length).toBe(1);
  });
  test("updateProductsAsync update a product in the state", async () => {
    // Dispatch the deleteProductsAsync action
    await store.dispatch(productsActions.updateOne({id: mockProducts[0].id, updateDto: mockProductToUpdate}));
    // Assert that the product is removed from the state
    expect(store.getState().products.items).toEqual({
      ...mockProducts[0],
      title: "new Title",
      price: 999,
    });
  });

  // test fetching asyncthunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(
      productsActions.fetchAll({urlSuffix: "undefined"})
    );
    expect(store.getState().products.items).toEqual(mockProducts);
    expect(store.getState().products.error).toBeUndefined();
  });
});
