import categoryReducer, {
  fetchAllCategoriesAsync,
} from "../../redux/slices/categorySlice";
import store from "../../redux/store";
import { categoryServer, mockCategories } from "../shared/categoryServer";

beforeAll(() => {
  categoryServer.listen();
});

afterAll(() => {
  categoryServer.close();
});
const initialState = {
  categoryList: [],
  loading: false,
};

// test suit
describe("category reducer", () => {
  // 3 tests
  // mock data

  // test0: initial state
  test("should return initial state", () => {
    const state = categoryReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });
  // test1: fetch data fulfill
  test("should return a list of categories", () => {
    const state = categoryReducer(
      initialState,
      fetchAllCategoriesAsync.fulfilled(mockCategories, "fulfilled")
    );

    expect(state).toEqual({
      categoryList: mockCategories,
      loading: false,
    });
  });
  // test2: fetch data pending
  test("should have loading truthy when fetch is pending", () => {
    const state = categoryReducer(
      initialState,
      fetchAllCategoriesAsync.pending("pending")
    );
    expect(state).toEqual({
      categoryList: [],
      loading: true,
    });
  });

  // test 3: fetch data reject
  test("should have error", () => {
    const error = new Error("error");
    const state = categoryReducer(
      initialState,
      fetchAllCategoriesAsync.rejected(error, "error")
    );
    expect(state).toEqual({
      categoryList: [],
      loading: false,
      error: error.message,
    });
  });
  // test fetching asyncthunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(fetchAllCategoriesAsync());
    expect(store.getState().categories.categoryList.length).toBe(2);
    expect(store.getState().categories.error).toBeUndefined;
  });
});
