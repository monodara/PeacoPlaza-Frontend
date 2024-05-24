import createBaseSlice from "../../app/BaseSlice"
import { ProductCreateDto, ProductReadDto, ProductUpdateDto } from "./productDto"

const { slice, actions } = createBaseSlice<ProductReadDto, ProductCreateDto, ProductUpdateDto>("products", "/products")

export const productsReducer = slice.reducer
export const productsActions = actions
